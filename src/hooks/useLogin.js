import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogIn = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

    const login = async (email, password) => {
		const success = handleInputErrors({email,password});
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/signin`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({email,password}),
			});

			const data = await res.json();
			if (data.success == false && data.message) {
				throw new Error(data.message);
			}
			localStorage.setItem("chat-user", JSON.stringify(data.data.user_details));
			setAuthUser(data.data.user_details);

			return data.data.access_token
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogIn;

function handleInputErrors({email,password}) {
	if (!email ||!password) {
		toast.error("Please fill in all fields");
		return false;
    }

	return true;
}
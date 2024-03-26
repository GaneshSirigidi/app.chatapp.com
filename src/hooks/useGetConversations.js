import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAccessToken } from "../helpers/tokenhelper";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
            try {
                const accessToken = getAccessToken();
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`,
                {
                    headers: {
                        Authorization: accessToken // Include access token in the request header
                    }
                });
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data.data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
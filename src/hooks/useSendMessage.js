import { useState } from 'react'
import toast from "react-hot-toast";
import useConversation from '../zustand/useConversation';
import { getAccessToken } from '../helpers/tokenhelper';

const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const { messages,setMessages,selectedConversation} = useConversation();


    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const accessToken = getAccessToken();
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/send-messsage/${selectedConversation._id}`, {
                method: "POST",
				headers: {
                    "Content-Type": "application/json",
                    "Authorization":accessToken
                    
				},
				body: JSON.stringify({ message }),
            })

            const data = await res.json();
            // if (data.error) {
            //     throw new Error(data.error);
            // }

			setMessages([...messages, data.data]);
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, sendMessage };
}

export default useSendMessage
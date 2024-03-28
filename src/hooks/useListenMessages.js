import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("message", (message) => {
			message.shouldShake = true
			setMessages([...messages, message]);
		});

		return () => socket?.off("message");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
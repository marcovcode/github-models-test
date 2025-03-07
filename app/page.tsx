"use client";

import { FormEvent, useState } from "react";
import { callOpenAI } from "./lib/openai";
import { Message } from "./types";

export default function Home() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [response, setResponse] = useState<Message | null>();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const messageContent = formData.get("message") as string;
		const message: Message = {
			role: "user",
			content: messageContent,
		};

		setIsLoading(true);
		const _response = (await callOpenAI([...messages, message])) as Message;
		setIsLoading(false);

		setResponse(_response);
		setMessages([...messages, _response]);
	};

	return (
		<main className="p-4">
			<form className="space-x-4" onSubmit={onSubmit}>
				<input type="text" name="message" className="border" />
				<button type="submit">Send</button>
			</form>

			<div>{isLoading ? "Loading..." : response?.content}</div>
		</main>
	);
}

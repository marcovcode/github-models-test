"use client";

import { FormEvent, useState } from "react";
import { callOpenAI } from "./lib/openai";

export default function Home() {
	const [response, setResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const message = formData.get("message") as string;

		setIsLoading(true);
		setResponse(await callOpenAI([{ role: "user", content: message }]));
		setIsLoading(false);
	};

	return (
		<main className="p-4">
			<form className="space-x-4" onSubmit={onSubmit}>
				<input type="text" name="message" className="border" />
				<button type="submit">Send</button>
			</form>

			<div>{isLoading ? "Loading..." : response}</div>
		</main>
	);
}

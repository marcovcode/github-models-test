import { callOpenAI } from "./lib/openai";

export default async function Home() {
	const message = await callOpenAI([{ role: "user", content: "Hello!" }]);

	return (
		<main>
			<div>{message}</div>
		</main>
	);
}

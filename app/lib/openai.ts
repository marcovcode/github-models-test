"use server";

import OpenAI from "openai";
import { Message } from "../types";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function callOpenAI(messages: Message[]) {
	const client = new OpenAI({ baseURL: endpoint, apiKey: token });

	const response = await client.chat.completions.create({
		messages: messages,
		temperature: 1.0,
		top_p: 1.0,
		max_tokens: 1000,
		model: modelName,
	});

	return response.choices[0].message!;
}

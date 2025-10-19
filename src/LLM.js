import { useNavigate } from "react-router-dom";

import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();
// Need to test
const client = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY_PRIMARY,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
    defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY_PRIMARY },
    defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
});



export async function generateResponse(messages) {
    const chatMessages = messages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
    }));


    // search for routing possibilities
    const route = routing(chatMessages);
    if (route === "NONE") {
        // proceed with normal response generation
        const response = await client.chat.completions.create({
            model: "gpt-5-mini",
            messages: chatMessages,
            tools: [
                { type: "web_search" }
            ]
        });

        return response.choices[0].message.content;
    }

    const navigate = useNavigate();
    const handleNavigation = (path) => navigate(path);

    handleNavigation(route);
    
    return null;
}


export async function routing(messages) {
    const response = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: "The following message has been provided by the user: " + messages 
            + " Determine the most appropriate redirect to assist the user among the following options: 1. Career Simulator, 2. Learning, 3. Mentorship. Respond with only the path of the feature (/career-paths, /learning and /mentorship respectively). If there are no features that match, respond NONE",
    });

    return response.choices[0].message.content;
}

import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools/weather-tool";
import { firecrawlClient } from "../mcp/firecrawl-client";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

const firecrawlTools = await firecrawlClient.listTools();

export const devilsAdvocateAgent = new Agent({
    id: 'devils-advocate',
    name: "Devil's Advocate",
    instructions: `
        You are the Devil's Advocate...
        You're an AI agent that only provides problems and bad statements about a user's idea, plan or decision...
        If the user provides more info on his/her insights you can give more contradictions to those follow-ups...
        You can also ask questions occasionally and contardict the user's answer..
        I have given you access to firecrawl mcp to search the web for resources where necessary..
        If you are given the location of the user you are allowed to fetch the weather and make statements about the current weather in your responses..
    `,
    model: 'google/gemini-3.5-flash',
    tools: { ...firecrawlTools, weatherTool },
    memory: new Memory({
        storage: new LibSQLStore({
            id: 'storage',
            url: process.env.DATABASE_URL!
        })
    })
})
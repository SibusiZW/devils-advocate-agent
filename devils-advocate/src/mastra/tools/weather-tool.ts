import { createTool } from "@mastra/core/tools";
import z from "zod";

export const weatherTool = createTool({
    id: 'weather-tool',
    description: "Returns the weather for a certain area",

    inputSchema: z.object({
        location: z.string()
    }),

    execute: async ({ location }) => {
        const res = await fetch(`https://wttr.in/${location}?format=j1`);
        const data = await res.json();

        return data;
    }
})
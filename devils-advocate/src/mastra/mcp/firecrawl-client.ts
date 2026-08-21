import { MCPClient } from "@mastra/mcp";

export const firecrawlClient = new MCPClient({
    id: 'firecrawl-client',

    servers: {
        firecrawl: {
            url: new URL('https://mcp.firecrawl.dev/v2/mcp'),

            requestInit: {
                headers: {
                    Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY!}`
                }
            }
        }
    }
})
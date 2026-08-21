import { createStep } from "@mastra/core/workflows";
import z from "zod";

const appprovalStep = createStep({
    id: 'human-approval',
    description: "Waits for human approval before executing a task",

    inputSchema: z.object({
        task: z.string()
    }),

    outputSchema: z.object({
        task: z.string(),
        userResponse: z.string()
    }),

    resumeSchema: z.object({
        userResponse: z.enum(["approve", "deny"])
    }),

    suspendSchema: z.object({
        task: z.string(),
        message: z.string()
    }),

    execute: async ({ inputData, suspend, resumeData }) => {
        if (!resumeData) {
            return await suspend({
                task: inputData.task,
                message: `Are you sure you want to execute: "${inputData.task}"?`
            });
        }

        return {
            task: inputData.task,
            userResponse: resumeData.userResponse
        }
    }
})
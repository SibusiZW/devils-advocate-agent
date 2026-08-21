import { createStep } from "@mastra/core/workflows";
import z from "zod";
import { devilsAdvocateAgent } from "../agents/devils-advocate-agent";

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
});

const executeTaskStep = createStep({
    id: 'execute-task',
    description: "Executes a task",

    inputSchema: z.object({
        task: z.string(),
        userResponse: z.string()
    }),

    outputSchema: z.object({
        task: z.string(),
        result: z.string()
    }),

    execute: async ({ inputData }) => {
        if (inputData.userResponse === 'deny') {
            return {
                task: inputData.task,
                result: "User didn't authorize task execution!!"
            }
        }

        const agent = devilsAdvocateAgent;
        const response = await agent.generate(`Criticize this.. Don't ask any follow-up questions or info: ${inputData.task}`);

        return {
            task: inputData.task,
            result: response.text
        }
    }
})
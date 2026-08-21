import { Mastra } from "@mastra/core";
import { devilsAdvocateAgent } from "./agents/devils-advocate-agent";
import { criticismWorkflow } from "./workflows/criticism-workflow";

export const mastra = new Mastra({
  agents: { devilsAdvocateAgent },
  workflows: { criticismWorkflow }
})
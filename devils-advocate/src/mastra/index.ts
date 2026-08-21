import { Mastra } from "@mastra/core";
import { devilsAdvocateAgent } from "./agents/devils-advocate-agent";

export const mastra = new Mastra({
  agents: { devilsAdvocateAgent },
})
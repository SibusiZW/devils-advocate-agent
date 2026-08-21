import { Mastra } from "@mastra/core";
import { agent } from "./agents/agent";

export const mastra = new Mastra({
  agents: { agent }
})
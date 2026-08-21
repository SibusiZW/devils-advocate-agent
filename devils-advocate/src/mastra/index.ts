import { Mastra } from "@mastra/core";
import { devilsAdvocateAgent } from "./agents/devils-advocate-agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

export const mastra = new Mastra({
  agents: { devilsAdvocateAgent },
})
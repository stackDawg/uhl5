import { db } from "./db";
import { interactions, type InsertInteraction, type Interaction } from "@shared/schema";

export interface IStorage {
  logInteraction(interaction: InsertInteraction): Promise<Interaction>;
}

export class DatabaseStorage implements IStorage {
  async logInteraction(interaction: InsertInteraction): Promise<Interaction> {
    const [log] = await db.insert(interactions).values(interaction).returning();
    return log;
  }
}

export const storage = new DatabaseStorage();

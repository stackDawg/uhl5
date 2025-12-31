import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const interactions = pgTable("interactions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // e.g., 'open_letter'
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({ 
  id: true, 
  timestamp: true 
});

export type Interaction = typeof interactions.$inferSelect;
export type InsertInteraction = z.infer<typeof insertInteractionSchema>;

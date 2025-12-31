import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.interactions.log.path, async (req, res) => {
    try {
      const input = api.interactions.log.input.parse(req.body);
      const log = await storage.logInteraction(input);
      res.status(201).json(log);
    } catch (error) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resume routes
  
  // Get all resumes (for now, we'll use a dummy user ID since we don't have authentication)
  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getResumesByUser(1); // Using user ID 1 for now
      res.json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ error: "Failed to fetch resumes" });
    }
  });

  // Get a specific resume
  app.get("/api/resumes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resume = await storage.getResume(id);
      
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      res.status(500).json({ error: "Failed to fetch resume" });
    }
  });

  // Create a new resume
  app.post("/api/resumes", async (req, res) => {
    try {
      const resumeData = insertResumeSchema.parse({
        ...req.body,
        userId: 1 // Using user ID 1 for now
      });
      
      const resume = await storage.createResume(resumeData);
      res.status(201).json(resume);
    } catch (error) {
      console.error("Error creating resume:", error);
      res.status(400).json({ error: "Failed to create resume", details: error });
    }
  });

  // Update a resume
  app.put("/api/resumes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      const resume = await storage.updateResume(id, updateData);
      
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      console.error("Error updating resume:", error);
      res.status(400).json({ error: "Failed to update resume", details: error });
    }
  });

  // Delete a resume
  app.delete("/api/resumes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteResume(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Resume not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting resume:", error);
      res.status(500).json({ error: "Failed to delete resume" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { z } from "zod";
import { 
  insertPersonalInfoSchema, insertSkillsSchema, 
  insertEducationSchema, insertExperienceSchema,
  insertProjectSchema, insertTechnologySchema
} from "@shared/schema";

// Error handling middleware
const asyncHandler = (fn: (req: Request, res: Response) => Promise<any>) => 
  (req: Request, res: Response) => 
    Promise.resolve(fn(req, res)).catch(err => {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    });

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request data
      const result = contactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: result.error.format() 
        });
      }
      
      const { name, email, subject, message } = result.data;
      
      // In a production app, you would send the email here
      // This is a mock implementation that just returns success
      console.log("Contact form submission:", { name, email, subject, message });
      
      // Simulate server processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return res.status(200).json({ 
        message: "Message received! Thank you for your submission." 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your request." 
      });
    }
  });

  // Serve fake resume PDF for download
  app.get("/resume.pdf", (req, res) => {
    // Create a simple text-based PDF representation (not a real PDF)
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Jane_Doe_Resume.pdf");
    res.send("This would be a real PDF resume in a production environment.");
  });

  // Portfolio data endpoints
  
  // Personal Info
  app.get("/api/portfolio/personal-info", asyncHandler(async (req, res) => {
    const info = await storage.getPersonalInfo();
    return res.json(info || {});
  }));

  app.put("/api/portfolio/personal-info", asyncHandler(async (req, res) => {
    const result = insertPersonalInfoSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid personal info data", 
        errors: result.error.format() 
      });
    }

    const updatedInfo = await storage.updatePersonalInfo(result.data);
    return res.json(updatedInfo);
  }));

  // Skills
  app.get("/api/portfolio/skills", asyncHandler(async (req, res) => {
    const category = req.query.category as string | undefined;
    const skills = category ? 
      await storage.getSkillsByCategory(category) : 
      await storage.getAllSkills();
    return res.json(skills);
  }));

  app.post("/api/portfolio/skills", asyncHandler(async (req, res) => {
    const result = insertSkillsSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid skill data", 
        errors: result.error.format() 
      });
    }

    const skill = await storage.createSkill(result.data);
    return res.status(201).json(skill);
  }));

  app.patch("/api/portfolio/skills/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = insertSkillsSchema.partial().safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid skill data", 
        errors: result.error.format() 
      });
    }

    const skill = await storage.updateSkill(id, result.data);
    
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    
    return res.json(skill);
  }));

  app.delete("/api/portfolio/skills/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteSkill(id);
    
    if (!success) {
      return res.status(404).json({ message: "Skill not found" });
    }
    
    return res.status(204).end();
  }));

  // Education
  app.get("/api/portfolio/education", asyncHandler(async (req, res) => {
    const education = await storage.getAllEducation();
    return res.json(education);
  }));

  app.post("/api/portfolio/education", asyncHandler(async (req, res) => {
    const result = insertEducationSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid education data", 
        errors: result.error.format() 
      });
    }

    const education = await storage.createEducation(result.data);
    return res.status(201).json(education);
  }));

  app.patch("/api/portfolio/education/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = insertEducationSchema.partial().safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid education data", 
        errors: result.error.format() 
      });
    }

    const education = await storage.updateEducation(id, result.data);
    
    if (!education) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    
    return res.json(education);
  }));

  app.delete("/api/portfolio/education/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteEducation(id);
    
    if (!success) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    
    return res.status(204).end();
  }));

  // Experience
  app.get("/api/portfolio/experience", asyncHandler(async (req, res) => {
    const experience = await storage.getAllExperience();
    return res.json(experience);
  }));

  app.post("/api/portfolio/experience", asyncHandler(async (req, res) => {
    const result = insertExperienceSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid experience data", 
        errors: result.error.format() 
      });
    }

    const experience = await storage.createExperience(result.data);
    return res.status(201).json(experience);
  }));

  app.patch("/api/portfolio/experience/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = insertExperienceSchema.partial().safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid experience data", 
        errors: result.error.format() 
      });
    }

    const experience = await storage.updateExperience(id, result.data);
    
    if (!experience) {
      return res.status(404).json({ message: "Experience entry not found" });
    }
    
    return res.json(experience);
  }));

  app.delete("/api/portfolio/experience/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteExperience(id);
    
    if (!success) {
      return res.status(404).json({ message: "Experience entry not found" });
    }
    
    return res.status(204).end();
  }));

  // Projects
  app.get("/api/portfolio/projects", asyncHandler(async (req, res) => {
    const projects = await storage.getAllProjects();
    return res.json(projects);
  }));

  app.get("/api/portfolio/projects/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const project = await storage.getProject(id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    return res.json(project);
  }));

  app.post("/api/portfolio/projects", asyncHandler(async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid project data", 
        errors: result.error.format() 
      });
    }

    const project = await storage.createProject(result.data);
    return res.status(201).json(project);
  }));

  app.patch("/api/portfolio/projects/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = insertProjectSchema.partial().safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid project data", 
        errors: result.error.format() 
      });
    }

    const project = await storage.updateProject(id, result.data);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    return res.json(project);
  }));

  app.delete("/api/portfolio/projects/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteProject(id);
    
    if (!success) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    return res.status(204).end();
  }));

  // Technologies
  app.get("/api/portfolio/technologies", asyncHandler(async (req, res) => {
    const technologies = await storage.getAllTechnologies();
    return res.json(technologies);
  }));

  app.get("/api/portfolio/projects/:id/technologies", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const technologies = await storage.getProjectTechnologies(id);
    return res.json(technologies);
  }));

  app.post("/api/portfolio/technologies", asyncHandler(async (req, res) => {
    const result = insertTechnologySchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid technology data", 
        errors: result.error.format() 
      });
    }

    const technology = await storage.createTechnology(result.data);
    return res.status(201).json(technology);
  }));

  app.post("/api/portfolio/projects/:projectId/technologies/:technologyId", asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const technologyId = parseInt(req.params.technologyId);
    
    await storage.addTechnologyToProject(projectId, technologyId);
    return res.status(201).end();
  }));

  app.delete("/api/portfolio/projects/:projectId/technologies/:technologyId", asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const technologyId = parseInt(req.params.technologyId);
    
    await storage.removeTechnologyFromProject(projectId, technologyId);
    return res.status(204).end();
  }));

  const httpServer = createServer(app);

  return httpServer;
}

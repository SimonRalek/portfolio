import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { z } from "zod";

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

  const httpServer = createServer(app);

  return httpServer;
}

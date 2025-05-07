import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table (keeping existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Portfolio schema tables
export const personalInfo = pgTable("personal_info", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  phone: text("phone"),
  avatar: text("avatar"),
  social: json("social").notNull().$type<{
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  }>(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPersonalInfoSchema = createInsertSchema(personalInfo).omit({
  id: true,
  updatedAt: true,
});

export type InsertPersonalInfo = z.infer<typeof insertPersonalInfoSchema>;
export type PersonalInfo = typeof personalInfo.$inferSelect;

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // technical or soft
  icon: text("icon"), // icon name from lucide-react
  proficiency: integer("proficiency"), // 1-100
  ordinal: integer("ordinal").notNull(), // for ordering
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSkillsSchema = createInsertSchema(skills).omit({
  id: true,
  updatedAt: true,
});

export type InsertSkill = z.infer<typeof insertSkillsSchema>;
export type Skill = typeof skills.$inferSelect;

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  field: text("field").notNull(),
  startDate: text("start_date").notNull(), // YYYY-MM
  endDate: text("end_date"), // YYYY-MM or "Present"
  description: text("description"),
  location: text("location"),
  gpa: text("gpa"),
  ordinal: integer("ordinal").notNull(), // for ordering
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertEducationSchema = createInsertSchema(education).omit({
  id: true,
  updatedAt: true,
});

export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Education = typeof education.$inferSelect;

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  startDate: text("start_date").notNull(), // YYYY-MM
  endDate: text("end_date"), // YYYY-MM or "Present"
  description: text("description").notNull(),
  location: text("location"),
  logo: text("logo"),
  ordinal: integer("ordinal").notNull(), // for ordering
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertExperienceSchema = createInsertSchema(experience).omit({
  id: true,
  updatedAt: true,
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experience.$inferSelect;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  github: text("github"),
  demo: text("demo"),
  featured: boolean("featured").default(false),
  year: varchar("year", { length: 4 }),
  ordinal: integer("ordinal").notNull(), // for ordering
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  updatedAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTechnologySchema = createInsertSchema(technologies).omit({
  id: true,
  updatedAt: true,
});

export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect;

export const projectTechnologies = pgTable("project_technologies", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: 'cascade' }),
  technologyId: integer("technology_id").notNull().references(() => technologies.id, { onDelete: 'cascade' }),
});

// Relations
export const projectsRelations = relations(projects, ({ many }: { many: any }) => ({
  technologies: many(projectTechnologies)
}));

export const technologiesRelations = relations(technologies, ({ many }: { many: any }) => ({
  projects: many(projectTechnologies)
}));

export const projectTechnologiesRelations = relations(projectTechnologies, ({ one }: { one: any }) => ({
  project: one(projects, {
    fields: [projectTechnologies.projectId],
    references: [projects.id],
  }),
  technology: one(technologies, {
    fields: [projectTechnologies.technologyId],
    references: [technologies.id],
  }),
}));

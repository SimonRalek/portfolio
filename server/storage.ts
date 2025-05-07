import { 
  users, type User, type InsertUser,
  personalInfo, type PersonalInfo, type InsertPersonalInfo,
  skills, type Skill, type InsertSkill,
  education, type Education, type InsertEducation,
  experience, type Experience, type InsertExperience,
  projects, type Project, type InsertProject,
  technologies, type Technology, type InsertTechnology,
  projectTechnologies
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc } from "drizzle-orm";

// Extended interface with portfolio CRUD methods
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Personal info operations
  getPersonalInfo(): Promise<PersonalInfo | undefined>;
  updatePersonalInfo(info: InsertPersonalInfo): Promise<PersonalInfo>;
  
  // Skills operations
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Education operations
  getAllEducation(): Promise<Education[]>;
  getEducation(id: number): Promise<Education | undefined>;
  createEducation(edu: InsertEducation): Promise<Education>;
  updateEducation(id: number, edu: Partial<InsertEducation>): Promise<Education | undefined>;
  deleteEducation(id: number): Promise<boolean>;
  
  // Experience operations
  getAllExperience(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(exp: InsertExperience): Promise<Experience>;
  updateExperience(id: number, exp: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Projects operations
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Technologies operations
  getAllTechnologies(): Promise<Technology[]>;
  getProjectTechnologies(projectId: number): Promise<Technology[]>;
  addTechnologyToProject(projectId: number, technologyId: number): Promise<void>;
  removeTechnologyFromProject(projectId: number, technologyId: number): Promise<void>;
  createTechnology(tech: InsertTechnology): Promise<Technology>;
}

// Database implementation of the storage interface
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Personal info operations
  async getPersonalInfo(): Promise<PersonalInfo | undefined> {
    // We only expect one personal info record, so get the first one
    const [info] = await db.select().from(personalInfo).orderBy(desc(personalInfo.id)).limit(1);
    return info;
  }
  
  async updatePersonalInfo(info: Omit<InsertPersonalInfo, 'social'> & { social: { github?: string; linkedin?: string; twitter?: string; instagram?: string; } }): Promise<PersonalInfo> {
    // Get current info
    const currentInfo = await this.getPersonalInfo();
    
    // If info exists, update it, otherwise create new
    if (currentInfo) {
      const [updated] = await db
        .update(personalInfo)
        .set({
          name: info.name,
          title: info.title,
          description: info.description,
          email: info.email,
          location: info.location,
          phone: info.phone,
          avatar: info.avatar,
          social: info.social
        })
        .where(eq(personalInfo.id, currentInfo.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(personalInfo)
        .values({
          name: info.name,
          title: info.title,
          description: info.description,
          email: info.email,
          location: info.location,
          phone: info.phone,
          avatar: info.avatar,
          social: info.social
        })
        .returning();
      return created;
    }
  }
  
  // Skills operations
  async getAllSkills(): Promise<Skill[]> {
    return db.select().from(skills).orderBy(skills.ordinal);
  }
  
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return db
      .select()
      .from(skills)
      .where(eq(skills.category, category))
      .orderBy(skills.ordinal);
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [created] = await db.insert(skills).values(skill).returning();
    return created;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updated] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updated;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    await db.delete(skills).where(eq(skills.id, id));
    return true; // Assume success if no error thrown
  }
  
  // Education operations
  async getAllEducation(): Promise<Education[]> {
    return db.select().from(education).orderBy(education.ordinal);
  }
  
  async getEducation(id: number): Promise<Education | undefined> {
    const [edu] = await db.select().from(education).where(eq(education.id, id));
    return edu;
  }
  
  async createEducation(edu: InsertEducation): Promise<Education> {
    const [created] = await db.insert(education).values(edu).returning();
    return created;
  }
  
  async updateEducation(id: number, edu: Partial<InsertEducation>): Promise<Education | undefined> {
    const [updated] = await db
      .update(education)
      .set(edu)
      .where(eq(education.id, id))
      .returning();
    return updated;
  }
  
  async deleteEducation(id: number): Promise<boolean> {
    await db.delete(education).where(eq(education.id, id));
    return true; // Assume success if no error thrown
  }
  
  // Experience operations
  async getAllExperience(): Promise<Experience[]> {
    return db.select().from(experience).orderBy(experience.ordinal);
  }
  
  async getExperience(id: number): Promise<Experience | undefined> {
    const [exp] = await db.select().from(experience).where(eq(experience.id, id));
    return exp;
  }
  
  async createExperience(exp: InsertExperience): Promise<Experience> {
    const [created] = await db.insert(experience).values(exp).returning();
    return created;
  }
  
  async updateExperience(id: number, exp: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [updated] = await db
      .update(experience)
      .set(exp)
      .where(eq(experience.id, id))
      .returning();
    return updated;
  }
  
  async deleteExperience(id: number): Promise<boolean> {
    await db.delete(experience).where(eq(experience.id, id));
    return true; // Assume success if no error thrown
  }
  
  // Projects operations
  async getAllProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(projects.ordinal);
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    await db.delete(projects).where(eq(projects.id, id));
    return true; // Assume success if no error thrown
  }
  
  // Technologies operations
  async getAllTechnologies(): Promise<Technology[]> {
    return db.select().from(technologies).orderBy(technologies.name);
  }
  
  async getProjectTechnologies(projectId: number): Promise<Technology[]> {
    const result = await db
      .select({
        id: technologies.id,
        name: technologies.name,
        updatedAt: technologies.updatedAt
      })
      .from(technologies)
      .innerJoin(
        projectTechnologies,
        eq(projectTechnologies.technologyId, technologies.id)
      )
      .where(eq(projectTechnologies.projectId, projectId))
      .orderBy(technologies.name);
    
    return result;
  }
  
  async addTechnologyToProject(projectId: number, technologyId: number): Promise<void> {
    await db
      .insert(projectTechnologies)
      .values({ projectId, technologyId })
      .onConflictDoNothing();
  }
  
  async removeTechnologyFromProject(projectId: number, technologyId: number): Promise<void> {
    await db
      .delete(projectTechnologies)
      .where(
        sql`${projectTechnologies.projectId} = ${projectId} AND ${projectTechnologies.technologyId} = ${technologyId}`
      );
  }
  
  async createTechnology(tech: InsertTechnology): Promise<Technology> {
    const [created] = await db.insert(technologies).values(tech).returning();
    return created;
  }
}

// Export a database storage instance
export const storage = new DatabaseStorage();

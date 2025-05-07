import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";
import { 
  PersonalInfoForm, 
  SkillsManager, 
  EducationManager, 
  ExperienceManager,
  ProjectsManager,
} from "@/components/admin";

export default function Admin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <Helmet>
        <title>Portfolio Admin | Manage Your Portfolio Content</title>
        <meta
          name="description"
          content="Admin dashboard to manage your portfolio content. Update your personal info, skills, education, experience, and projects."
        />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Portfolio Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage and update your portfolio content
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <Card>
          <TabsContent value="personal-info">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your name, title, contact details and social media links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalInfoForm />
            </CardContent>
          </TabsContent>

          <TabsContent value="skills">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Manage your technical and soft skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillsManager />
            </CardContent>
          </TabsContent>

          <TabsContent value="education">
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Manage your educational background
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EducationManager />
            </CardContent>
          </TabsContent>

          <TabsContent value="experience">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>
                Manage your work experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExperienceManager />
            </CardContent>
          </TabsContent>

          <TabsContent value="projects">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Showcase your best work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectsManager />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
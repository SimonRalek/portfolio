import React from "react";
import { Button } from "@/components/ui/button";
import { FolderKanban } from "lucide-react";

export default function ProjectsManager() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <FolderKanban className="w-12 h-12 text-blue-500 mb-2" />
      <h3 className="text-xl font-medium">Projects Management</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        This component will be implemented to manage your portfolio projects.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Similar in functionality to the Skills Manager with form inputs for project title, description, image URLs, links, technologies used, etc.
      </p>
    </div>
  );
}
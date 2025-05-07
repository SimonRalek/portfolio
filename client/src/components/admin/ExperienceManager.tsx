import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export default function ExperienceManager() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <Briefcase className="w-12 h-12 text-blue-500 mb-2" />
      <h3 className="text-xl font-medium">Work Experience Management</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        This component will be implemented to manage your work experience.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Similar in functionality to the Skills Manager with form inputs for company, position, dates, description, etc.
      </p>
    </div>
  );
}
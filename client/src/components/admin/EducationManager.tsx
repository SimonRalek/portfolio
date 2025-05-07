import React from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function EducationManager() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <Info className="w-12 h-12 text-blue-500 mb-2" />
      <h3 className="text-xl font-medium">Education Management</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        This component will be implemented to manage your education history.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Similar in functionality to the Skills Manager with form inputs for institution, degree, field, dates, etc.
      </p>
    </div>
  );
}
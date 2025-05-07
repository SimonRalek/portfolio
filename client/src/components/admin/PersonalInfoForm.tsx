import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Personal info form schema based on our database model
const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  social: z.object({
    github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  }),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch personal info data
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/portfolio/personal-info"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Set up form with react-hook-form and zod validation
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      email: "",
      location: "",
      phone: "",
      avatar: "",
      social: {
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
      },
    },
  });

  // Update form values when data is loaded
  useState(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        title: data.title || "",
        description: data.description || "",
        email: data.email || "",
        location: data.location || "",
        phone: data.phone || "",
        avatar: data.avatar || "",
        social: {
          github: data.social?.github || "",
          linkedin: data.social?.linkedin || "",
          twitter: data.social?.twitter || "",
          instagram: data.social?.instagram || "",
        },
      });
    }
  });

  // Mutation for updating personal info
  const mutation = useMutation({
    mutationFn: (data: PersonalInfoValues) => 
      apiRequest("/api/portfolio/personal-info", { method: "PUT", data }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your personal information has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/personal-info"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update personal information",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (values: PersonalInfoValues) => {
    mutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
        <p className="text-red-600 dark:text-red-400">
          Error loading personal information: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Me</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description about yourself"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will appear in the About section of your portfolio
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="New York, NY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Link to your profile image or leave blank to use default
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">
            Social Media Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="social.github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="min-w-[120px]"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
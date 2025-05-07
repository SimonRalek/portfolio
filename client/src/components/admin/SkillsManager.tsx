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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil, Loader2, Plus, AlertCircle } from "lucide-react";

// Skill form schema based on our database model
const skillSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  icon: z.string().optional(),
  proficiency: z.number().min(0).max(100),
  ordinal: z.number().min(0),
});

type SkillValues = z.infer<typeof skillSchema>;

export default function SkillsManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [deletingSkillId, setDeletingSkillId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch skills
  const { data: skills = [], isLoading, error } = useQuery({
    queryKey: ["/api/portfolio/skills", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory 
        ? `/api/portfolio/skills?category=${selectedCategory}`
        : "/api/portfolio/skills";
      return apiRequest(url);
    },
  });

  // Default form values
  const defaultValues: SkillValues = {
    name: "",
    category: "technical",
    icon: "",
    proficiency: 75,
    ordinal: skills.length,
  };

  const form = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
    defaultValues,
  });

  // Reset form when dialog opens/closes
  const resetForm = (skill?: any) => {
    if (skill) {
      form.reset({
        name: skill.name,
        category: skill.category,
        icon: skill.icon || "",
        proficiency: skill.proficiency || 75,
        ordinal: skill.ordinal,
      });
    } else {
      form.reset({
        ...defaultValues,
        ordinal: skills.length,
      });
    }
  };

  // Handle opening/closing dialogs
  const handleOpenAddDialog = () => {
    setEditingSkill(null);
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleOpenEditDialog = (skill: any) => {
    setEditingSkill(skill);
    resetForm(skill);
    setIsAddDialogOpen(true);
  };

  // Create skill mutation
  const createMutation = useMutation({
    mutationFn: (data: SkillValues) => 
      apiRequest("/api/portfolio/skills", { method: "POST", data }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Skill has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/skills"] });
      handleCloseAddDialog();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add skill",
        variant: "destructive",
      });
    },
  });

  // Update skill mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SkillValues }) => 
      apiRequest(`/api/portfolio/skills/${id}`, { method: "PATCH", data }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Skill has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/skills"] });
      handleCloseAddDialog();
      setEditingSkill(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update skill",
        variant: "destructive",
      });
    },
  });

  // Delete skill mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/portfolio/skills/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Skill has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/skills"] });
      setDeletingSkillId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete skill",
        variant: "destructive",
      });
      setDeletingSkillId(null);
    },
  });

  // Form submission handler
  const onSubmit = (values: SkillValues) => {
    if (editingSkill) {
      updateMutation.mutate({ id: editingSkill.id, data: values });
    } else {
      createMutation.mutate(values);
    }
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
        <p className="text-red-600 dark:text-red-400 flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          Error loading skills: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) => 
              setSelectedCategory(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technical">Technical Skills</SelectItem>
              <SelectItem value="soft">Soft Skills</SelectItem>
            </SelectContent>
          </Select>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {skills.length} skills found
          </p>
        </div>
        
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No skills found. Add your first skill to get started.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Skill</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[200px]">Proficiency</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill: any) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">{skill.ordinal + 1}</TableCell>
                  <TableCell>{skill.name}</TableCell>
                  <TableCell>
                    <Badge variant={skill.category === "technical" ? "default" : "secondary"}>
                      {skill.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                        style={{ width: `${skill.proficiency || 0}%` }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEditDialog(skill)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingSkillId(skill.id)}
                        disabled={deleteMutation.isPending && deletingSkillId === skill.id}
                      >
                        {deleteMutation.isPending && deletingSkillId === skill.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Skill Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
            <DialogDescription>
              {editingSkill
                ? "Update the details of your skill"
                : "Add a new skill to your portfolio"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input placeholder="React" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical">Technical Skill</SelectItem>
                        <SelectItem value="soft">Soft Skill</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'code' or 'database'" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a Lucide icon name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proficiency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency Level: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ordinal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order/Position</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Lower numbers appear first
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseAddDialog}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Skill"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deletingSkillId !== null}
        onOpenChange={(open) => !open && setDeletingSkillId(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this skill? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setDeletingSkillId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletingSkillId && deleteMutation.mutate(deletingSkillId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Skill"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
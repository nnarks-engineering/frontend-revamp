import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createService } from "@/shared/api/services";
import { QUERY_KEYS } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";

interface CreateServiceModalProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const createServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
  category: z.string().optional(),
});

function validateField<T>(schema: z.ZodType<T>, value: unknown) {
  const result = schema.safeParse(value);
  if (result.success) return undefined;
  return result.error.issues[0]?.message;
}

export function CreateServiceModal({ companyId, open, onOpenChange }: CreateServiceModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.services });
      toast.success("Service created successfully");
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create service");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({
        company_id: companyId,
        title: value.title,
        description: value.description,
        category: value.category || null,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
          <DialogDescription>
            Add a new service to your organization. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 py-4"
        >
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) => validateField(createServiceSchema.shape.title, value),
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-foreground font-semibold">Service Title <span className="text-destructive">*</span></Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g., UI/UX Design Consultation"
                  className={cn(field.state.meta.errors.length > 0 && "border-destructive focus-visible:ring-destructive")}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-[12.5px] text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                )}
              </div>
            )}
          />

          <form.Field
            name="category"
            validators={{
              onChange: ({ value }) => validateField(createServiceSchema.shape.category, value),
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-foreground font-semibold">Category</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g., Design, Development, Consulting"
                />
              </div>
            )}
          />

          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) => validateField(createServiceSchema.shape.description, value),
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-foreground font-semibold">Description <span className="text-destructive">*</span></Label>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Describe your service in detail..."
                  rows={4}
                  className={cn(
                    "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    field.state.meta.errors.length > 0 && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-[12.5px] text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                )}
              </div>
            )}
          />

          <DialogFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || mutation.isPending}
                  className="w-full sm:w-auto"
                >
                  {(isSubmitting || mutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Service
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

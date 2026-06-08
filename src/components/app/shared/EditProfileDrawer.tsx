import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentProfile, useUpdateProfile } from "@/shared/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface EditProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDrawer({ open, onOpenChange }: EditProfileDrawerProps) {
  const { data: profile } = useCurrentProfile();
  const updateProfile = useUpdateProfile();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [otherNames, setOtherNames] = React.useState("");

  React.useEffect(() => {
    if (open && profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setOtherNames(profile.other_names || "");
    }
  }, [open, profile]);

  const handleSave = () => {
    updateProfile.mutate({
      first_name: firstName,
      last_name: lastName,
      other_names: otherNames,
    }, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0 sm:max-w-md w-full flex flex-col bg-background">
        <div className="h-full flex flex-col">
          <SheetHeader variant="tertiary">
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>Update your personal details.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Other Names</label>
                <Input
                  value={otherNames}
                  onChange={(e) => setOtherNames(e.target.value)}
                  placeholder="Enter your other names (optional)"
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-muted/20">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateProfile.isPending}>
              {updateProfile.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

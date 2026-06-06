import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentProfile, useUpdateProfile } from "@/shared/hooks/use-auth";
import { X, Loader2 } from "lucide-react";
import RoundingLine from "@/assets/svg/rounding-line.svg?react";

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
          <div className="bg-tertiary relative overflow-hidden shrink-0 px-6 pt-6 pb-5 border-b border-tertiary-600/20">
            <RoundingLine className="absolute z-0 -top-6 left-0 text-tertiary-400 opacity-50 scale-x-[-1]" aria-hidden />
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-3xl leading-none font-millik text-tertiary-foreground">Edit Profile</h2>
                <p className="text-tertiary-foreground/75 mt-2 text-base">Update your personal details.</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="p-2 -mr-2 rounded-lg text-tertiary-foreground/70 hover:text-tertiary-foreground hover:bg-black/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

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

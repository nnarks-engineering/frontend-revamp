import { Loader2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { useCurrentProfile, useUpdateProfile } from "@/shared/hooks/auth/use-auth";


interface EditProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDrawer({ open, onOpenChange }: EditProfileDrawerProps) {
  const { data: profile } = useCurrentProfile();
  const updateProfile = useUpdateProfile();

  const [firstName, setFirstName] = React.useState(profile?.first_name || "");
  const [lastName, setLastName] = React.useState(profile?.last_name || "");
  const [otherNames, setOtherNames] = React.useState(profile?.other_names || "");

  // Update local state when drawer opens with a new profile
  const prevOpenRef = React.useRef(open);
  React.useEffect(() => {
    if (open && !prevOpenRef.current && profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setOtherNames(profile.other_names || "");
    }
    prevOpenRef.current = open;
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
      <SheetContent side="right" className="sm:max-w-md w-full">
        <SheetHeader variant="tertiary">
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Update your personal details.</SheetDescription>
        </SheetHeader>

        <SheetBody>
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
        </SheetBody>

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateProfile.isPending}>
            {updateProfile.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

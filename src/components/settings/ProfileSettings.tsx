
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/profile";

interface ProfileSettingsProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    bio: string;
  };
  loading: boolean;
  userId: string | undefined;
  onProfileChange: (field: string, value: string) => void;
}

export const ProfileSettings = ({ profile, loading, userId, onProfileChange }: ProfileSettingsProps) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    setIsSaving(true);
    try {
      // Use type assertion to help TypeScript understand the structure
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          first_name: profile.firstName,
          last_name: profile.lastName,
          company: profile.company,
          bio: profile.bio
        } as Profile);

      if (error) {
        toast.error("Error updating profile");
        console.error(error);
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            value={profile.firstName}
            onChange={(value) => onProfileChange('firstName', value)}
          />
          <FormField
            label="Last Name"
            value={profile.lastName}
            onChange={(value) => onProfileChange('lastName', value)}
          />
          <FormField
            label="Email Address"
            value={profile.email}
            type="email"
            disabled={true}
          />
          <FormField
            label="Company"
            value={profile.company}
            onChange={(value) => onProfileChange('company', value)}
          />
        </div>
        <FormField
          label="Bio"
          value={profile.bio}
          onChange={(value) => onProfileChange('bio', value)}
          type="textarea"
        />
      </CardContent>
      <CardFooter>
        <Button 
          className="bg-seo-purple hover:bg-seo-purple-dark"
          onClick={handleSave}
          disabled={loading || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};

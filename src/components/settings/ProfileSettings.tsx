
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input 
              value={profile.firstName}
              onChange={(e) => onProfileChange('firstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input 
              value={profile.lastName}
              onChange={(e) => onProfileChange('lastName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input 
              value={profile.email}
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input 
              value={profile.company}
              onChange={(e) => onProfileChange('company', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <Textarea 
            value={profile.bio}
            onChange={(e) => onProfileChange('bio', e.target.value)}
            rows={4}
          />
        </div>
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

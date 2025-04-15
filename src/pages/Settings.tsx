
import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { ApiSettings } from "@/components/settings/ApiSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { Profile } from "@/types/profile";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    bio: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Use type assertion to help TypeScript understand the structure
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          toast.error("Error fetching profile");
          console.error(error);
        } else if (data) {
          // Use the retrieved data with type safety
          const profileData = data as Profile;
          setProfile({
            firstName: profileData.first_name || "",
            lastName: profileData.last_name || "",
            email: user.email || "",
            company: profileData.company || "",
            bio: profileData.bio || ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading && !profile.email) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings 
            profile={profile} 
            loading={loading}
            userId={user?.id}
            onProfileChange={handleInputChange}
          />
        </TabsContent>

        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="api">
          <ApiSettings />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

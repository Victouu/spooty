import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSpotify } from "../hooks/useSpotify";
import { Dashboard } from "./Dashboard";

export const Profile = () => {
  const { token } = useAuth();
  const { getCurrentUserProfile } = useSpotify();
  const [setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const profileData = await getCurrentUserProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0F0C24] flex items-center justify-center">
        <p className="text-[#8A6BF6]">
          Vous devez être connecté pour accéder à cette page.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0C24] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8A6BF6] border-t-transparent"></div>
      </div>
    );
  }

  return <Dashboard />;
};

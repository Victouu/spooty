import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSpotify } from "../hooks/useSpotify";
import { Dashboard } from "./Dashboard";

export const Profile = () => {
  const { token, logout, isAuthenticated } = useAuth();
  const { getCurrentUserProfile } = useSpotify();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, isAuthenticated]);

  if (!isAuthenticated || !token) {
    return (
      <div className="min-h-screen bg-dark-1 flex items-center justify-center">
        <p className="text-purple-500">
          Vous devez être connecté pour accéder à cette page.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-1">
      {/* <div className="bg-[#0F0C24] p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profile?.images?.[0]?.url}
              className="w-12 h-12 rounded-full aspect-square object-cover border-2 border-purple-500/30 hover:border-purple-500 cursor-pointer"
              alt="Profil"
            />
            <span className="text-purple-500 font-bold">
              {profile?.display_name}
            </span>
          </div>
          <button
            onClick={logout}
            className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
          >
            Déconnexion
          </button>
        </div>
      </div> */}

      {/* Dashboard */}
      <Dashboard />
    </div>
  );
};

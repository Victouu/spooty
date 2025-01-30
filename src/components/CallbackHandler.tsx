import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const CallbackHandler = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("spotify_token", accessToken);
      window.location.href = "/profile";
    } else {
      logout();
    }
  }, [logout]);

  return (
    <div className="min-h-screen bg-[#0F0C24] flex items-center justify-center">
      <div className="animate-pulse text-[#8A6BF6]">Connexion en cours...</div>
    </div>
  );
};

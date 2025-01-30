import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("spotify_token");
    return storedToken || null;
  });

  const validateToken = async (token: string) => {
    try {
      await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch {
      return false;
    }
  };
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token && !(await validateToken(token))) {
        logout();
      }
    };

    checkTokenValidity();
  }, [token]);
  const login = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-top-read", // Scope essentiel pour les données d'écoute
      "user-library-read",
    ].join(" ");

    window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("spotify_token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

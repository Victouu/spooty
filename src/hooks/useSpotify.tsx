import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export const useSpotify = () => {
  const { token } = useAuth();

  const getData = async <T,>(endpoint: string): Promise<T> => {
    const response = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const getTopTracks = async (timeRange: string, limit: number) => {
    return getData(`me/top/tracks?time_range=${timeRange}&limit=${limit}`);
  };

  const getTopArtists = async (timeRange: string, limit: number) => {
    return getData(`me/top/artists?time_range=${timeRange}&limit=${limit}`);
  };

  const getCurrentPlayback = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur de lecture:", error);
      return null;
    }
  };

  const getTrackPlayCount = async (trackId: string) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/tracks/${trackId}/play-count`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.count;
    } catch (error) {
      console.error("Erreur de récupération des écoutes:", error);
      return 0;
    }
  };

  const getCurrentUserProfile = async () => {
    return getData("me");
  };

  return {
    getTopTracks,
    getTopArtists,
    getCurrentPlayback,
    getTrackPlayCount,
    getCurrentUserProfile,
  };
};

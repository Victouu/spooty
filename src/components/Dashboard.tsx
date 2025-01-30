import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSpotify } from "../hooks/useSpotify";
import { NowPlayingBar } from "./NowPlayingBar";
import { TimeRangeFilter } from "./TimeRangeFilter";

interface Track {
  id: string;
  name: string;
  album: { images: { url: string }[] };
  artists: { name: string }[];
  playCount: number;
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
}

export const Dashboard = () => {
  const {
    getTopTracks,
    getTopArtists,
    getCurrentUserProfile,
    getTrackPlayCount,
  } = useSpotify();
  const { token, logout } = useAuth();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"tracks" | "artists">("tracks");
  const [timeRange, setTimeRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const [profileData, topTracks, topArtists] = await Promise.all([
          getCurrentUserProfile(),
          getTopTracks(timeRange, 10),
          getTopArtists(timeRange, 10),
        ]);

        // Récupérer le nombre d'écoutes pour chaque titre
        const tracksWithPlayCount = await Promise.all(
          (topTracks as any).items.map(async (track: any) => {
            const playCount = await getTrackPlayCount(track.id);
            return { ...track, playCount };
          })
        );

        setProfile(profileData);
        setTracks(tracksWithPlayCount);
        setArtists((topArtists as any).items);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, timeRange]);

  return (
    <div className="min-h-screen bg-[#0F0C24] pb-24">
      {/* En-tête */}
      <div className="bg-[#1A1734] p-6 border-b border-[#5A43D9]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#8A6BF6]">
            Vos Statistiques
          </h1>
          <div className="flex items-center gap-4">
            <img
              src={profile?.images?.[0]?.url}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#8A6BF6]/30 hover:border-[#8A6BF6] cursor-pointer"
              alt="Profil"
            />
            <button
              onClick={logout}
              className="bg-[#8A6BF6] hover:bg-[#5A43D9] text-white px-4 py-2 rounded-full text-sm transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("tracks")}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === "tracks"
                ? "bg-[#8A6BF6] text-white"
                : "bg-[#2A274A] text-[#B8B5CC] hover:bg-[#1A1734]"
            }`}
          >
            🎵 Top Titres
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === "artists"
                ? "bg-[#8A6BF6] text-white"
                : "bg-[#2A274A] text-[#B8B5CC] hover:bg-[#1A1734]"
            }`}
          >
            🎤 Top Artistes
          </button>
        </div>

        {/* Filtres temporels */}
        <TimeRangeFilter selectedRange={timeRange} onChange={setTimeRange} />

        {/* Contenu */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#8A6BF6] border-t-transparent" />
            <p className="mt-4 text-[#B8B5CC]">Chargement des données...</p>
          </div>
        ) : (
          <div className="bg-[#1A1734] rounded-xl p-6 border border-[#5A43D9]/20">
            <h2 className="text-2xl font-bold text-[#8A6BF6] mb-6">
              {activeTab === "tracks" ? "Top Titres" : "Top Artistes"}
            </h2>
            <div className="space-y-4">
              {(activeTab === "tracks" ? tracks : artists).map(
                (item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#2A274A] hover:bg-[#5A43D9]/10 transition-colors"
                  >
                    <span className="text-[#B8B5CC] w-8">#{index + 1}</span>
                    <img
                      src={
                        activeTab === "tracks"
                          ? item.album.images[0]?.url
                          : item.images[0]?.url
                      }
                      className="w-12 h-12 rounded-lg object-cover"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#F5F3FF]">
                        {item.name}
                      </h3>
                      <p className="text-[#B8B5CC] text-sm">
                        {activeTab === "tracks"
                          ? item.artists.map((a: any) => a.name).join(", ")
                          : `${item.followers.total.toLocaleString()} followers`}
                      </p>
                    </div>
                    {activeTab === "tracks" && (
                      <span className="text-[#8A6BF6] bg-[#5A43D9]/10 px-3 py-1 rounded-full">
                        {(item as Track).playCount} écoutes
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <NowPlayingBar />
    </div>
  );
};

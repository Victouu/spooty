import { useEffect, useState } from "react";
import { useSpotify } from "../hooks/useSpotify";

export const NowPlayingBar = () => {
  const { getCurrentPlayback } = useSpotify();
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playback = await getCurrentPlayback();
        if (playback?.item) {
          setCurrentTrack({
            ...playback.item,
            progress_ms: playback.progress_ms,
            duration_ms: playback.item.duration_ms,
          });
        } else {
          setCurrentTrack(null);
        }
      } catch (error) {
        console.error("Erreur de lecture:", error);
        setCurrentTrack(null);
      }
    };

    const interval = setInterval(fetchData, 3000);
    fetchData(); // Charger immédiatement
    return () => clearInterval(interval);
  }, []);

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1734] border-t border-[#5A43D9]/20 p-4">
        <div className="max-w-7xl mx-auto text-center text-[#B8B5CC]">
          Aucune lecture en cours
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1734] border-t border-[#5A43D9]/20 p-4">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <img
          src={currentTrack.album.images[0]?.url}
          className="w-12 h-12 rounded-lg object-cover"
          alt="Album"
        />

        <div className="flex-1">
          <p className="text-[#8A6BF6] font-semibold truncate">
            {currentTrack.name}
          </p>
          <p className="text-[#B8B5CC] text-sm truncate">
            {currentTrack.artists.map((a: any) => a.name).join(", ")}
          </p>
        </div>

        <div className="w-1/3 bg-[#2A274A] h-1 rounded-full overflow-hidden">
          <div
            className="bg-[#8A6BF6] h-full"
            style={{
              width: `${
                (currentTrack.progress_ms / currentTrack.duration_ms) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

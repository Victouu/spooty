interface RankingListProps {
  items: any[];
  title: string;
  type: "track" | "artist";
  theme: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const RankingList = ({
  items,
  title,
  type,
  theme,
}: RankingListProps) => {
  const getSubtitle = (item: any) => {
    if (type === "track") {
      return item.artists.map((a: any) => a.name).join(", ");
    }
    return `${item.followers.toLocaleString()} followers`;
  };

  return (
    <div>
      <h2 className={`text-2xl font-bold ${theme.primary} mb-8`}>{title}</h2>

      <div className="space-y-4">
        {items.slice(0, 10).map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-6 p-4 rounded-xl ${theme.background} hover:${theme.surface} transition-colors border ${theme.accent}/10`}
          >
            <span
              className={`text-xl font-bold ${theme.primary} w-12 text-center`}
            >
              {index + 1}
            </span>

            <img
              src={
                type === "track"
                  ? item.album.images[0]?.url
                  : item.images[0]?.url
              }
              className="w-16 h-16 rounded-lg object-cover"
              alt={item.name}
            />

            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${theme.primary}`}>
                {item.name}
              </h3>
              <p className={`${theme.secondary} text-sm`}>
                {getSubtitle(item)}
              </p>
            </div>

            {type === "track" && (
              <div className={`text-right ${theme.primary}`}>
                <div className="text-xl font-bold">{item.plays}</div>
                <div className="text-sm">écoutes</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

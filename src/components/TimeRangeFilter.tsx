interface TimeRangeFilterProps {
  selectedRange: "short_term" | "medium_term" | "long_term";
  onChange: (range: "short_term" | "medium_term" | "long_term") => void;
}

export const TimeRangeFilter = ({
  selectedRange,
  onChange,
}: TimeRangeFilterProps) => {
  const ranges = [
    { value: "short_term", label: "4 semaines" },
    { value: "medium_term", label: "6 mois" },
    { value: "long_term", label: "Tous le temps" },
  ];

  return (
    <div className="flex gap-2 mb-8">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() =>
            onChange(range.value as "short_term" | "medium_term" | "long_term")
          }
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedRange === range.value
              ? "bg-[#8A6BF6] text-white"
              : "bg-[#2A274A] text-[#B8B5CC] hover:bg-[#1A1734]"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

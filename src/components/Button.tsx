export const Button = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all ${className}`}
  >
    {children}
  </button>
);

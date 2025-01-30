export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-dark-2 rounded-xl p-6 border border-purple-500/20 ${className}`}
  >
    {children}
  </div>
);

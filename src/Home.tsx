import { useAuth } from "./contexts/AuthContext";

export const Home = () => {
  const { login } = useAuth();
  return (
    <div className="min-h-screen bg-[#0F0C24] flex flex-col items-center justify-center p-8 text-center space-y-12">
      {/* Titre principal */}
      <div className="space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Spotify Stats+
        </h1>
        <p className="text-xl text-gray-400">
          Votre bibliothèque musicale analysée
        </p>
      </div>

      {/* Carte de présentation */}
      <div className="bg-dark-2 rounded-2xl p-8 border border-purple-500/20 max-w-2xl">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <StatCard value="∞" label="Titres analysés" />
          <StatCard value="50+" label="Artistes suivis" />
          <StatCard value="24/7" label="Disponibilité" />
        </div>

        <button
          onClick={login}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-12 rounded-full 
  transition-all flex items-center gap-3 mx-auto group"
        >
          <svg
            className="w-6 h-6 group-hover:animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Commencer l'analyse
        </button>
      </div>

      {/* Fonctionnalités */}
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon="🎧"
          title="Écoute en temps réel"
          text="Suivez vos habitudes minute par minute"
        />
        <FeatureCard
          icon="📈"
          title="Statistiques avancées"
          text="Graphiques et tendances détaillés"
        />
        <FeatureCard
          icon="🔒"
          title="Données privées"
          text="Vos informations restent confidentielles"
        />
      </div>
    </div>
  );
};

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-dark-3 p-4 rounded-xl">
    <div className="text-3xl font-bold text-purple-500 mb-2">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) => (
  <div className="bg-dark-2 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-purple-400 mb-2">{title}</h3>
    <p className="text-gray-400">{text}</p>
  </div>
);

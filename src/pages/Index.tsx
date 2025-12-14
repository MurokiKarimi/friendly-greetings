import { Gamepad2, Sparkles } from 'lucide-react';
import sophiePhoto from '@/assets/sophie-photo.jpeg';
import TicTacToe from '@/components/TicTacToe';

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Photo */}
          <div className="relative mb-8 animate-float">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl scale-110" />
            <img
              src={sophiePhoto}
              alt="Sophie Karimi"
              className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-card shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-2 shadow-lg animate-wiggle">
              <Gamepad2 className="w-6 h-6 text-accent-foreground" />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-6xl font-bold font-display text-foreground mb-4">
            Sophie Karimi
          </h1>

          {/* Tagline */}
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-md font-body">
              I am a game enthusiast, and I believe everything is possible when you put your heart and mind to it.
            </p>
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
        </div>
      </section>

      {/* Game Section */}
      <section className="container pb-16 md:pb-24">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-border max-w-lg mx-auto">
          {/* Challenge Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
              🎮 Game Challenge!
            </h2>
            <p className="text-muted-foreground font-body">
              Think you can beat me? Let's find out!
            </p>
          </div>

          {/* Tic Tac Toe Game */}
          <TicTacToe />

          {/* Footer note */}
          <p className="text-center text-sm text-muted-foreground mt-8 font-body">
            You play as <span className="text-game-x font-bold">✕</span> • Sophie plays as <span className="text-game-o font-bold">○</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;

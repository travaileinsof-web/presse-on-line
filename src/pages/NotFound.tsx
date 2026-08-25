import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-brand-dark px-6 py-20 text-white">
      <div className="absolute right-[-8rem] top-[-8rem] h-72 w-72 rounded-full border-[3rem] border-brand-red/30" />
      <div className="absolute bottom-[-10rem] left-[-6rem] h-80 w-80 rounded-full border-[4rem] border-brand-yellow/20" />

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">
            <span className="h-1 w-10 bg-brand-red" /> Einsof-media
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-serif text-[clamp(7rem,20vw,14rem)] font-bold leading-[0.75] text-white/10">404</p>
              <h1 className="-mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight md:-mt-10 md:text-6xl">
                Cette page a quitté le fil de l’actualité.
              </h1>
            </div>
            <div className="max-w-sm border-l-2 border-brand-red pl-5 text-sm leading-relaxed text-gray-300">
              L’adresse demandée n’est plus disponible ou n’a jamais été publiée. Retrouvez les dernières informations depuis notre page d’accueil.
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center gap-2 bg-brand-red px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700">
              <Home size={17} /> Accueil
            </Link>
            <Link to="/rubriques" className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow">
              <Search size={17} /> Parcourir les rubriques
            </Link>
            <button type="button" onClick={() => window.history.back()} className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide text-gray-300 transition-colors hover:text-white">
              <ArrowLeft size={17} /> Page précédente
            </button>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

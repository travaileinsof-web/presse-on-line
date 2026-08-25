import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Radio } from "lucide-react";

// ---------------------------------------------------------------------------
// Contenu de démonstration — à remplacer par vos données réelles (useArticles)
// ---------------------------------------------------------------------------
const SLIDES = [
  {
    id: 1,
    category: "Politique",
    color: "red",
    title: "Le gouvernement annonce un plan d'investissement routier pour la Guinée forestière",
    excerpt:
      "Une enveloppe pluriannuelle doit financer la réhabilitation de plusieurs axes reliant Conakry aux préfectures de l'intérieur.",
    author: "Aïssatou Diallo",
    date: "25 août 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Société",
    color: "green",
    title: "À Forécariah, le marché hebdomadaire retrouve son affluence d'avant-saison",
    excerpt:
      "Commerçants et producteurs locaux témoignent d'une reprise progressive des échanges sur la place centrale.",
    author: "Mamadou Bah",
    date: "24 août 2026",
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Économie",
    color: "yellow",
    title: "Filière anacarde : les exportateurs guinéens misent sur la transformation locale",
    excerpt:
      "Plusieurs coopératives investissent dans de petites unités de décorticage pour capter davantage de valeur ajoutée.",
    author: "Fatoumata Camara",
    date: "23 août 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1595856619767-ab739fa8a1a5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Sport",
    color: "blue",
    title: "Le Syli national entame sa préparation en vue des prochaines éliminatoires",
    excerpt:
      "Le sélectionneur a convoqué un groupe élargi, avec plusieurs jeunes joueurs évoluant dans le championnat local.",
    author: "Ibrahima Sory Sylla",
    date: "22 août 2026",
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Culture",
    color: "red",
    title: "Samou Benty accueille un festival de musiques traditionnelles ce week-end",
    excerpt:
      "Griots et ensembles locaux se relaieront sur scène pour trois soirées consacrées au patrimoine musical de la région.",
    author: "Rédaction",
    date: "21 août 2026",
    readTime: "2 min",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop",
  },
];

const COLORS = {
  red: "#C81D25",
  green: "#0B7A44",
  yellow: "#E4A700",
  blue: "#1C4E80",
};

const SLIDE_DURATION = 6000; // ms

export default function HeroALaUne() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timeoutRef = useRef(null);

  const goTo = useCallback((i) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  const active = SLIDES[index];
  const activeColor = COLORS[active.color];

  return (
    <div
      className="w-full"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .headline-font { font-family: 'Fraunces', Georgia, serif; }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rise-in { animation: riseIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .rise-in-d1 { animation-delay: 0.06s; }
        .rise-in-d2 { animation-delay: 0.12s; }
        .rise-in-d3 { animation-delay: 0.18s; }

        .slide-track {
          display: flex;
          width: ${SLIDES.length * 100}%;
          transition: transform 0.85s cubic-bezier(0.65, 0, 0.15, 1);
        }
        .slide-pane {
          width: ${100 / SLIDES.length}%;
          flex-shrink: 0;
          position: relative;
        }
        .slide-pane img {
          transform: scale(1.06);
          transition: transform 7s ease-out;
        }
        .slide-pane.is-active img {
          transform: scale(1);
        }

        .cadence-fill {
          animation: fillbar ${SLIDE_DURATION}ms linear forwards;
        }
        @keyframes fillbar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .cadence-paused .cadence-fill { animation-play-state: paused; }

        .thumb-btn { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.35s; }
        .thumb-btn:hover { transform: translateY(-2px); }

        .nav-arrow { transition: background-color 0.25s, transform 0.25s; }
        .nav-arrow:hover { transform: scale(1.08); }
      `}</style>

      {/* Bandeau repère — heure, lieu, direct */}
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide mb-3 px-1" style={{ color: "#5b5b5b" }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> Conakry, Guinée
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {active.date}
          </span>
        </div>
        <span className="flex items-center gap-1.5" style={{ color: COLORS.red }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: COLORS.red }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: COLORS.red }} />
          </span>
          Édition du jour
        </span>
      </div>

      {/* Carrousel principal */}
      <div
        className="relative overflow-hidden rounded-none shadow-sm"
        style={{ height: "min(64vh, 560px)", backgroundColor: "#14181C" }}
      >
        <div
          className="slide-track h-full"
          style={{ transform: `translateX(-${index * (100 / SLIDES.length)}%)` }}
        >
          {SLIDES.map((s, i) => (
            <div key={s.id} className={`slide-pane h-full ${i === index ? "is-active" : ""}`}>
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(10,10,10,0.92) 100%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Contenu texte — se relance à chaque changement de slide */}
        <div key={index} className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-3xl">
          <span
            className="rise-in inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 mb-4 text-white"
            style={{ backgroundColor: activeColor }}
          >
            {active.category}
          </span>
          <h1 className="rise-in rise-in-d1 headline-font text-white text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold mb-3">
            {active.title}
          </h1>
          <p className="rise-in rise-in-d2 text-white/75 text-sm md:text-base leading-relaxed mb-4 max-w-xl hidden sm:block">
            {active.excerpt}
          </p>
          <div className="rise-in rise-in-d3 flex items-center gap-2 text-white/60 text-xs uppercase tracking-wide">
            <span className="text-white/90 font-semibold">{active.author}</span>
            <span>•</span>
            <span>{active.readTime} de lecture</span>
          </div>
        </div>

        {/* Flèches */}
        <button
          aria-label="Article précédent"
          onClick={prev}
          className="nav-arrow absolute top-1/2 -translate-y-1/2 left-3 md:left-5 w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: "rgba(20,24,28,0.45)", backdropFilter: "blur(2px)" }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Article suivant"
          onClick={next}
          className="nav-arrow absolute top-1/2 -translate-y-1/2 right-3 md:right-5 w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: "rgba(20,24,28,0.45)", backdropFilter: "blur(2px)" }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Rail de miniatures avec barre de cadence */}
      <div className="grid grid-cols-5 gap-3 mt-4">
        {SLIDES.map((s, i) => {
          const isActive = i === index;
          return (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="thumb-btn text-left group"
              style={{ opacity: isActive ? 1 : 0.55 }}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-2">
                <img src={s.image} alt="" className="w-full h-full object-cover group-hover:opacity-90" />
                <div
                  className="absolute top-0 left-0 h-[3px]"
                  style={{ backgroundColor: COLORS[s.color], width: isActive ? "100%" : "0%" }}
                />
              </div>
              <p
                className="text-[11px] md:text-xs font-semibold leading-snug line-clamp-2"
                style={{ color: "#14181C" }}
              >
                {s.title}
              </p>

              {/* barre de cadence — n'apparaît que sur la vignette active */}
              {isActive && (
                <div
                  key={progressKey}
                  className={`mt-2 h-[3px] w-full bg-black/10 overflow-hidden ${paused ? "cadence-paused" : ""}`}
                >
                  <div className="cadence-fill h-full" style={{ backgroundColor: activeColor }} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
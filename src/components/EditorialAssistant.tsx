import { FormEvent, useState } from 'react';
import { Newspaper, Send, X, ExternalLink, Stamp } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Source {
  id: string;
  title: string;
}

interface ChatResponse {
  answer: string;
  sources: Source[];
}

export function EditorialAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const askAssistant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || loading) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmedQuestion })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Le service est momentanément indisponible.');
      setAnswer(data);
      setQuestion('');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Le service est momentanément indisponible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .ea-headline { font-family: 'Fraunces', Georgia, serif; }
        .ea-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        @keyframes eaDot {
          0%, 80%, 100% { opacity: 0.25; }
          40% { opacity: 1; }
        }
        .ea-dot { animation: eaDot 1.1s ease-in-out infinite; }
        .ea-dot:nth-child(2) { animation-delay: 0.15s; }
        .ea-dot:nth-child(3) { animation-delay: 0.3s; }

        .ea-tab { writing-mode: vertical-rl; letter-spacing: 0.12em; }

        .ea-stamp {
          transform: rotate(-4deg);
          border: 1.5px dashed currentColor;
        }

        .ea-source:hover { transform: translateX(3px); }
        .ea-source { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1); }

        .ea-input { transition: border-color 0.2s; }
      `}</style>

      <AnimatePresence>
      {isOpen && (
        <motion.section
          aria-label="Assistant éditorial"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ borderTop: '3px solid #C81D25', transformOrigin: 'bottom right' }}
          className="fixed bottom-24 right-4 md:right-8 z-[90] w-[calc(100vw-32px)] max-w-md overflow-hidden bg-[#F7F4EE] shadow-2xl"
        >
          {/* En-tête façon fronton de rubrique */}
          <header className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-black/10">
            <div>
              <p className="ea-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brand-red mb-1">
                Service lecteurs
              </p>
              <p className="ea-headline text-lg font-semibold text-brand-dark leading-tight">
                Interroger la rédaction
              </p>
            </div>
            <button
              aria-label="Fermer l'assistant"
              onClick={() => setIsOpen(false)}
              className="mt-0.5 rounded-full p-1.5 text-brand-dark/50 hover:bg-black/5 hover:text-brand-dark transition-colors"
            >
              <X size={18} />
            </button>
          </header>

          <div className="max-h-[55vh] overflow-y-auto px-5 py-4">
            {!answer && !error && (
              <p className="text-sm leading-relaxed text-brand-dark/60 mb-1">
                Posez une question sur l'actualité publiée par notre rédaction. Chaque réponse s'appuie sur des
                articles vérifiés.
              </p>
            )}

            {loading && (
              <div role="status" className="flex items-center gap-2 py-6 text-brand-dark/50">
                <span className="ea-mono text-xs uppercase tracking-wide">Édition en cours</span>
                <span className="flex gap-1">
                  <span className="ea-dot w-1 h-1 rounded-full bg-brand-red" />
                  <span className="ea-dot w-1 h-1 rounded-full bg-brand-red" />
                  <span className="ea-dot w-1 h-1 rounded-full bg-brand-red" />
                </span>
              </div>
            )}

            {answer && !loading && (
              <div role="status" className="relative mb-4 bg-white p-4 pt-5">
                <span
                  className="ea-stamp ea-mono absolute -top-2 right-3 bg-[#F7F4EE] px-2 py-0.5 text-[9px] uppercase tracking-wider text-brand-red inline-flex items-center gap-1"
                >
                  <Stamp size={10} /> Réponse sourcée
                </span>
                <p className="text-sm leading-relaxed text-brand-dark whitespace-pre-wrap">{answer.answer}</p>
                {answer.sources.length > 0 && (
                  <div className="mt-4 border-t border-dashed border-black/15 pt-3">
                    <p className="ea-mono mb-2 text-[9px] font-medium uppercase tracking-[0.15em] text-brand-dark/40">
                      Articles consultés
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {answer.sources.map(source => (
                        <a
                          key={source.id}
                          href={`/article/${source.id}`}
                          className="ea-source flex items-center gap-2 border-l-2 border-brand-red bg-brand-red/5 px-2.5 py-1.5 text-xs font-semibold text-brand-dark hover:bg-brand-red/10"
                        >
                          <ExternalLink size={12} className="shrink-0 text-brand-red" />
                          <span className="line-clamp-1">{source.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <p role="alert" className="mb-4 border-l-2 border-brand-red bg-brand-red/5 px-3 py-2.5 text-xs text-brand-red">
                {error}
              </p>
            )}

            <form onSubmit={askAssistant} className="mt-2">
              <label htmlFor="assistant-question" className="ea-mono block text-[9px] font-medium uppercase tracking-[0.15em] text-brand-dark/40 mb-1.5">
                Votre question
              </label>
              <div className="flex items-end gap-2">
                <input
                  id="assistant-question"
                  value={question}
                  onChange={event => setQuestion(event.target.value)}
                  maxLength={500}
                  placeholder="Quels sujets concernent Conakry ?"
                  className="ea-input ea-mono min-w-0 flex-1 border-b-2 border-brand-dark/15 bg-transparent px-0.5 py-1.5 text-[13px] text-brand-dark outline-none focus:border-brand-red placeholder:text-brand-dark/30"
                />
                <button
                  aria-label="Envoyer la question"
                  disabled={loading || !question.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-red text-white transition-opacity disabled:opacity-30"
                >
                  <Send size={15} />
                </button>
              </div>
            </form>
            <p className="mt-3 text-[10px] leading-relaxed text-brand-dark/35">
              Réponses générées à partir des articles disponibles. Vérifiez toujours la source citée.
            </p>
          </div>
        </motion.section>
      )}
      </AnimatePresence>

      {/* Onglet déclencheur — dépasse du bord comme un onglet d'index */}
      <motion.button
        aria-label={isOpen ? "Fermer l'assistant éditorial" : "Ouvrir l'assistant éditorial"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(value => !value)}
        whileHover={prefersReducedMotion ? undefined : { x: -4 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="fixed bottom-16 right-0 z-[90] flex flex-col items-center gap-2 bg-brand-dark px-2.5 py-4 text-white shadow-xl"
        style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}
      >
        {isOpen ? (
          <X size={18} />
        ) : (
          <>
            <Newspaper size={18} className="text-brand-red" />
            <span className="ea-tab ea-mono hidden sm:inline text-[10px] uppercase tracking-[0.15em]">
              Rédaction
            </span>
          </>
        )}
      </motion.button>
    </>
  );
}
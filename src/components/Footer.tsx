import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, MapPin, Mail, Phone, Newspaper } from 'lucide-react';
import { useCategories, useConfig } from '../lib/hooks';

export default function Footer() {
  const { categories } = useCategories();
  const { config } = useConfig();
  const activeCategories = categories.filter(c => c.isActive);

  // Split categories into two arrays for 2-column layout in the footer
  const half = Math.ceil(activeCategories.length / 2);
  const leftColCategories = activeCategories.slice(0, half);
  const rightColCategories = activeCategories.slice(half);

  return (
    <footer className="bg-brand-dark text-white pt-16 relative" style={{ borderTop: '3px solid #C81D25' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .ft-headline { font-family: 'Fraunces', Georgia, serif; }
        .ft-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .ft-link { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s; display: inline-block; }
        .ft-link:hover { transform: translateX(4px); }
        .ft-social { transition: background-color 0.2s, border-color 0.2s, color 0.2s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:divide-x lg:divide-white/10 mb-12">
        {/* Brand & About */}
        <div className="lg:col-span-4 lg:pr-8 pb-10 lg:pb-0">
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo.jpg" alt="Einsof-media" className="w-11 h-11 object-contain" />
            <div className="ft-headline text-2xl font-semibold tracking-tight leading-none text-white">
              Einsof-Media
            </div>
          </div>
          <p className="text-white/55 text-sm mb-6 leading-relaxed max-w-xs">
            {config?.slogan || 'Le média guinéen qui relie l\u2019information de proximité aux grandes histoires du pays.'}
          </p>
          <div className="flex gap-2">
            <a href={config?.socials?.facebook} aria-label="Facebook" className="ft-social w-9 h-9 border border-white/15 text-white/60 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white">
              <Facebook size={15} />
            </a>
            <a href={config?.socials?.twitter} aria-label="X" className="ft-social w-9 h-9 border border-white/15 text-white/60 flex items-center justify-center hover:bg-white hover:border-white hover:text-brand-dark">
              <Twitter size={15} />
            </a>
            <a href={config?.socials?.youtube} aria-label="YouTube" className="ft-social w-9 h-9 border border-white/15 text-white/60 flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white">
              <Youtube size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 lg:px-8 py-8 lg:py-0">
          <h3 className="ft-mono text-[10px] font-medium mb-5 text-brand-red uppercase tracking-[0.15em]">
            — Liens rapides
          </h3>
          <ul className="space-y-3 text-sm text-white/60 font-medium">
            <li><Link to="/about" className="ft-link hover:text-white">À propos</Link></li>
            <li><Link to="/equipe" className="ft-link hover:text-white">Notre équipe</Link></li>
            <li><Link to="/partenaires" className="ft-link hover:text-white">Partenaires</Link></li>
            <li><Link to="/mentions-legales" className="ft-link hover:text-white">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="ft-link hover:text-white">Confidentialité</Link></li>
            <li><Link to="/contact" className="ft-link hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Rubriques */}
        <div className="lg:col-span-3 lg:px-8 py-8 lg:py-0">
          <h3 className="ft-mono text-[10px] font-medium mb-5 text-brand-red uppercase tracking-[0.15em]">
            — Rubriques
          </h3>
          <div className="flex gap-8">
            <ul className="space-y-3 text-sm text-white/60 font-medium flex-1">
              {leftColCategories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/rubriques/${cat.id}`} className="ft-link hover:text-white">{cat.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 text-sm text-white/60 font-medium flex-1">
              {rightColCategories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/rubriques/${cat.id}`} className="ft-link hover:text-white">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3 lg:pl-8 py-8 lg:py-0">
          <h3 className="ft-mono text-[10px] font-medium mb-5 text-brand-red uppercase tracking-[0.15em]">
            — Contact
          </h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
              <span className="font-medium text-white/80">{config?.phone || '+224 625 80 87 66'}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
              <div className="flex flex-col font-medium text-white/80">
                {config?.emails ? config.emails.map((email: string, idx: number) => <span key={idx}>{email}</span>) : (
                  <>
                    <span>contact@einsof-media.gn</span>
                    <span>Mohamedfof66@gmail.com</span>
                  </>
                )}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
              <span className="font-medium text-white/80 leading-relaxed">{config?.address || 'Bonfi Niger, Matam, Conakry'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Colophon */}
      <div className="border-t border-dashed border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="ft-mono text-[10px] text-white/35 uppercase tracking-wide">
            © {new Date().getFullYear()} Einsof-Media — Tous droits réservés
          </p>
          <p className="ft-mono text-[10px] text-white/35 uppercase tracking-wide flex items-center gap-1.5">
            <Newspaper size={11} className="text-brand-red" />
            Édition numérique · Conakry, Guinée
          </p>
        </div>
      </div>
    </footer>
  );
}
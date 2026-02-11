import Link from "next/link";
import Image from "next/image";

const productLinks = [
  { label: "Comment ça marche", href: "/how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Tarifs", href: "/pricing" },
];

const companyLinks = [
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Conditions générales", href: "/legal/cgu" },
  { label: "Politique de confidentialité", href: "/legal/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-vp-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="VoxPop"
                width={36}
                height={36}
              />
              <span className="text-lg font-bold text-white">
                Vox<span className="gradient-text">Pop</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              La seule plateforme où votre opinion compte vraiment.
              Vote anonyme, vérifiable, impossible à censurer.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Produit
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-vp-teal transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Entreprise
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-vp-teal transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Légal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-vp-teal transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} VoxPop. Tous droits réservés.
          </p>
          <p className="text-slate-600 text-xs">
            Punch Ventures LLC — Wyoming, USA
          </p>
        </div>
      </div>
    </footer>
  );
}

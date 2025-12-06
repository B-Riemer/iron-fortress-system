import Link from "next/link";
import { Container } from "@/components/ui/layout/container";
import { Instagram, Twitter, Youtube, Shield, Activity, Globe, Cpu, Server } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-zinc-950 pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Col 1: Mission */}
          <div className="space-y-3">
            <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
              IRON FORTRESS
            </h3>
            <p className="font-sans text-sm text-zinc-500">Forging Elite Humans.</p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
              NAVIGATION
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="#methodology"
                className="font-sans text-sm text-zinc-400 transition-colors hover:text-emerald-500"
              >
                The Protocol
              </Link>
              <Link
                href="#about"
                className="font-sans text-sm text-zinc-400 transition-colors hover:text-emerald-500"
              >
                The Architect
              </Link>
              <Link
                href="/login"
                className="font-sans text-sm text-zinc-400 transition-colors hover:text-emerald-500"
              >
                Login
              </Link>
            </nav>
          </div>

          {/* Col 3: Secure Comms */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600">
              TRANSMISSION CHANNELS
            </h4>
            <div className="flex flex-col gap-3">
              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-emerald-500"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-emerald-500"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-emerald-500"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>

              {/* Contact */}
              <a
                href="mailto:comms@ironfortress.com"
                className="font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-500"
              >
                comms@ironfortress.com
              </a>
            </div>
          </div>

          {/* Col 4: Strategic Alliances */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600">
              STRATEGIC ALLIANCES
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                href="mailto:alliances@ironfortress.com?subject=Unit%20Integration"
                className="font-sans text-sm text-zinc-500 transition-colors hover:text-emerald-500"
              >
                Unit Integration
              </a>
              <a
                href="mailto:alliances@ironfortress.com?subject=Corporate"
                className="font-sans text-sm text-zinc-500 transition-colors hover:text-emerald-500"
              >
                Corporate Protocols
              </a>
              <a
                href="mailto:alliances@ironfortress.com?subject=Partnership"
                className="font-sans text-sm text-zinc-500 transition-colors hover:text-emerald-500"
              >
                Equipment Partners
              </a>
            </nav>
          </div>
        </div>

        {/* Operational Partners Row */}
        <div className="w-full border-t border-white/5 py-8 mt-12 flex flex-col items-center gap-4">
          <h4 className="text-[10px] font-mono tracking-[0.2em] text-zinc-700 uppercase">
            OPERATIONAL PARTNERS
          </h4>
          <div className="flex items-center gap-8">
            <Shield className="w-6 h-6 text-zinc-800 hover:text-zinc-600 transition-colors" />
            <Activity className="w-6 h-6 text-zinc-800 hover:text-zinc-600 transition-colors" />
            <Globe className="w-6 h-6 text-zinc-800 hover:text-zinc-600 transition-colors" />
            <Cpu className="w-6 h-6 text-zinc-800 hover:text-zinc-600 transition-colors" />
            <Server className="w-6 h-6 text-zinc-800 hover:text-zinc-600 transition-colors" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p className="font-sans text-xs text-zinc-500">© 2025</p>
            <div className="flex gap-4">
              <Link
                href="/legal/imprint"
                className="font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-500"
              >
                IMPRINT
              </Link>
              <Link
                href="/legal/privacy"
                className="font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-500"
              >
                PRIVACY
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              SYSTEM STATUS:
            </span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-500">
                OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}


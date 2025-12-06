import { Container } from "@/components/ui/layout/container";

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-zinc-950 bg-noise py-20">
      <Container>
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mb-8 font-mono text-3xl font-bold uppercase tracking-tighter text-zinc-100">
            IMPRINT
          </h1>

          <div className="space-y-6 font-sans text-zinc-400">
            <section>
              <h2 className="mb-3 font-mono text-lg font-semibold uppercase tracking-wider text-zinc-100">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="mb-2">Iron Fortress Inc.</p>
              <p className="mb-2">Musterstraße 1</p>
              <p>12345 Berlin</p>
            </section>

            <section>
              <h2 className="mb-3 font-mono text-lg font-semibold uppercase tracking-wider text-zinc-100">
                Kontakt
              </h2>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:comms@ironfortress.com"
                  className="text-emerald-500 transition-colors hover:text-emerald-400"
                >
                  comms@ironfortress.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-mono text-lg font-semibold uppercase tracking-wider text-zinc-100">
                Verantwortlich für den Inhalt
              </h2>
              <p>
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Iron Fortress Inc.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}


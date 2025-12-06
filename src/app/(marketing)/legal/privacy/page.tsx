import { Container } from "@/components/ui/layout/container";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 bg-noise py-20">
      <Container>
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mb-8 font-mono text-3xl font-bold uppercase tracking-tighter text-zinc-100">
            PRIVACY POLICY
          </h1>

          <div className="space-y-8 font-sans text-zinc-400">
            <section>
              <h2 className="mb-4 font-mono text-lg font-semibold uppercase tracking-wider text-zinc-100">
                Datenschutz auf einen Blick
              </h2>
              <p className="mb-4">
                Diese Datenschutzerklärung gibt Ihnen einen Überblick darüber, wie wir Ihre
                personenbezogenen Daten verarbeiten, wenn Sie diese Website nutzen.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-lg font-semibold uppercase tracking-wider text-zinc-100">
                Hosting (Supabase)
              </h2>
              <p className="mb-4">
                Diese Website nutzt Supabase für die Authentifizierung und Datenbank-Speicherung.
                Supabase ist ein Backend-as-a-Service-Anbieter, der die folgenden Dienste bereitstellt:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Benutzerauthentifizierung und -verwaltung</li>
                <li>Datenbank-Speicherung für Trainingsdaten und Benutzerprofile</li>
                <li>Session-Management</li>
              </ul>
              <p className="mt-4">
                <strong className="text-zinc-200">
                  This system uses Supabase for authentication and database storage.
                </strong>
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-lg font-semibold uppercase tracking-wider text-zinc-100">
                Cookies
              </h2>
              <p className="mb-4">
                Diese Website verwendet Cookies, die für die Funktionalität der Authentifizierung
                erforderlich sind. Diese Cookies werden verwendet, um Ihre Sitzung zu verwalten und
                Sie bei wiederholten Besuchen einzuloggen.
              </p>
              <p>
                Sie können Cookies in Ihren Browser-Einstellungen deaktivieren, dies kann jedoch die
                Funktionalität der Website beeinträchtigen.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-lg font-semibold uppercase tracking-wider text-zinc-100">
                Ihre Rechte
              </h2>
              <p className="mb-2">
                Sie haben das Recht, Auskunft über Ihre gespeicherten personenbezogenen Daten zu
                erhalten sowie das Recht auf Berichtigung, Löschung oder Einschränkung der
                Verarbeitung.
              </p>
              <p>
                Bei Fragen wenden Sie sich bitte an:{" "}
                <a
                  href="mailto:comms@ironfortress.com"
                  className="text-emerald-500 transition-colors hover:text-emerald-400"
                >
                  comms@ironfortress.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}


# 🌿 Git Branches Übersicht

## Aktuelle Branches

### 1. `main` - Hauptbranch (Production-Ready)

**Zweck:** Hauptentwicklungsbranch mit der stabilen, produktionsreifen Version

**Aufruf:**

```bash
# Branch wechseln
git checkout main

# Aktuellen Stand anzeigen
git log --oneline -5
```

**Hinweis:** Dieser Branch enthält die stabile Hauptversion von IRON_FORTRESS. Alle Features sind getestet und produktionsreif.

---

### 2. `portfolio-demo` - Demo/Portfolio Version

**Zweck:** Demo-Version für Portfolio-Präsentation mit speziellen Anpassungen

**Aufruf:**

```bash
# Branch wechseln
git checkout portfolio-demo

# Aktuellen Stand anzeigen
git log --oneline -5
```

**Hinweis:** Dieser Branch enthält eine speziell für Portfolio/Demo-Zwecke angepasste Version. Möglicherweise mit reduzierten Features oder speziellen Demo-Inhalten.

**Aktueller Status:** ✅ Aktiver Branch (Stand: 2025)

---

## Wichtige Commands

### Branch wechseln

```bash
git checkout <branch-name>
```

### Alle Branches anzeigen

```bash
git branch -a
```

### Aktuellen Branch anzeigen

```bash
git branch
# Der Branch mit * ist der aktive Branch
```

### Branch-Status anzeigen

```bash
git status
```

### Remote-Branch (GitHub) anzeigen

```bash
git branch -r
```

### Branch-Informationen vergleichen

```bash
# Unterschiede zwischen Branches anzeigen
git diff main..portfolio-demo

# Commits anzeigen, die nur in portfolio-demo sind
git log main..portfolio-demo
```

---

## Projekt-Übersicht: IRON_FORTRESS

### Hauptfunktionen

- **Marketing Landing Page** - Hero Section, Pricing, Features
- **Dashboard** - User Dashboard mit Training, Intel, Settings
- **Admin Panel** - User Management, Workout Management, Intel Publishing
- **Stripe Integration** - Checkout & Webhook für Subscriptions
- **Supabase Auth** - User Authentication & Profile Management
- **Tier System** - RECRUIT, OPERATOR, SHADOW Clearance Levels

### Technologie-Stack

- **Framework:** Next.js 16.0.7
- **Database:** Supabase (PostgreSQL)
- **Payment:** Stripe
- **Styling:** Tailwind CSS
- **UI Components:** Custom Components + Lucide Icons
- **Animations:** Framer Motion

---

## Hinweise

- **`main`** = Stabile Production-Version (für Deployment)
- **`portfolio-demo`** = Demo/Portfolio-Version (für Präsentationen)
- **`origin/main`** = Der Remote-Branch auf GitHub
- **`origin/portfolio-demo`** = Der Remote-Branch für Demo-Version auf GitHub

### Workflow-Tipp

1. **Feature-Entwicklung:** Neue Features auf `main` entwickeln und testen
2. **Portfolio-Präsentation:** Für Demo-Zwecke auf `portfolio-demo` wechseln
3. **Deployment:** `main` Branch für Production-Deployment verwenden

### Environment Variables

Beide Branches benötigen dieselben Environment-Variablen:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_ID_OPERATOR`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_ADMIN_EMAIL`

**Wichtig:** Environment-Variablen werden NICHT in Git committed (siehe `.gitignore`)

---

*Letzte Aktualisierung: Januar 2025*


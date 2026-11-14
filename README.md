# Mi ci metto — Repository di Progetto

> **Sito live:** [https://micimetto.acasolino.com](https://micimetto.acasolino.com)  
> **Autore:** Antonio Casolino  
> **Stack vigente:** Payload 3 + Next.js su Node, stesso server **xCloud** ([ADR-002](./docs/adr/002-payload-next-xcloud.md))  
> **Stack live oggi:** WordPress + Bricks, finché il dominio non viene spostato

---

## Obiettivo del Progetto

**Mi ci metto** è una web app / ricettario personale e familiare nato con una filosofia precisa: offrire un'esperienza in cucina **pulita, priva di banner pubblicitari invasivi e testo inutile**, con strumenti realmente utili mentre si cucina con lo smartphone o il tablet sul piano di lavoro.

Questo repository contiene sia il **codice sorgente** del progetto (tema child, script interattivi, stili, dati strutturati SEO, export di template e custom fields) sia la **documentazione tecnica e di prodotto** (audit, architettura, Design System, specifiche funzionali e Architecture Decision Records).

---

## Struttura del Repository

```text
micimetto/
├── README.md                              # Panoramica del progetto
├── docs/                                  # Documentazione di progetto e architettura
│   ├── 01-audit-stato-attuale.md          # Analisi completa del sito live pre-refactoring
│   ├── 02-architettura-e-stack.md         # Architettura WordPress/Bricks, CPT, tassonomie e deploy
│   ├── 03-design-system.md                # Palette, tipografia, componenti UI ed evoluzione visiva
│   ├── 04-specifiche-funzionali.md        # Specifiche dei 4 moduli interattivi + SEO JSON-LD
│   ├── roadmap.md                         # Piano di lavoro diviso per fasi
│   └── adr/                               # Architecture Decision Records (decisioni storiche)
│       ├── 001-strategia-refactoring-wp.md
│       └── 002-payload-next-xcloud.md
├── exports/                               # Export versionati di Bricks Templates e Custom Fields (ACF/MetaBox)
│   ├── bricks-templates/
│   └── custom-fields/
└── wp-content/
    ├── themes/
    │   └── bricks-child/                  # Tema child WordPress con CSS, JS e PHP custom
    └── mu-plugins/                        # (Opzionale) Logica applicativa indipendente dal tema (SEO, API, CPT)
```

---

## Indice della Documentazione

1. [Audit dello Stato Attuale](./docs/01-audit-stato-attuale.md) — Bug rilevati, limiti UX/UI e lacune SEO.
2. [Architettura e Stack](./docs/02-architettura-e-stack.md) — Modello dati WordPress, CPT `ricetta`, tassonomie e struttura del codice.
3. [Design System](./docs/03-design-system.md) — Identità visiva (Bordeaux `#77002e` + Rosa caldo, `Sora` & `Noto Sans`) ed evoluzione editoriale.
4. [Specifiche Funzionali](./docs/04-specifiche-funzionali.md) — Dettaglio tecnico di:
   - Ricalcolo dinamico porzioni (lista + step)
   - Ricerca istantanea e filtro "Svuotafrigo"
   - Timer cliccabili negli step + Screen Wake Lock API
   - Modalità "Cooking Mode" full-screen
   - Generazione automatica `Schema.org/Recipe` (JSON-LD)
5. [Roadmap di Refactoring](./docs/roadmap.md) — Stato di avanzamento dei lavori.
6. [ADR-001: Strategia WordPress + Bricks](./docs/adr/001-strategia-refactoring-wp.md) — Decisione superata, tenuta come storico.
7. [ADR-002: Payload e Next.js su xCloud](./docs/adr/002-payload-next-xcloud.md) — Decisione vigente.

# Roadmap di Refactoring — Mi ci metto

## Fase 1 — Repository, Audit e Documentazione ✅
- [x] Audit completo del sito live (`https://micimetto.acasolino.com`)
- [x] Inizializzazione repository Git (`main`)
- [x] Documentazione stato attuale (`docs/01-audit-stato-attuale.md`)
- [x] Definizione architettura e modello dati (`docs/02-architettura-e-stack.md`)
- [x] Definizione Design System (`docs/03-design-system.md`)
- [x] Specifiche funzionali dei nuovi moduli (`docs/04-specifiche-funzionali.md`)
- [x] Registrazione ADR-001 (`docs/adr/001-strategia-refactoring-wp.md`)

## Fase 2 — Allineamento Codebase con xCloud (MCP + SSH) ✅
- [x] Configurazione e autenticazione server MCP di xCloud (`xcloud-host`)
- [x] Connessione SSH + WP-CLI verificata (`micimetto@188.245.124.117`)
- [x] Importazione dei file attuali di `wp-content/themes/bricks-child` dal server xCloud
- [x] Esportazione completa dello schema ACF PRO (CPT `ricetta`, 4 tassonomie, 3 field groups) in `exports/custom-fields/acf-schema-export.json`
- [x] Esportazione di tutti i template Bricks (`Header`, `Footer`, `Singola ricetta`, `Archivi`, `Pagina` + pagine principali) in `exports/bricks-templates/bricks-templates-export.json`
- [x] Commit dello stato "baseline" pre-refactoring nel repository Git

## Fase 3 — Refactoring Core, Fix Bug & SEO 🛠️
- [ ] Riscrivere `custom.js` eliminando gli errori `null` su pagine non-ricetta
- [ ] Ripristinare e rendere resiliente lo **Screen Wake Lock** (`visibilitychange` + allineamento selettori Bricks)
- [ ] Implementare il generatore automatico **JSON-LD `Schema.org/Recipe`** (leggendo i campi ACF `tempo`, `cottura`, `dosi_per`, `ingredienti_main`, `step`) e meta tag **Open Graph** in PHP
- [ ] Risolvere il 404 sulla rotta `/ricette/` (condizioni template Bricks `Archivi` + flush rewrite rules)
- [ ] Correggere i refusi nei testi (Home, About) e il blocco vuoto nella pagina Contatti
- [ ] Adeguare il Footer e i form con Privacy/GDPR

## Fase 4 — Nuove Funzionalità "Smart Kitchen" 🍳
- [ ] **Modulo 1 — Portion Scaler:** selettore `+` / `-` porzioni basato su `dosi_per` con ricalcolo automatico su `dose_ingrediente_sub` (lista e drawer) e `quantita-ingrediente-step` (singoli step)
- [ ] **Modulo 2 — Ricerca Live & Svuotafrigo:** endpoint REST custom + interfaccia per filtrare ricette combinando più termini `ingrediente`, `categoria-ricetta` e `indice-fit`
- [ ] **Modulo 3 — Step Timers:** badge timer cliccabili direttamente nel testo `procedimento` degli step con countdown multiplo e avviso sonoro Web Audio API
- [ ] **Modulo 4 — Cooking Mode:** vista full-screen step-by-step con font grandi, controlli touch maggiorati, `ingredienti-step` e `tip` contestuali

## Fase 5 — Evoluzione UI/Design System & Deploy 🚀
- [ ] Applicare il nuovo foglio di stile editoriale (`style.css` / `assets/css/main.css`) mantenendo palette Bordeaux/Rosa e font `Sora`/`Noto Sans`
- [ ] Introdurre la navigazione desktop orizzontale + barra di ricerca nell'header
- [ ] Test su Desktop e Mobile (390×844 e tablet)
- [ ] Deploy su xCloud e purge cache LiteSpeed

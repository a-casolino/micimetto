# Roadmap di Refactoring — Mi ci metto

## Fase 1 — Repository, Audit e Documentazione ✅
- [x] Audit completo del sito live (`https://micimetto.acasolino.com`)
- [x] Inizializzazione repository Git (`main`)
- [x] Documentazione stato attuale (`docs/01-audit-stato-attuale.md`)
- [x] Definizione architettura e modello dati (`docs/02-architettura-e-stack.md`)
- [x] Definizione Design System (`docs/03-design-system.md`)
- [x] Specifiche funzionali dei nuovi moduli (`docs/04-specifiche-funzionali.md`)
- [x] Registrazione ADR-001 (`docs/adr/001-strategia-refactoring-wp.md`)

## Fase 2 — Allineamento Codebase con xCloud 🔄
- [ ] Scaricare/importare i file attuali di `wp-content/themes/bricks-child` dal server xCloud
- [ ] Esportare la configurazione attuale dei Custom Fields (CPT `ricetta`, repeater ingredienti e step) in `exports/custom-fields/`
- [ ] Esportare i template attuali di Bricks in `exports/bricks-templates/`
- [ ] Fare commit dello stato "baseline" pre-refactoring per avere uno storico Git pulito

## Fase 3 — Refactoring Core, Fix Bug & SEO 🛠️
- [ ] Riscrivere `custom.js` eliminando gli errori `null` su pagine non-ricetta
- [ ] Ripristinare e rendere resiliente lo **Screen Wake Lock** (`visibilitychange` + stato UI reale)
- [ ] Implementare il generatore automatico **JSON-LD `Schema.org/Recipe`** e meta tag **Open Graph** in PHP
- [ ] Risolvere il 404 sulla rotta `/ricette/` e correggere i breadcrumb
- [ ] Correggere i refusi nei testi (Home, About) e il blocco vuoto nella pagina Contatti
- [ ] Adeguare il Footer e i form con Privacy/GDPR

## Fase 4 — Nuove Funzionalità "Smart Kitchen" 🍳
- [ ] **Modulo 1 — Portion Scaler:** selettore `+` / `-` porzioni con ricalcolo automatico nella lista ingredienti, nel drawer e nei singoli step
- [ ] **Modulo 2 — Ricerca Live & Svuotafrigo:** endpoint REST custom + interfaccia per filtrare ricette combinando più ingredienti, categoria e Indice Fit
- [ ] **Modulo 3 — Step Timers:** badge timer cliccabili direttamente nei passaggi di cottura con countdown multiplo e avviso sonoro Web Audio API
- [ ] **Modulo 4 — Cooking Mode:** vista full-screen step-by-step con font grandi, controlli touch maggiorati e ingredienti contestuali

## Fase 5 — Evoluzione UI/Design System & Deploy 🚀
- [ ] Applicare il nuovo foglio di stile editoriale (`assets/css/main.css`) mantenendo palette Bordeaux/Rosa e font `Sora`/`Noto Sans`
- [ ] Introdurre la navigazione desktop orizzontale + barra di ricerca nell'header
- [ ] Test su Desktop e Mobile (390×844 e tablet)
- [ ] Deploy su xCloud e verifica post-rilascio

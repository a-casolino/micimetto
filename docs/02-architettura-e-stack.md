# 02 — Architettura e Stack Tecnologico

## 1. Panoramica dell'Infrastruttura
- **Hosting:** xCloud (ambiente server gestito per WordPress)
- **CMS:** WordPress
- **Visual Builder & Theme Engine:** Bricks Builder (`bricks` parent theme) + `bricks-child`
- **Gestione Contenuti:** Bacheca WordPress classica tramite Custom Post Type e Custom Fields.

---

## 2. Modello Dati WordPress (CPT & Tassonomie)

### 2.1 Custom Post Type: `ricetta`
- **Slug URL singolo:** `/ricetta/[post-name]/`
- **Slug Archivio:** `/ricette/` *(da abilitare/mappare correttamente con `has_archive => 'ricette'` o pagina archivio dedicata per risolvere il 404 nei breadcrumb)*

#### Metadati Principali della Ricetta
| Campo | Tipo | Esempio | Utilizzo nel Refactoring |
| :--- | :--- | :--- | :--- |
| Tempo preparazione | Numero (minuti) | `90` | UI scheda + JSON-LD `prepTime` (`PT90M`) |
| Tempo cottura | Numero (minuti) | `30` | UI scheda + JSON-LD `cookTime` (`PT30M`) |
| Porzioni base | Numero intero | `4` | Base di calcolo per il moltiplicatore dinamico dosi |
| Unità porzioni (opz.) | Testo | `persone` / `pezzi` | Etichetta chiara accanto al selettore `+` / `-` |
| Difficoltà | Numero (`0-100`) | `80` | Indicatore visivo + badge |
| Indice Golosità | Numero (`0-100`) | `90` | Indicatore visivo |
| Lista Ingredienti | Repeater | `[{nome, quantita, unita, nota}]` | Lista principale + drawer mobile + JSON-LD `recipeIngredient` |
| Passaggi (Step) | Repeater | `[{titolo, testo, media, ingredienti_step}]` | Step-by-step + Cooking Mode + Timer + JSON-LD `recipeInstructions` |

### 2.2 Tassonomie Associate a `ricetta`
1. **Categoria Ricetta (`categoria-ricetta`):** es. *Primi*, *Secondi*, *Dessert / Dolci*.
2. **Ingrediente (`ingrediente`):** es. *tonno*, *farina*, *uova*, *lievito di birra*, *vino bianco*.
3. **Indice Fit (`indice-fit`):** es. *Leggero*, *Equilibrato*, *Sostanzioso*.

---

## 3. Architettura del Codice nel Repository

Per evitare codice sparso dentro i singoli elementi di Bricks difficili da manutenere e debuggare, adottiamo una separazione netta:

1. **Bricks Builder** si occupa esclusivamente di:
   - Struttura del layout (Header, Footer, Griglie, Single Recipe layout)
   - Query Loop base e binding dei campi dinamici
2. **Tema Child (`wp-content/themes/bricks-child/`)** contiene tutto il codice versionato in Git:
   - `functions.php`: bootstrap e inclusione modulare dei file in `inc/`
   - `inc/seo-schema.php`: generazione automatica del JSON-LD `Schema.org/Recipe` e meta tag Open Graph nel `<head>`
   - `inc/ajax-search-filter.php`: endpoint REST API custom (`/wp-json/micimetto/v1/recipes`) per ricerca istantanea e filtro multi-ingrediente ("Svuotafrigo")
   - `inc/shortcodes-helpers.php`: helper PHP per formattare quantità scalabili (`data-base-qty`, `data-base-servings`) e rilevare i tempi di cottura negli step
   - `assets/css/main.css`: variabili CSS del Design System, stili raffinati per card, pillole, drawer ingredienti e Cooking Mode full-screen
   - `assets/js/recipe-app.js`: modulo JavaScript vanilla (ES6+, zero dipendenze pesanti, con guard clause sicure) che gestisce:
     - **WakeLockManager**: gestione robusta della Screen Wake Lock API con ri-acquisizione su `visibilitychange`
     - **PortionScaler**: ricalcolo in tempo reale delle quantità nella lista ingredienti, nel drawer laterale e negli ingredienti dei singoli step
     - **StepTimers**: trasformazione automatica (o tramite attributo) dei tempi nei passaggi (es. *"cuocere per 12 minuti"*) in badge timer cliccabili con conto alla rovescia e avviso sonoro Web Audio API
     - **CookingMode**: interfaccia a tutto schermo step-by-step con font maggiorati, controlli touch grandi e Wake Lock attivo di default
   - `assets/js/search-filter.js`: logica della barra di ricerca live e del filtro combinato "Svuotafrigo"
3. **Cartella `exports/`**:
   - Ogni modifica strutturale ai template Bricks o ai gruppi di campi custom viene esportata in JSON dentro `exports/` così che l'intero progetto sia ricostruibile e tracciato in Git.

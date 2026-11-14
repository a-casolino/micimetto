# ADR 002 — Payload e Next.js sullo stesso server xCloud

- **Stato:** Approvato
- **Data:** 14 Novembre 2026
- **Decisori:** Antonio Casolino
- **Sostituisce:** [ADR-001](./001-strategia-refactoring-wp.md)

---

## Contesto e Problema

[ADR-001](./001-strategia-refactoring-wp.md) teneva **Mi ci metto** su WordPress + Bricks, con la bacheca WordPress come unico posto dove scrivere le ricette. Rimettendo in discussione la tecnologia sono emersi tre vincoli nuovi:

1. I contenuti **escono da WordPress**. Ricette, ingredienti, categorie e media vanno migrati.
2. Le ricette si modificano da un **pannello web**, anche da altre persone, non da file nel repository.
3. L’app resta sull’**server xCloud già in uso** (Hetzner `188.245.124.117`, sito attuale `https://micimetto.acasolino.com`). Node è accettato.

Il sito live resta la sorgente dei contenuti finché il nuovo pannello non ne mostra uno vero. L’API pubblica, al 14 novembre 2026, elenca 2 ricette pubblicate, 24 ingredienti, 4 categorie e 54 media. Le bozze non sono in quell’elenco.

I quattro moduli di cucina descritti in `docs/04-specifiche-funzionali.md` restano il prodotto: porzioni, Svuotafrigo, timer con Wake Lock, Modalità Cucina, più `Schema.org/Recipe`.

## Decisione

Il sito nuovo è **un’unica app Payload 3 dentro Next.js**, pubblicata come **secondo sito Node sullo stesso server xCloud**, accanto al WordPress attuale.

- **Payload 3** è il pannello (`/admin`), i ruoli e il modello dati.
- **Next.js** è il sito pubblico. Le pagine ricetta sono server-rendered; porzioni, timer, Wake Lock e Modalità Cucina sono componenti client.
- **Postgres** (`@payloadcms/db-postgres`) è il database, sullo stesso VPS. La connection string sta in `DATABASE_URL`, nelle variabili d’ambiente di xCloud, mai nel git.
- **Upload** su disco del VPS, in una directory **fuori dalla cartella di release** del deploy Git, agganciata all’app. Un deploy non deve cancellare le foto.
- **Deploy:** da Git, modalità xCloud **SSR (processo Node)**. Il processo ascolta `PORT` su `127.0.0.1`. Comando di avvio `next start` (o l’equivalente pnpm che il pannello rileva).
- **Runtime:** Node `^22.23.4` oppure `>=24.22.1`, e una Next.js tra quelle compatibili con Payload 3 (`15.2.9+` sulla 15.2, `15.3.9+` sulla 15.3, `15.4.11+` sulla 15.4, oppure `16.2.6+`).
- **Package manager:** pnpm.
- **Segreto:** `PAYLOAD_SECRET` solo nelle env di xCloud.
- **Email:** lo stesso server SMTP già usato per la posta del sito, per il reset password del pannello e per il modulo «Invia la tua ricetta».

WordPress e Bricks **restano online** fino a un taglio esplicito del dominio. Il branch `feat/refactoring-v2` non si deploya: è agganciato agli ID degli elementi Bricks.

xCloud 3 esegue WordPress e un’app Node sullo stesso server (deploy Git, processo tenuto su da PM2, SSL). Il sito Node è un sito nuovo nel pannello, non un processo dentro il virtual host OpenLiteSpeed di WordPress.

## Modello dati

Le collection sostituiscono il CPT `ricetta` e le tassonomie ACF. Le dosi nascono già come numero + unità. Il testo libero (`"500 g"`, `"q.b."`) esiste solo nell’export WordPress e si interpreta una volta, in migrazione.

| Collection | Ruolo | Note rispetto ad ACF |
|---|---|---|
| `users` | Accesso al pannello | Almeno Admin e Editor |
| `media` | Foto di copertina, step e gallerie | I 54 media attuali si importano qui |
| `ingredienti` | Anagrafica ingrediente | Oggi tassonomia `ingrediente` |
| `categorie` | Primo, dessert, … | Oggi `categoria-ricetta` |
| `indici-fit` | Leggero, equilibrato, sostanzioso | Oggi `indice-fit` |
| `occasioni` | Carnevale, … | Oggi `occasione` |
| `ricette` | La ricetta | Bozze e versioni native di Payload |

Campi di `ricette`:

- titolo, slug, immagine, introduzione
- `tempo` e `cottura` in minuti, `difficolta` e `valutazione` numeriche
- porzioni base: `dosiPer` (numero) e `dosiUnita` (testo, es. «persone»)
- gruppi ingredienti (array): titolo, flag sottotitolo, righe con quantità numerica, unità, relazione a `ingredienti`, nota per le dosi non numeriche («q.b.», «un pizzico»)
- step (array): ingredienti dello step (relazione, quantità, unità), procedimento, consiglio, immagine, galleria, ID video YouTube
- relazioni a categoria, indice fit, occasione

Il filtro Svuotafrigo interroga queste relazioni. Non si replicano classi o ID del builder.

## Conseguenze

- Il lavoro sul tema `bricks-child` si ferma. La roadmap delle fasi 3–5 descrive uno stack che questa decisione ritira.
- Si perde la bacheca ACF. Si guadagna `/admin`, con bozze, versioni e ruoli.
- WordPress e Node condividono CPU e RAM del VPS. Il sito familiare è piccolo; se la memoria diventa stretta, il sito Node passa a un secondo VPS senza cambiare stack.
- Prima del primo deploy va controllato nel pannello xCloud che la Node offerta rientri nell’intervallo richiesto da Payload. Se è più vecchia, si aggiorna il runtime del sito Node, non si abbassa Payload.
- Postgres va installato sul VPS (servizio o container Docker: xCloud 3 può installare Docker dal pannello). Non è incluso dal solo sito WordPress.
- La migrazione è un export REST/ACF verso le collection, con il parser delle dosi. Il dominio `micimetto.acasolino.com` non si sposta finché una ricetta importata non è navigabile sul nuovo sito (anche su un hostname di prova).

## Fuori da questa decisione

Lo scaffolding del progetto, lo script di migrazione e il taglio DNS non fanno parte di questo ADR. Il codice dell’app nasce in un progetto nuovo, accanto a questo repository.

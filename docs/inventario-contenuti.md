# Inventario contenuti e modello dati — crosstrik.it

Step 1 della migrazione (HTML statico → Astro → Sanity).
Obiettivo: sapere **cosa** c'è sul sito, **da dove arriva** oggi, e **come lo modelliamo**
per i JSON locali (step 2) e per gli schemi Sanity (step 4).

---

## 1. Dove vive oggi ogni contenuto

Legenda origine:
- **HTML**: scritto nella pagina → Google lo vede ✅
- **JS (data.js)**: array JavaScript renderizzato da `main.js` nel browser → nell'HTML grezzo la sezione è vuota ❌
- **JS (fetch)**: file HTML caricato con `fetch` da `main.js` → idem ❌
- **Terze parti**: iframe/widget esterni (Golee, Elfsight, iubenda) → contenuto non nostro

| Pagina | Sezione | Origine oggi | Nel CMS? |
|---|---|---|---|
| tutte | Navbar + CTA sticky "Prenota una prova" | JS (fetch `components/navbar.html`) ❌ | No, layout |
| tutte | Hero (logo, titolo, sottotitolo, testo) | HTML ✅ — il testo cambia per pagina | Sì, testi hero |
| tutte | Feed Instagram | Terze parti (Elfsight) | No |
| tutte | Collaborazioni (loghi partner) | JS (fetch footer + array in `main.js`) ❌ | Sì → **Partner** |
| tutte | Footer (descrizione, link, indirizzo, Instagram, privacy) | JS (fetch `components/footer.html`) ❌ | Sì, i testi → **Info generali** |
| index | Slider corsi | JS (data.js `CORSI`) ❌ | Sì → **Corso** |
| index | Slider team | JS (data.js `COACH`) ❌ | Sì → **Coach** |
| coach | Lista completa coach | JS (data.js `COACH`) ❌ | Sì → **Coach** (stessi dati) |
| info | Tabella orari | HTML ✅ (nuova, statica) | Sì → **Orario** |
| info | Tariffe e abbonamenti | HTML ✅ | Sì → **Tariffa** |
| info | Prenota una prova | Terze parti (iframe Golee) | No, solo l'URL in Info generali |
| info | FAQ | HTML ✅ | Sì → **FAQ** |
| novita | "Next Level": nuova sede, Barbell, Founder Membership, roadmap | HTML ✅ | Da decidere (vedi §5) |

**Il problema SEO in una riga:** corsi, team, partner, navbar e footer non sono nell'HTML grezzo.
Con Astro diventano HTML generato al build, e lo sono anche quando arriveranno da Sanity.

---

## 2. Inventario dettagliato

### Corsi (`data.js` → `CORSI`, 6 corsi)
CrossTrik · Ramping CrossTrik · Yoga · CrossTrik Family · Longevity Fitness · Barbell CrossTrik

Ogni corso ha: `img`, `alt`, `nome`, `descrizione`. La descrizione è **HTML dentro una stringa** e contiene:
- una frase d'apertura in grassetto (in 4 corsi su 6), es. "Riparti con calma, impara le basi del movimento";
- paragrafi ed elenchi puntati scritti come `- testo<br />`;
- tre valutazioni scritte come stelle di testo: `DIFFICOLTÀ: ★★★★☆`, `INTENSITÀ`, `ADATTO AI PRINCIPIANTI`;
- solo per Barbell, una nota in corsivo finale.

Nell'orario compaiono anche corsi che **non** hanno una card: **Open Box** (06:00 lun–ven, 10:00 sab).
C'è un'immagine `corsi/pilates.webp` senza corso: è un residuo.

### Coach (`data.js` → `COACH`, 8 persone)
Mauro (Head Coach) · Davide · Maya · Paola · Niki (Insegnante Yoga) · Chiara · Gloria · Carlotta (Nutrizionista)

Campi: `img`, `alt`, `nome`, `ruolo`, `bio` (testo semplice). L'ordine è quello dell'array.
Dalle bio si capisce chi segue quali corsi (Paola → Longevity, Niki → Yoga, Chiara e Gloria → Ramping e Family):
oggi è solo testo, ma si può collegare ai corsi (vedi modello).

### Orario (info.html, 44 lezioni, lun–sab)
Lezioni da 1 ora; domenica chiuso. Fonte: calendario Golee, confrontato il 05/11/2026 sulle settimane 2–8 e 9–15 novembre.
Escluso: "Kickboxing K1 Muay Thai PRIVATE" (lun/mer 11–13), perché è un servizio privato.

### Tariffe (info.html)
| Piano | Descrizione | Prezzo | Note grafiche |
|---|---|---|---|
| Start | 8 ingressi al mese… | 40 €/mese | |
| Plus | 12 ingressi al mese… | 50 €/mese | badge "Più Scelto", stile premium |
| Unlimited | La flessibilità totale… | 60 €/mese | |
| Performance | Dedicato a chi desidera seguire Barbell… | 75 €/mese | stile "performance" |
| Singola *(Ingressi singoli)* | Ideale per chi è di passaggio… | 7 € Soci · 10 € Esterni | **due prezzi** |

Tutti i prezzi sono nascosti dietro "Rivela Prezzo", ma sono comunque nell'HTML: per Google va bene.

### FAQ (info.html, 5 domande)
Le risposte contengono grassetti (`<strong>`), quindi serve un testo formattato, non semplice.

### Info generali (sparse tra footer, hero, JSON-LD)
- Nome: Crosstrik · claim "Cross Training & Functional Training a Cavriglia"
- Indirizzo: Via Casa Maria 272, 52022 Cavriglia (AR) · coordinate 43.5205, 11.4820
- Instagram: https://www.instagram.com/crosstrik
- Golee: calendario `golee.it/clubs/crosstrik/calendar`, modulo prova `moduli.golee.it/crosstrik/prova`
- Testo footer: "La tua palestra di riferimento per Cross Training…" · "Coach Mauro"
- Privacy e cookie: iubenda 33551105
- **Mancano**: telefono, email, orari di apertura della segreteria (utili per il JSON-LD dello step 6)

### Partner (`main.js` → `avviaSliderLoghi`)
Gensan · Magna e Spigni. L'array li ripete 5 volte solo per far girare lo slider in loop:
nel CMS ogni partner va inserito una volta sola, la ripetizione la gestisce il componente.

---

## 3. Modello dati

Concetti Sanity che usiamo (valgono uguali anche per i JSON dello step 2):
- **document**: un contenuto con una sua pagina nello Studio (un corso, un coach). Si crea, si ordina, si pubblica.
- **object**: un pezzo strutturato che vive *dentro* un documento (una lezione dentro l'orario).
- **reference**: un collegamento a un altro documento (la lezione punta al corso). Se rinomini "Barbell", si aggiorna ovunque.
- **singleton**: un documento che esiste in una sola copia (Info generali, Orario).
- **Portable Text**: il testo formattato di Sanity (grassetto, elenchi), salvato come JSON e non come HTML.

### Corso — *document*
| Campo | Tipo | Esempio | Perché |
|---|---|---|---|
| `nome` | string | "Barbell CrossTrik" | titolo della card |
| `nomeBreve` | string | "Barbell" | in orario e nel filtro, dove lo spazio è poco |
| `slug` | slug | `barbell` | id stabile: classi CSS `lezione--barbell` e filtro `data-corso` |
| `colore` | string (hex) | `#A9B4C2` | colore in orario; diventa `--c-corso` inline, quindi niente CSS da toccare per un corso nuovo |
| `immagine` | image + `alt` | barbell.webp | card; `alt` obbligatorio |
| `claim` | string, opzionale | "Riparti con calma…" | oggi è il primo `<strong>` della descrizione |
| `descrizione` | Portable Text | paragrafi + elenchi | sostituisce l'HTML con `<br />` |
| `difficolta`, `intensita`, `principianti` | number 1–5 | 4, 4, 2 | oggi sono stelle scritte nel testo; come numeri le stelle le disegna il componente |
| `nota` | string, opzionale | "Consigliato anche ai principianti motivati…" | corsivo finale (solo Barbell) |
| `inSlider` | boolean | false per Open Box | Open Box sta in orario ma non ha una card |
| `ordine` | number | 1…7 | ordine nello slider e nella legenda |

### Coach — *document*
| Campo | Tipo | Note |
|---|---|---|
| `nome` | string | |
| `ruolo` | string | "Head Coach", "Coach", "Insegnante Yoga", "Nutrizionista" |
| `foto` | image + `alt` | |
| `bio` | text | testo semplice: oggi non ha formattazione |
| `corsi` | array di reference → Corso, opzionale | non si vede sul sito; serve dopo (JSON-LD, eventuale pagina corso) |
| `ordine` | number | Mauro primo |

### Orario — *singleton* con un array di **Lezione** (*object*)
| Campo Lezione | Tipo | Esempio |
|---|---|---|
| `giorno` | number 1–7 (1 = lunedì) | 1 |
| `ora` | string "HH:MM" | "18:00" |
| `durata` | number, minuti, default 60 | 60 |
| `corso` | reference → Corso | Barbell |

Più `note` (string) per "Tutte le lezioni durano 1 ora · Domenica chiuso".

> **Scelta:** un singleton con dentro l'array, invece di 44 documenti "Lezione" separati.
> In Studio chi aggiorna l'orario lavora su **una sola schermata** e pubblica una volta sola,
> quindi parte un solo rebuild su Vercel. Con 44 documenti ogni modifica sarebbe una pubblicazione (e un rebuild) a parte.
> Righe e fasce orarie (`--r`) non si salvano: il componente le calcola al build, come fa oggi lo script.

### Tariffa — *document*
| Campo | Tipo | Esempio |
|---|---|---|
| `nome` | string | "Plus" |
| `descrizione` | string | "12 ingressi al mese…" |
| `categoria` | `abbonamento` \| `ingresso` | separa i due blocchi della pagina |
| `prezzi` | array di { `importo`: number, `etichetta`: string } | [{50, "/mese"}] · Singola: [{7, "Soci"}, {10, "Esterni"}] |
| `evidenza` | `nessuna` \| `premium` \| `performance` | stile della card; `premium` mostra il badge |
| `badge` | string, opzionale | "Più Scelto" |
| `ordine` | number | |

### FAQ — *document*
`domanda` (string) · `risposta` (Portable Text, per i grassetti) · `ordine` (number).
Ci servirà anche per un JSON-LD `FAQPage` (step 6).

### Partner — *document*
`nome` (string) · `logo` (image + alt) · `url` (url, opzionale) · `ordine`.

### Info generali — *singleton*
| Gruppo | Campi |
|---|---|
| Identità | `nome`, `claim`, `descrizioneFooter`, `firmaFooter` ("Coach Mauro") |
| Indirizzo | `via`, `cap`, `citta`, `provincia`, `lat`, `lng`, `linkMappa` |
| Contatti | `telefono`, `email`, `instagram` |
| Prenotazioni | `urlCalendarioGolee`, `urlModuloProva` |
| Hero per pagina | `heroHome`, `heroCoach`, `heroInfo` (testo sotto il titolo) |
| SEO default | `metaTitle`, `metaDescription`, `ogImage` |

### Resta nel codice (non va nel CMS)
Navbar e CTA sticky, layout e componenti, widget Elfsight/iubenda/Google Translate,
script di interazione (flip card, "Rivela prezzo", slider, filtro orari), CSS.

---

## 4. Problemi trovati (li sistemiamo durante il port, senza toccare la grafica)

1. **Link rotto**: il footer punta a `corsi.html`, ma la pagina è finita in `assets/img/corsi.html`, quindi `/corsi` dà 404.
2. **Due link Google Maps diversi**: navbar `maps.app.goo.gl/4558Pk…`, footer `maps.app.goo.gl/YjE4nc…`.
3. **JSON-LD**: `url` e `@id` puntano a `crosstrik.vercel.app` invece di `crosstrik.it`; l'immagine `assets/img/corsi/background.png` non esiste.
   Il tipo `ExerciseGym` va bene: è un sottotipo di `SportsActivityLocation`, cioè più specifico, quindi da tenere.
4. **CSS diverso tra pagine**: `index.html` usa `style.css`, le altre `style.min.css` (generato a mano con `minify.js`). Astro minifica da solo, quindi `minify.js` non servirà più.
5. **File pubblici che non dovrebbero esserci** (Vercel oggi li serve tutti):
   `haarcascade_frontalface_default.xml` (930 KB, un modello OpenCV), `davide.JPEG` doppio in root,
   `assets/img/paolahold`, `pdf_text.txt`, `istruzioni.txt` (vuoto), `assets/img/corsi.html`,
   Bootstrap sia locale (`assets/css`, `assets/js`) sia da CDN. In Astro viene pubblicata solo la cartella `public/`, quindi spariscono da soli.
6. **Nomi incoerenti**: "CrossTrik", "Crosstrik", "CROSSTRIK", "CROSSTRIk". Va scelta una forma canonica per i dati
   (la grafica può restare maiuscola via CSS).
7. **Meta description di `corsi.html`** cita Pilates e "CrossTrik Kids", corsi che non esistono più.

---

## 5. Domande aperte

1. **Pagina "Next Level" (novita.html)**: è una campagna (Founder Membership valida fino a dicembre).
   Proposta: portarla in Astro **com'è, statica**, senza modellarla in Sanity. Ok?
2. **Pagina corsi**: ricreiamo `/corsi` (il codice per la lista completa c'è già) o togliamo il link dal footer?
3. **Link Maps**: quale dei due è quello giusto?
4. **Telefono / email**: ci sono? Servono al JSON-LD e al footer.
5. **Open Box**: solo in orario (proposta) o anche con una card nello slider corsi?

---

## 6. Cosa produce lo step 2

```
src/data/
  info.json       → singleton Info generali
  corsi.json      → 7 corsi (6 + Open Box)
  coach.json      → 8 coach
  orario.json     → 44 lezioni { giorno, ora, corso: "barbell" }
  tariffe.json    → 5 tariffe
  faq.json        → 5 FAQ
  partner.json    → 2 partner
```
Gli stessi file saranno l'input dello script di migrazione verso Sanity (step 4).
Nei JSON le descrizioni restano HTML per il port 1:1; diventano Portable Text nella migrazione.

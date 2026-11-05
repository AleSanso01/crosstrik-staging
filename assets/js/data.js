// =========================================
//  FONTE DATI UNICA (Single Source of Truth)
//  Corsi e Coach vengono definiti qui una sola volta.
//  Da questi array vengono generati:
//   - gli slider compatti in Home
//   - le card complete nelle pagine archivio (corsi.html / coach.html)
//  Modifica un contenuto qui e si aggiorna ovunque.
// =========================================

const CORSI = [
  {
    img: "assets/img/corsi/crosstrik.webp",
    alt: "Corso Crosstrik a Cavriglia",
    nome: "CrossTrik",
    descrizione: `Il CrossTrik è un programma di rafforzamento e condizionamento
      fisico progettato per migliorare il tuo benessere generale
      attraverso movimenti funzionali, costantemente variati e ad
      alta intensità. I nostri allenamenti riprendono i gesti
      naturali della vita quotidiana e coinvolgono più gruppi
      muscolari contemporaneamente, aiutandoti a sviluppare:<br /><br />
      - Forza e Resistenza<br />
      - Coordinazione e Agilità<br />
      - Equilibrio e Flessibilità<br /><br />
      Ogni sessione è diversa dall'altra: questo rende il percorso
      estremamente stimolante, completo e mai monotono. Le classi
      sono tenute in piccoli gruppi dai nostri coach qualificati,
      che ti seguiranno passo dopo passo per garantire la corretta
      esecuzione di ogni esercizio.<br /><br />
      DIFFICOLTÀ: ★★★★☆<br />
      INTENSITÀ: ★★★★☆<br />
      ADATTO AI PRINCIPIANTI: ★★★☆☆<br />`,
  },
  {
    img: "assets/img/corsi/ramping.webp",
    alt: "Ramping Crosstrik a Cavriglia",
    nome: "Ramping CrossTrik",
    descrizione: `<strong>Riparti con calma, impara le basi del movimento</strong><br /><br />
      Il Ramping CrossTrik è il nostro percorso di rafforzamento e
      condizionamento fisico più graduale, studiato specificamente
      per migliorare il benessere generale, la postura e la qualità
      del movimento. A differenza del corso avanzato, qui ci
      concentriamo esclusivamente sulle basi strutturali:<br /><br />
      - Movimenti funzionali semplici e controllo totale del
      corpo<br />
      - Sviluppo progressivo di forza, flessibilità e
      coordinazione<br />
      - Massima attenzione all'apprendimento della tecnica
      corretta<br /><br />
      Per chi è indicato? È l'attività ideale se vuoi ripartire con
      calma, se non ti alleni da molto tempo o se desideri essere
      seguito con una maggiore attenzione individuale da parte del
      coach nell'esecuzione degli esercizi.<br /><br />
      DIFFICOLTÀ: ★★☆☆☆<br />
      INTENSITÀ: ★★☆☆☆<br />
      ADATTO AI PRINCIPIANTI: ★★★★★<br />`,
  },
  {
    img: "assets/img/corsi/yoga.webp",
    alt: "Yoga nel Valdarno",
    nome: "Yoga",
    descrizione: `<strong>Trova la tua armonia tra corpo e mente</strong><br /><br />
      Lo Yoga in CrossTrik è un'attività interamente dedicata alla
      mobilità, alla respirazione, all'equilibrio e alla profonda
      consapevolezza del corpo. Attraverso lo studio delle posture
      (asana), il controllo consapevole del respiro (pranayama) e
      l'ascolto interiore, questo corso ti aiuterà a:<br /><br />
      - Migliorare drasticamente la flessibilità e l'elasticità
      muscolare<br />
      - Incrementare la concentrazione e la lucidità mentale<br />
      - Ridurre i livelli di stress e ritrovare il benessere
      psicofisico<br /><br />
      È un momento di calma e cura personale, indicato sia per chi
      approccia la disciplina per la prima volta sia per chi vuole
      integrare l'allenamento funzionale con una pratica
      rigenerante. (Le lezioni si svolgono a corpo libero su
      materassino).<br /><br />
      DIFFICOLTÀ: ★★☆☆☆<br />
      INTENSITÀ: ★★☆☆☆<br />
      ADATTO AI PRINCIPIANTI: ★★★★☆<br />`,
  },
  {
    img: "assets/img/corsi/crosstrik-family.webp",
    alt: "CrossTrik Family",
    nome: "CrossTrik Family",
    descrizione: `<strong>Un nuovo modo di vivere l’allenamento in famiglia.</strong><br /><br />
      CROSSTRIK Family permette a bambini e genitori di allenarsi nello stesso orario, seguendo due lezioni separate e adatte alle diverse esigenze.<br /><br />
      Due gruppi, due coach, due percorsi dedicati.<br /><br />
      <strong>Per i bambini</strong><br />
      Attività motorie, giochi, circuiti ed esercizi pensati per sviluppare:<br /><br />
      - Coordinazione<br />
      - Equilibrio e agilità<br />
      - Controllo del corpo<br />
      - Collaborazione e rispetto delle regole<br />
      - Fiducia nelle proprie capacità<br /><br />
      <strong>Per i genitori</strong><br />
      Un allenamento funzionale progressivo, seguito dal coach e adattabile al proprio livello, dedicato a:<br /><br />
      - Forza e tono muscolare<br />
      - Mobilità<br />
      - Core e postura<br />
      - Benessere generale<br />
      - Continuità nell’allenamento<br /><br />
      I bambini svolgono il loro corso con un coach dedicato, mentre mamme, papà o accompagnatori si allenano contemporaneamente in un gruppo separato.<br /><br />
      Una soluzione pensata per rendere più semplice conciliare famiglia, tempo libero e attività fisica.<br /><br />
      DIFFICOLTÀ: ★★☆☆☆<br />
      INTENSITÀ: ★★★☆☆<br />
      ADATTO AI PRINCIPIANTI: ★★★★★<br />`,
  },
  {
    img: "assets/img/corsi/longevity.webp",
    alt: "Longevity Fitness",
    nome: "Longevity Fitness",
    descrizione: `<strong>Attività fisica su misura per mantenersi attivi e in salute</strong><br /><br />
      Il Longevity Fitness è un corso specialistico dedicato agli
      adulti e alla fascia "over" che desiderano prendersi cura del
      proprio corpo, migliorare la qualità della vita e mantenersi
      in forma nel tempo. Il percorso prevede esercizi sicuri,
      controllati e progressivi, studiati appositamente per:<br /><br />
      - Preservare l'autonomia e la sicurezza nei movimenti di tutti
      i giorni<br />
      - Migliorare significativamente la mobilità articolare e
      l'equilibrio<br />
      - Rinforzare il tono muscolare e proteggere le
      articolazioni<br /><br />
      Gli allenamenti si svolgono in un contesto accogliente e
      rilassato, dove ogni attività viene personalizzata in base
      alle reali possibilità fisiche della persona, promuovendo il
      benessere e la socializzazione.<br /><br />
      DIFFICOLTÀ: ★☆☆☆☆<br />
      INTENSITÀ: ★★☆☆☆<br />
      ADATTO AI PRINCIPIANTI: ★★★★★<br />`,
  },
  {
    img: "assets/img/corsi/barbell.webp",
    alt: "Barbell CrossTrik",
    nome: "Barbell CrossTrik",
    descrizione: `Il Barbell CrossTrik è un programma di rafforzamento e
      condizionamento fisico che unisce allenamento funzionale e
      utilizzo del bilanciere all'interno di circuiti dinamici e
      sempre variati.<br /><br />
      Le lezioni combinano esercizi di forza, movimenti tecnici con
      bilanciere e lavoro metabolico, con l'obiettivo di migliorare
      potenza, resistenza, coordinazione e controllo del corpo.<br /><br />
      Squat, stacchi, spinte, tirate e movimenti funzionali vengono
      adattati al livello di ogni partecipante, con particolare
      attenzione alla tecnica e alla corretta esecuzione.<br /><br />
      Ogni allenamento è diverso e stimolante: un percorso pensato
      per chi vuole allenarsi in modo completo, sviluppare maggiore
      sicurezza nell'uso del bilanciere e mettersi alla prova in un
      contesto di gruppo seguito dai coach.<br /><br />
      DIFFICOLTÀ: ★★★★☆<br />
      INTENSITÀ: ★★★★☆<br />
      ADATTO AI PRINCIPIANTI: ★★☆☆☆<br />
      <em>Consigliato anche ai principianti motivati, con inserimento
      graduale e guida dei nostri istruttori.</em>`,
  },
];

const COACH = [
  {
    img: "assets/img/mauro.JPEG",
    alt: "Mauro, Head Coach della palestra Crosstrik",
    nome: "Mauro",
    ruolo: "Head Coach",
    bio: `La guida tecnica di CROSSTRIK. Mauro unisce esperienza, passione e programmazione per aiutare ogni atleta a migliorare, qualunque sia il suo livello. Tecnica, intensità e spirito di squadra: tre elementi che porta in ogni allenamento.`,
  },
  {
    img: "assets/img/davide.JPEG",
    alt: "Davide, Coach",
    nome: "Davide",
    ruolo: "Coach",
    bio: `Determinazione e cura dei dettagli sono il suo punto di forza. Davide ti guiderà con energia e precisione, aiutandoti a migliorare tecnica, forza e sicurezza nei movimenti. Un coach esigente al punto giusto, sempre pronto a farti dare qualcosa in più.`,
  },
  {
    img: "assets/img/maya.JPEG",
    alt: "Maya, Coach alla Crosstrik",
    nome: "Maya",
    ruolo: "Coach",
    bio: `Dinamica, energica e coinvolgente. Maya porta in ogni allenamento entusiasmo e attenzione alla tecnica, sapendo quando alleggerire il carico e quando chiederti quella ripetizione in più. Con lei, impegno e divertimento vanno sempre di pari passo.`},
  {
    img: "assets/img/Paola.JPEG",
    alt: "Paola, Coach",
    nome: "Paola",
    ruolo: "Coach",
    bio: `Determinazione ed esperienza per dimostrare che allenarsi non ha età. Con il Longevity Fitness, Paola ti guida in un percorso dedicato a forza, mobilità ed equilibrio, per affrontare ogni giorno con più energia, sicurezza e autonomia.`,
  },
  {
    img: "assets/img/niki.JPEG",
    alt: "Niki, Insegnante di Yoga",
    nome: "Niki",
    ruolo: "Insegnante Yoga",
    bio: `Il giusto equilibrio tra forza e consapevolezza. Con Niki lo Yoga diventa un percorso per migliorare mobilità, flessibilità e controllo del corpo, imparando a respirare, recuperare e muoversi meglio. Un complemento ideale all’allenamento e uno spazio dedicato al proprio benessere.`,
  },
  {
    img: "assets/img/chiara.JPEG",
    alt: "Chiara, Coach",
    nome: "Chiara",
    ruolo: "Coach",
    bio: `Chiara è una delle nuove energie del team CROSSTRIK. Coach dei corsi Ramping e Family, ti guiderà in allenamenti dinamici e accessibili, aiutandoti a migliorare forza, mobilità e sicurezza nei movimenti, senza dimenticare il divertimento.`,
  },
  {
    img: "assets/img/gloria.JPEG",
    alt: "Gloria, coach",
    nome: "Gloria",
    ruolo: "Coach",
    bio: `Esperienza, energia e attenzione alla persona. Gloria mette la sua esperienza al servizio dei corsi Ramping e Family, guidando ogni allenamento con competenza e capacità di adattare il lavoro alle esigenze di adulti e ragazzi. Un punto di riferimento per allenarsi in modo efficace, sicuro e coinvolgente.`,
  },
  {
    img: "assets/img/carlotta-beccai.jpeg",
    alt: "Carlotta Beccai, Biologa Nutrizionista",
    nome: "Carlotta",
    ruolo: "Nutrizionista",
    bio: `Biologa nutrizionista e PT specializzata nell'allenamento al
      femminile. Il mio approccio si basa sulla costruzione di
      percorsi sostenibili. La mia filosofia? Non eliminare, ma
      insegnare a mangiare consapevolmente per vivere lo sport
      senza privazioni!`,
  },
];

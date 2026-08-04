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
    img: "assets/img/mauro.png",
    alt: "Mauro, Head Coach della palestra Crosstrik",
    nome: "Mauro",
    ruolo: "Head Coach",
    bio: `L'anima e la guida di Crosstrik. Da anni punto di
      riferimento nel territorio per il functional training, la
      sua missione è trasmettere la disciplina del fitness,
      motivare ogni singola persona e mantenere unito e forte il
      nostro grande gruppo.`,
  },
  {
    img: "assets/img/davide.png",
    alt: "Davide, Coach",
    nome: "Davide",
    ruolo: "Coach",
    bio: `Attento e determinato, la sua dedizione per l'allenamento ti
      spingerà sempre oltre i tuoi limiti con la giusta carica. Ti
      seguirà in modo pignolo per assicurare l'esecuzione
      impeccabile di ogni movimento.`,
  },
  {
    img: "assets/img/maya.png",
    alt: "Maya, Coach alla Crosstrik",
    nome: "Maya",
    ruolo: "Coach",
    bio: `Dinamicita' ed esplosivita' al tuo servizio. Con un occhio
      di riguardo alla tecnica e un sorriso contagioso, sarà lì
      per aiutarti ad alleggerire il carico quando serve o
      incitarti all'ultima ripetizione.`,
  },
  {
    img: "assets/img/gloria.png",
    alt: "Gloria, Coach",
    nome: "Gloria",
    ruolo: "Coach",
    bio: `L'energia dirompente necessaria per non mollare:
      sollevamenti potenti e pura tecnica. Una coach pronta a
      trascinarti anche nelle giornate più difficili con la sua
      determinazione.`,
  },
  {
    img: "assets/img/corsi/yoga.webp",
    alt: "Niki, Insegnante di Yoga",
    nome: "Niki",
    ruolo: "Insegnante Yoga",
    bio: `La nostra guida verso la concentrazione interiore. Niki si
      occuperà di rimettervi a nuovo, insegnandovi l'importanza
      della flessibilità e del recupero, per completare al 100% il
      vostro piano atletico.`,
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

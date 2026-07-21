// Funzione per caricare componenti HTML esterni
async function caricaComponente(idContenitore, urlFile) {
  const contenitore = document.getElementById(idContenitore);
  if (!contenitore) return; // Se il div non c'è, ignora

  try {
    const response = await fetch(urlFile);
    if (!response.ok) throw new Error(`Errore caricamento ${urlFile}`);

    const html = await response.text();
    contenitore.innerHTML = html;
  } catch (error) {
    console.error("Errore:", error);
  }
}

// ==========================================
// Inizializzazione Principale
// ==========================================
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // 1. Caricamento componenti asincrono (navbar contiene anche la CTA sticky)
    await caricaComponente("navbar-container", "components/navbar.html");
    await caricaComponente("footer-container", "components/footer.html");

    // 2. Inizializzazione Google Translate
    inizializzaGoogleTranslate();

    // 3. Setup Logica UI (Event Delegation)
    setupEventiGlobali();

    // 4. Comportamento header (scroll: nascondi/mostra + logo full/light)
    setupHeaderScroll();

    // 5. Render contenuti da fonte dati unica (data.js)
    renderContenuti();

    // 6. Avvio slider (corsi/coach in home + loghi collaborazioni)
    avviaSliderContenuti();
    avviaSliderLoghi();
  } catch (errorePrincipale) {
    console.error(
      "Errore critico durante l'inizializzazione:",
      errorePrincipale,
    );
  }
});

// ==========================================
// Google Translate
// ==========================================
function inizializzaGoogleTranslate() {
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage: "it",
        includedLanguages: "it,en,es,fr,de",
      },
      "google_translate_element",
    );
  };
  const gtScript = document.createElement("script");
  gtScript.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(gtScript);

  // Polling per sovrascrivere il testo predefinito in inglese
  const pollingGTranslate = setInterval(() => {
    const translateSelect = document.querySelector(".goog-te-combo");
    if (
      translateSelect &&
      translateSelect.options &&
      translateSelect.options.length > 0
    ) {
      translateSelect.options[0].innerHTML = "Select Language";
      clearInterval(pollingGTranslate);
    }
  }, 200);
}

// ==========================================
// Eventi globali (Leggi di più / Rivela prezzo)
// ==========================================
function setupEventiGlobali() {
  document.body.addEventListener("click", function (e) {
    // A. Logica Bottoni "Leggi di più"
    if (e.target && e.target.classList.contains("btn-leggi")) {
      const bottone = e.target;
      const cardCorrente =
        bottone.closest(".card-corso") || bottone.closest(".card-coach");
      if (!cardCorrente) return;

      const testo =
        cardCorrente.querySelector(".descrizione-corso") ||
        cardCorrente.querySelector(".bio-coach");
      if (!testo) return;

      // Chiudi automaticamente tutti gli altri testi
      document.querySelectorAll(".testo-espanso").forEach((el) => {
        if (el !== testo) el.classList.remove("testo-espanso");
      });

      testo.classList.toggle("testo-espanso");
    }

    // B. Logica Bottoni "Vedi Prezzo"
    if (e.target && e.target.classList.contains("btn-mostra-prezzo")) {
      // Ignora i bottoni "Leggi di più" che usano la stessa classe grafica
      if (e.target.classList.contains("btn-leggi")) return;

      const bottone = e.target;
      const contenitore = bottone.closest(".prezzo-container");
      if (!contenitore) return;

      const prezzoBox = contenitore.querySelector(".prezzo-nascosto");
      if (!prezzoBox) return;

      bottone.style.display = "none";
      prezzoBox.classList.add("fade-in-attivo");
      prezzoBox.classList.remove("prezzo-nascosto");
    }
  });
}

// ==========================================
// Comportamento Header allo scroll
//  - Scende: l'header si nasconde
//  - Sale: l'header riappare
//  - Oltre una soglia: logo full -> logo light (versione compatta)
// ==========================================
function setupHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  // Tre step ben distinti (regola qui le soglie):
  const SOGLIA_LOGO = 80; // Step 2: oltre -> logo light + header condensato (ancora visibile)
  const SOGLIA_NASCONDI = 260; // Step 3: oltre, scendendo -> header scompare
  const DELTA_DIREZIONE = 6; // px minimi di movimento per cambiare direzione (anti-jitter)

  let ultimoScroll = window.scrollY || 0;

  function aggiornaHeader() {
    const y = window.scrollY || 0;
    const delta = y - ultimoScroll;

    // --- Logo full <-> light (in base alla posizione assoluta) ---
    // Step 1 (in cima): niente classi -> logo full, header alto.
    // Step 2 (oltre SOGLIA_LOGO): is-scrolled -> logo light, header condensato.
    header.classList.toggle("is-scrolled", y > SOGLIA_LOGO);

    // --- Nascondi/mostra (in base alla direzione) ---
    if (Math.abs(delta) > DELTA_DIREZIONE) {
      if (delta > 0 && y > SOGLIA_NASCONDI) {
        // Step 3: scendendo oltre la soglia alta -> l'header scompare
        header.classList.add("is-hidden");
      } else if (delta < 0) {
        // Salendo -> l'header riappare subito (con logo light)
        header.classList.remove("is-hidden");
      }
      ultimoScroll = y <= 0 ? 0 : y;
    }

    // In cima alla pagina l'header è sempre visibile e intero
    if (y <= SOGLIA_LOGO) {
      header.classList.remove("is-hidden");
    }
  }

  // requestAnimationFrame per performance (evita jank durante lo scroll)
  let inAttesa = false;
  window.addEventListener("scroll", function () {
    if (inAttesa) return;
    inAttesa = true;
    window.requestAnimationFrame(function () {
      aggiornaHeader();
      inAttesa = false;
    });
  });

  aggiornaHeader();
}

// ==========================================
// Render contenuti (Corsi / Coach) da data.js
// ==========================================
function renderContenuti() {
  // -- SLIDER HOME: card compatte, senza testo, senza CTA, non cliccabili --
  const sliderCorsi = document.getElementById("slider-corsi-wrapper");
  if (sliderCorsi && typeof CORSI !== "undefined") {
    sliderCorsi.innerHTML = CORSI.map(
      (c) => `
      <div class="swiper-slide">
        <div class="card-corso card-slider text-center">
          <img src="${c.img}" alt="${c.alt}" class="img-fluid" loading="lazy" />
          <h3 class="titolo-corso mt-3">${c.nome}</h3>
        </div>
      </div>`,
    ).join("");
  }

  const sliderCoach = document.getElementById("slider-coach-wrapper");
  if (sliderCoach && typeof COACH !== "undefined") {
    sliderCoach.innerHTML = COACH.map(
      (c) => `
      <div class="swiper-slide">
        <article class="card-coach card-slider p-4 text-center">
          <div class="card-coach-foto pb-3">
            <img src="${c.img}" alt="${c.alt}" class="foto-coach" loading="lazy" />
          </div>
          <div class="card-coach-testo">
            <h3 class="nome-coach pb-1">${c.nome}</h3>
            <p class="ruolo-coach pb-2 mb-0">${c.ruolo}</p>
          </div>
        </article>
      </div>`,
    ).join("");
  }

  // -- ARCHIVIO CORSI: card complete con descrizione e "Leggi di più" --
  const listaCorsi = document.getElementById("lista-corsi-wrapper");
  if (listaCorsi && typeof CORSI !== "undefined") {
    listaCorsi.innerHTML = CORSI.map(
      (c) => `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
        <div class="card-corso py-5 px-3 text-center">
          <img src="${c.img}" alt="${c.alt}" class="img-fluid" loading="lazy" />
          <h3 class="titolo-corso mt-3 pb-2">${c.nome}</h3>
          <p class="descrizione-corso testo-troncato text-start">${c.descrizione}</p>
          <button class="btn-leggi">Leggi di più</button>
        </div>
      </div>`,
    ).join("");
  }

  // -- ARCHIVIO COACH: card complete con bio e "Leggi di più" --
  const listaCoach = document.getElementById("lista-coach-wrapper");
  if (listaCoach && typeof COACH !== "undefined") {
    listaCoach.innerHTML = COACH.map(
      (c) => `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
        <article class="card-coach p-4 text-center">
          <div class="card-coach-foto pb-3">
            <img src="${c.img}" alt="${c.alt}" class="foto-coach" loading="lazy" />
          </div>
          <div class="card-coach-testo">
            <h3 class="nome-coach pb-1">${c.nome}</h3>
            <p class="ruolo-coach pb-2 mb-0">${c.ruolo}</p>
            <p class="bio-coach testo-troncato mt-2 text-start">${c.bio}</p>
            <button class="btn-leggi btn-mostra-prezzo text-white w-100 mt-3">
              Leggi di più
            </button>
          </div>
        </article>
      </div>`,
    ).join("");
  }
}

// ==========================================
// Slider orizzontali Corsi/Coach (Home)
//  - orizzontali, paginazione a bullet automatica, autoplay
// ==========================================
function avviaSliderContenuti() {
  if (typeof Swiper === "undefined") return;

  const opzioniBase = {
    slidesPerView: 1,
    spaceBetween: 24,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-corsi .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  };

  if (document.querySelector(".swiper-corsi")) {
    new Swiper(".swiper-corsi", opzioniBase);
  }

  if (document.querySelector(".swiper-coach")) {
    new Swiper(".swiper-coach", {
      ...opzioniBase,
      pagination: {
        el: ".swiper-coach .swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    });
  }
}

// ==========================================
// Slider loghi collaborazioni (nel footer)
// ==========================================
function avviaSliderLoghi() {
  const loghiCollaboratori = [
    "background.png",
    "crosstrik_kids.png",
    "logevity.png",
    "pilates.png",
    "background.png",
    "crosstrik_kids.png",
    "logevity.png",
    "pilates.png",
  ];

  const wrapper = document.getElementById("loghi-wrapper");
  if (!wrapper) return;

  loghiCollaboratori.forEach((nomeLogo) => {
    const slide = document.createElement("div");
    slide.className =
      "swiper-slide d-flex justify-content-center align-items-center";
    slide.innerHTML = `
      <img src="assets/img/collaborazioni/${nomeLogo}" alt="Partner Crosstrik" class="img-fluid"
           style="max-height: 80px; object-fit: contain; filter: grayscale(100%); transition: filter 0.3s;"
           onmouseover="this.style.filter='grayscale(0%)'"
           onmouseout="this.style.filter='grayscale(100%)'">
    `;
    wrapper.appendChild(slide);
  });

  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiperLoghi", {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
      },
    });
  }
}

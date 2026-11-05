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

    // 3. Setup Logica UI (Event Delegation e Scroll Header)
    setupEventiGlobali();

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
    // A. Logica Flip Card
    if (e.target && e.target.classList.contains("btn-flip")) {
      const flipper = e.target.closest(".card-flipper");
      if (flipper) {
        flipper.classList.add("is-flipped");
        // Pausa autoplay dello swiper
        const swiperContainer = e.target.closest(".swiper");
        if (
          swiperContainer &&
          swiperContainer.swiper &&
          swiperContainer.swiper.autoplay
        ) {
          swiperContainer.swiper.autoplay.stop();
        }
      }
    }

    if (e.target && e.target.classList.contains("btn-flip-back")) {
      const flipper = e.target.closest(".card-flipper");
      if (flipper) {
        flipper.classList.remove("is-flipped");
        // Riprendi autoplay
        const swiperContainer = e.target.closest(".swiper");
        if (
          swiperContainer &&
          swiperContainer.swiper &&
          swiperContainer.swiper.autoplay
        ) {
          swiperContainer.swiper.autoplay.start();
        }
      }
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
// Render contenuti (Corsi / Coach) da data.js
// ==========================================
function renderContenuti() {
  // -- SLIDER HOME: card compatte, senza testo, senza CTA, non cliccabili --
  const sliderCorsi = document.getElementById("slider-corsi-wrapper");
  if (sliderCorsi && typeof CORSI !== "undefined") {
    sliderCorsi.innerHTML = CORSI.map(
      (c) => `
      <div class="swiper-slide">
        <div class="card-flip-container">
          <div class="card-flipper">
            <!-- FRONTE -->
            <div class="card-front card-corso card-slider py-4 px-3 text-center d-flex flex-column justify-content-between">
              <div>
                <img src="${c.img}" alt="${c.alt}" class="img-fluid" loading="lazy" />
                <h3 class="titolo-corso mt-3 pb-2">${c.nome}</h3>
              </div>
              <button class="btn-flip btn-leggi w-100 mt-3">Leggi di più</button>
            </div>
            
            <!-- RETRO -->
            <div class="card-back text-start d-flex flex-column p-0">
              <div class="card-back-scrollable p-4 flex-grow-1" style="overflow-y: auto;">
                <h3 class="titolo-corso mb-3 text-center" style="font-size:1.6rem">${c.nome}</h3>
                <p class="descrizione-corso testo-chiaro mb-0" style="font-size: 0.95rem; color: var(--testo-chiaro);">${c.descrizione}</p>
              </div>
              <div class="p-3" style="border-top: 1px solid #333; background: var(--grigio-scuro);">
                <button class="btn-flip-back bottone w-100 py-2" style="background:transparent; border: 1px solid var(--primary); color:var(--primary)">Indietro</button>
              </div>
            </div>
          </div>
        </div>
      </div>`,
    ).join("");
  }

  const sliderCoach = document.getElementById("slider-coach-wrapper");
  if (sliderCoach && typeof COACH !== "undefined") {
    sliderCoach.innerHTML = COACH.map(
      (c) => `
      <div class="swiper-slide">
        <div class="card-flip-container">
          <div class="card-flipper">
            <!-- FRONTE -->
            <article class="card-front card-coach card-slider p-4 text-center d-flex flex-column justify-content-between">
              <div>
                <img src="${c.img}" alt="${c.alt}" class="img-fluid mb-3 foto-coach" loading="lazy" />
                <h3 class="nome-coach mb-3">${c.nome}</h3>
                <p class="ruolo-coach mb-3">${c.ruolo}</p>
              </div>
              <button class="btn-flip btn-leggi w-100 mt-3 pt-2 pb-2">Leggi di più</button>
            </article>

            <!-- RETRO -->
            <article class="card-back text-start d-flex flex-column p-0">
              <div class="card-back-scrollable p-4 flex-grow-1" style="overflow-y: auto;">
                <h3 class="nome-coach mb-3 text-center" style="font-size: 1.6rem">${c.nome}</h3>
                <p class="ruolo-coach mb-3 text-center" style="color:var(--primary); background: none;">${c.ruolo}</p>
                <p class="bio-coach testo-chiaro mb-0" style="color: var(--testo-chiaro); font-size: 0.95rem;">${c.bio}</p>
              </div>
              <div class="p-3" style="border-top: 1px solid #333; background: var(--grigio-scuro);">
                <button class="btn-flip-back bottone w-100 py-2" style="background:transparent; border: 1px solid var(--primary); color:var(--primary)">Indietro</button>
              </div>
            </article>
          </div>
        </div>
      </div>`,
    ).join("");
  }

  // -- ARCHIVIO CORSI: card complete con descrizione e "Leggi di più" --
  const listaCorsi = document.getElementById("lista-corsi-wrapper");
  if (listaCorsi && typeof CORSI !== "undefined") {
    listaCorsi.innerHTML = CORSI.map(
      (c) => `
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
        <div class="card-flip-container">
          <div class="card-flipper">
            <!-- FRONTE -->
            <div class="card-front card-corso py-4 px-3 text-center d-flex flex-column justify-content-between">
              <div>
                <img src="${c.img}" alt="${c.alt}" class="img-fluid" loading="lazy" />
                <h3 class="titolo-corso mt-3 pb-2">${c.nome}</h3>
              </div>
              <button class="btn-flip btn-leggi w-100 mt-3">Leggi di più</button>
            </div>
            
            <!-- RETRO -->
            <div class="card-back text-start d-flex flex-column p-0">
              <div class="card-back-scrollable p-4 flex-grow-1" style="overflow-y: auto;">
                <h3 class="titolo-corso mb-3 text-center" style="font-size:1.6rem">${c.nome}</h3>
                <p class="descrizione-corso testo-chiaro mb-0" style="font-size: 0.95rem; color: var(--testo-chiaro);">${c.descrizione}</p>
              </div>
              <div class="p-3" style="border-top: 1px solid #333; background: var(--grigio-scuro);">
                <button class="btn-flip-back bottone w-100 py-2" style="background:transparent; border: 1px solid var(--primary); color:var(--primary)">Indietro</button>
              </div>
            </div>
          </div>
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
        <div class="card-flip-container">
          <div class="card-flipper">
            <!-- FRONTE -->
            <article class="card-front card-coach p-4 text-center d-flex flex-column justify-content-between">
              <div>
                <img src="${c.img}" alt="${c.alt}" class="img-fluid pb-3 foto-coach" loading="lazy" />
                <h3 class="nome-coach pb-1">${c.nome}</h3>
                <p class="ruolo-coach pb-2 mb-0">${c.ruolo}</p>
              </div>
              <button class="btn-flip btn-leggi w-100 mt-3 pt-2 pb-2">Leggi di più</button>
            </article>

            <!-- RETRO -->
            <article class="card-back text-start d-flex flex-column p-0">
              <div class="card-back-scrollable p-4 flex-grow-1" style="overflow-y: auto;">
                <h3 class="nome-coach pb-1 text-center" style="font-size: 1.6rem">${c.nome}</h3>
                <p class="ruolo-coach pb-3 mb-0 text-center" style="color:var(--primary); background: none;">${c.ruolo}</p>
                <p class="bio-coach testo-chiaro mb-0" style="color: var(--testo-chiaro); font-size: 0.95rem;">${c.bio}</p>
              </div>
              <div class="p-3" style="border-top: 1px solid #333; background: var(--grigio-scuro);">
                <button class="btn-flip-back bottone w-100 py-2" style="background:transparent; border: 1px solid var(--primary); color:var(--primary)">Indietro</button>
              </div>
            </article>
          </div>
        </div>
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
  const loghiCollaboratori = ["gensan.jpg", "magna_e_spigni.jpg","gensan.jpg", "magna_e_spigni.jpg","gensan.jpg", "magna_e_spigni.jpg","gensan.jpg", "magna_e_spigni.jpg","gensan.jpg", "magna_e_spigni.jpg",];

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

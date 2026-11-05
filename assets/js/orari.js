// =========================================
//  FILTRO TABELLA ORARI (info.html#orari)
//  Le lezioni sono già nell'HTML: qui le nascondiamo/mostriamo soltanto.
//  Nessun corso selezionato = si vedono tutti.
// =========================================
(function () {
  const form = document.querySelector(".orari-filtro");
  const board = document.querySelector(".orari-board");
  if (!form || !board) return;

  const reset = form.querySelector(".orari-filtro-reset");

  function applica() {
    const scelti = [...form.querySelectorAll("input:checked")].map((i) => i.value);
    const tutti = scelti.length === 0;

    board.querySelectorAll(".lezione").forEach((l) => {
      l.hidden = !tutti && !scelti.includes(l.dataset.corso);
    });

    // Fasce orarie e giorni senza lezioni visibili vengono marcati come vuoti
    board.querySelectorAll(".orari-slot, .orari-giorno").forEach((el) => {
      el.classList.toggle("is-vuoto", !el.querySelector(".lezione:not([hidden])"));
    });

    form.classList.toggle("is-attivo", !tutti);
    reset.hidden = tutti;
  }

  form.addEventListener("change", applica);
  // "reset" scatta prima che le checkbox vengano svuotate: aspettiamo un tick
  form.addEventListener("reset", () => setTimeout(applica));
  form.addEventListener("submit", (e) => e.preventDefault());
})();

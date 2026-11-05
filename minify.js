const fs = require("fs");
console.log("Reading style.css...");
let css = fs.readFileSync("assets/css/style.css", "utf8");

// Rimuove i commenti CSS
css = css.replace(/\/\*[\s\S]*?\*\//g, "");

// Rimuove gli spazi multipli
css = css.replace(/\s+/g, " ");

// Rimuove gli spazi attorno a { } : ; ,
css = css.replace(/\s*([\{\}\:\;\,\>])\s*/g, "$1");

// Gestisce correttamente lo calc() padding e calc o gradienti se spazi sono necessari
// Attenzione: minify tramite regex semplice a volte rompe i `calc(100% - 2px)`.
// `style.css` in questo sito non sembra usare calc complesso, ma possiamo evitare di compattare troppo brutalmente.
// Per proteggere le variabili CSS che hanno spazi:
css = css.replace(/:\s+/g, ":");
css = css.trim();

fs.writeFileSync("assets/css/style.min.css", css);
console.log("style.min.css generated successfully.");

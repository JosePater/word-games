let pericopa =  `27 Pero a vosotros los que oís, os digo: Amad a vuestros enemigos, haced bien a los que os aborrecen; 28 bendecid a los que os maldicen, y orad por los que os calumnian. 29 Al que te hiera en una mejilla, preséntale también la otra; y al que te quite la capa, ni aun la túnica le niegues. 30 A cualquiera que te pida, dale; y al que tome lo que es tuyo, no pidas que te lo devuelva. 31 Y como queréis que hagan los hombres con vosotros, así también haced vosotros con ellos. 32 Porque si amáis a los que os aman, ¿qué mérito tenéis? Porque también los pecadores aman a los que los aman. 33 Y si hacéis bien a los que os hacen bien, ¿qué mérito tenéis? Porque también los pecadores hacen lo mismo. 34 Y si prestáis a aquellos de quienes esperáis recibir, ¿qué mérito tenéis? Porque también los pecadores prestan a los pecadores, para recibir otro tanto.35Amad, pues, a vuestros enemigos, y haced bien, y prestad, no esperando de ello nada; y será vuestro galardón grande, y seréis hijos del Altísimo; porque él es benigno para con los ingratos y malos.36 Sed, pues, misericordiosos, como también vuestro Padre es misericordioso.`;

// Palabras y singnos a omitir
let omitWords = ['de','del','la','lo','le','las','los','por','para','por','como','con','que','un','una','pues',];
let signos = ['.', ',', ';', '?', '!', '¿'];

let words = new Map();

filterWords();

function filterWords() {
    let allWords_signs = pericopa.split(" "); // Array de palabras de la perícopa
    let words_without_signs = []; // Palabras filtradas (omitidas y tamaño)

    // Quitar las palabras omitidas y las <= x letras
    allWords_signs.forEach(palabra => {
        if (palabra.length > 2 && !omitWords.includes(palabra)) {
            let palabraSinSignos = palabra;
            signos.forEach(sig => {
                palabraSinSignos = palabraSinSignos.replaceAll(`${sig}`,``);
            });
            words_without_signs.push(palabraSinSignos);
        }
    });

    // Contar la cantidad de vez que aparece una palabra
    words_without_signs.forEach((palabra) => {
        let cant = 1;
        if (palabra.length > 2) {
            if (!omitWords.includes(palabra)) {
                if (words.has(palabra)) { 
                    cant = words.get(palabra) + 1;
                    words.set(palabra, cant); // Sumar las palabras repetidas
                }
                if (!words.has(palabra)) {
                    words.set(palabra, cant);
                }
            }
        }
    });

    // Eliminar palabras sin repetir
    words.forEach (function(value, key) {
        if (value <= 1) {
            words.delete(key);
        }
    });
}

console.log("______________ MAP _________________");
console.log(words);


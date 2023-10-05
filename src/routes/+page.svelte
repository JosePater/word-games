<script>
  $: prompt = '';
  $: table_enabled = false;
  let omitir = 'No';
  $: OmitWord_enabled = false; // input palabras a omitir: deshabilitado
  let numberLetters = '3'; // Cantidad de letras
  let isChecked = false; // Checkbox Aaa == aaa
  let mensaje = '';
  let inicio = false;

  // Palabras y signos a omitir
  let omitWords = []; // ['de','del','la','lo','le','las','los','por','para','por','como','con','que','un','una','pues',];
  let signos = ['.', ',', ';', ':', '?', '!', '¿', "'", '"'];
  let words = new Map();

  $: omitir == 'Sí'
    ? (OmitWord_enabled = true)
    : ((OmitWord_enabled = false), (omitWords = []), actualizar());
  $: numberLetters > 0 ? actualizar() : actualizar();

  function iniciar() {
    inicio = true;
    actualizar();
  }

  function actualizar() {
    if (inicio) {
      prompt.trim() != ''
        ? (mensaje = '😎 ¡No hay palabras repetidas!')
        : (mensaje = '😜 ¡No hay texto!');
      setTimeout(
        () => {
          filterWords();
        },
        300,
        (table_enabled = false)
      );
    }
  }

  function borrar(key) {
    setTimeout(
      () => {
        words.delete(key);
        table_enabled = true;
      },
      100,
      (table_enabled = false)
    );
  }

  function filterWords() {
    words.clear();
    let textWithoutLineBreaks = prompt.replace(/\n/g, ' '); // Reemplaza '\n' por ' '
    let allWords_signs = textWithoutLineBreaks.split(' '); // Array de palabras del prompt
    let words_without_signs = []; // Palabras filtradas (omitidas y tamaño)

    // Quitar las palabras omitidas y las <= x letras
    allWords_signs.forEach((palabra) => {
      if (palabra.length >= numberLetters && !omitWords.includes(palabra)) {
        let palabraSinSignos = palabra;
        signos.forEach((sig) => {
          palabraSinSignos = palabraSinSignos.replaceAll(`${sig}`, ``);
        });
        words_without_signs.push(palabraSinSignos);
      }
    });

    // Contar la cantidad de veces que aparece una palabra
    words_without_signs.forEach((palabra) => {
      let cant = 1;
      // Check Aaaa != aaaa
      if (isChecked == false) {
        palabra =
          palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase(); // Aaaa
      }
      if (palabra.length >= numberLetters) {
        if (!omitWords.includes(palabra)) {
          if (words.has(palabra)) {
            cant = words.get(palabra) + 1; // Sumar las palabras repetidas
            words.set(palabra, cant);
          }
          if (!words.has(palabra)) {
            words.set(palabra, cant);
          }
        }
      }
    });

    // Eliminar palabras sin repetir
    words.forEach(function (value, key) {
      if (value <= 1) {
        words.delete(key);
      }
    });
    table_enabled = true;
  }
</script>

<svelte:head>
  <title>Palabras repetidas</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1 class="title"><b>CONTADOR DE PALABRAS</b></h1>

  <div class="card shadow p-3 mb-4 bg-body rounded mx-auto">
    <div class="card-body">
      <h5 class="card-title fs-6">Ingresa un texto</h5>
      <div class="form-floating mb-5">
        <textarea
          placeholder="Escribe el texto"
          style="height: 280px"
          class="form-control"
          bind:value={prompt}
        />
      </div>
      <div class="row mt-2 d-flex justify-content-center align-items-center">
        <h5 class="fs-6">Filtrar palabras</h5>
        <div class="col-2 mb-2 size-screen">
          <label for="">Omitir palabras</label>
          <select bind:value={omitir} class="form-select">
            <option selected value="No">No</option>
            <option value="Sí">Sí</option>
          </select>
        </div>

        <div class="col-3 size-screen2">
          <label for="">Cantidad min. letras</label>
          <select bind:value={numberLetters} class="form-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option selected value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="col size-screen">
          <label>
            <input
              type="checkbox"
              bind:checked={isChecked}
              on:input={actualizar}
            />
            Distinguir entre Mayúsculas y minúsculas
          </label>
        </div>

        {#if OmitWord_enabled}
          <div class="input-group mb-2 mt-2">
            <span class="input-group-text">Palabras a omitir:</span>
            <input
              type="text"
              class="form-control size-screen3"
              placeholder="Separar con coma: el, la, los, las..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              bind:value={omitWords}
            />
          </div>
        {/if}
        <div class="col size-screen">
          <button class="btn btn-primary w-100 mt-2" on:click={iniciar}
            ><b>Aceptar</b></button
          >
        </div>
      </div>
    </div>
  </div>

  {#if table_enabled}
    <div class="card shadow p-3 mb-4 bg-body rounded mx-auto size-screen4">
      {#if words.size > 0}
        <table class="table">
          <thead>
            <tr>
              <th scope="col"># ({words.size})</th>
              <th scope="col">Palabras</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {#each words.entries() as [key, value], i}
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{key}</td>
                <td>{value}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    on:click={() => {
                      borrar(key);
                    }}>Borrar</button
                  >
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <h3>{mensaje}</h3>
      {/if}
    </div>
  {/if}
</section>

<style>
  .title {
    font-size: 25px;
  }
  .card,
  select,
  button {
    font-size: 14px;
  }
  h5 {
    margin-top: -20px;
  }
  @media screen and (max-width: 800px) {
    .size-screen {
      display: block;
      width: fit-content;
    }
    .size-screen3 {
      width: fit-content;
    }
  }
  @media screen and (max-width: 485px) {
    .size-screen2 {
      display: block;
      width: fit-content;
    }
    textarea {
      margin: 0;
    }
  }
  @media screen and (max-width: 460px) {
    .size-screen4 {
      display: block;
      overflow: auto;
    }
    table,
    button {
      margin: 0;
      padding: 5px;
    }
    .title {
      font-size: 20px;
    }
  }
</style>

<script>
  let prompt = '';
  let table_enabled = false;
  let omitir = 'No'; 
  let OmitWord_enabled = false; // input palabras a omitir: deshabilitado

  // Palabras y singnos a omitir
  let omitWords = []; // ['de','del','la','lo','le','las','los','por','para','por','como','con','que','un','una','pues',];
  let signos = ['.', ',', ';', ':', '?', '!', '¿']; 
  let words = new Map();

  $: omitir == "Sí" ? OmitWord_enabled = true : OmitWord_enabled = false;
    
  function valideData() {
    if (prompt.trim() != '') {
      filterWords();
    } else {
      table_enabled = false;
      console.log('Datos vacíos');
    }
  }

  function filterWords() {
    words.clear(); 
    let allWords_signs = prompt.split(' '); // Array de palabras del prompt
    let words_without_signs = []; // Palabras filtradas (omitidas y tamaño)

    // Quitar las palabras omitidas y las <= x letras
    allWords_signs.forEach((palabra) => {
      if (palabra.length > 2 && !omitWords.includes(palabra)) {
        let palabraSinSignos = palabra;
        signos.forEach((sig) => {
          palabraSinSignos = palabraSinSignos.replaceAll(`${sig}`, ``);
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
    words.forEach(function (value, key) {
      if (value <= 1) {
        words.delete(key);
      }
    });
    table_enabled = true;
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>BIENVENIDOS</h1>

  <div class="card shadow p-3 mb-5 bg-body rounded">
    <div class="card-body">
      <h5 class="card-title fs-1">Contador de palabras</h5>
      <div class="form-floating">
        <textarea
          id="text1"
          placeholder="Escribe el texto"
          style="height: 150px"
          class="form-control"
          bind:value={prompt}
        />
      </div>
      <div class="row mt-3">
        <label for="">Omitir palabras</label>
        <div class="col-2 mb-2">
          <select bind:value={omitir} class="form-select">
			      <option selected value="No">No</option>
            <option value="Sí">Sí</option>
          </select>
        </div>

        {#if OmitWord_enabled}
          <div class="input-group mb-2">
            <span class="input-group-text" id="basic-addon1" >Palabras a omitir:</span>
            <input
              type="text"
              class="form-control"
              placeholder="Separar con coma: el, la, los, las..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              bind:value={omitWords}
            />
          </div>
        {/if}
        <div class="col-8">
          <button class="btn btn-primary mb-2" on:click={valideData}>Aceptar</button>
        </div>
      </div>
    </div>
  </div>
  
  {#if table_enabled}
    <div class="card shadow p-3 mb-5 bg-body rounded">
      {#if words.size > 0}
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Palabras</th>
              <th scope="col"># Repeticiones</th>
              <th scope="col">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {#each words.entries() as [key, value], i}
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{key}</td>
                <td>{value}</td>
                <td><button class="btn btn-danger">Borrar</button></td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <h3>No hay palabras repetidas</h3>
      {/if}
    </div>
  {/if}
</section>

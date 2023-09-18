<script>
  $: prompt = '';
  $: table_enabled = false;
  let omitir = 'No'; 
  $: OmitWord_enabled = false; // input palabras a omitir: deshabilitado
  let numberLetters = '3'; // Cantidad de letras 

  // Palabras y signos a omitir
  let omitWords = []; // ['de','del','la','lo','le','las','los','por','para','por','como','con','que','un','una','pues',];
  let signos = ['.', ',', ';', ':', '?', '!', '¿']; 
  let words = new Map();

  $: omitir == "Sí" ? OmitWord_enabled = true : (OmitWord_enabled = false, omitWords = [], actualizar());
  $: numberLetters > 0 ? actualizar() : actualizar();

  function actualizar() {
    setTimeout(() => {
      filterWords()
    }, 300, table_enabled = false)  
  }

  function borrar(key) {
    setTimeout(() => {
      words.delete(key);
      table_enabled = true;
    }, 100, table_enabled = false)  
  }

  function valideData() {
    if (prompt.trim() != '') {
      actualizar();
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
      if (palabra.length >= numberLetters && !omitWords.includes(palabra)) {
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
      if (palabra.length >= numberLetters) {
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
          on:input={actualizar} 
        />
      </div>
      <div class="row mt-3">
        <h4>Filtrar palabras</h4>
        <div class="col-2 mb-2">
          <label for="">Omitir palabras</label>
          <select bind:value={omitir} class="form-select">
			      <option selected value="No">No</option>
            <option value="Sí">Sí</option>
          </select>
        </div>
       
        <div class="col-2 mb-2">
          <label for="">Cantidad letras</label>
          <select  bind:value={numberLetters} class="form-select">
            <option value=1>1</option>
            <option value=2>2</option>
            <option selected value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
            <option value=10>10</option>
          </select>
        </div>

        {#if OmitWord_enabled}
          <div class="input-group mb-2 mt-2">
            <span class="input-group-text" id="basic-addon1" >Palabras a omitir:</span>
            <input
              type="text"
              class="form-control"
              placeholder="Separar con coma: el, la, los, las..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              bind:value={omitWords}
              on:input={actualizar}
            />
          </div>
        {/if}
        <div class="col-8">
          <button class="btn btn-primary mt-3" on:click={valideData}>Aceptar</button>
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
                <td>
                  <button
                    class="btn btn-danger"
                    on:click={() => {
                      borrar(key)
                    }}>Borrar</button
                  >
                </td>
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

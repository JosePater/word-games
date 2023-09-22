<svelte:head>
  <title>Acercade</title>
  <meta name="description" content="About this app" />
</svelte:head>

<!-- Contenido de la página Acerca de -->
<section>
  <h1>Contador de Palabras</h1>

  <p>
    Este es un contador de palabras simple que te permite ingresar un texto y
    contar las palabras que se repiten más de una vez en el texto. Puedes
    configurar diversas opciones, como omitir palabras específicas, establecer
    un límite mínimo de letras y distinguir entre mayúsculas y minúsculas.
  </p>

  <h2>Cómo Usar</h2>

  <ol>
    <li>Ingresa un texto en el campo de entrada.</li>
    <li>
      Configura las opciones según tus preferencias:
      <ul>
        <li>
          Omitir palabras específicas: Puedes especificar palabras que se
          omitirán del conteo.
        </li>
        <li>
          Cantidad mínima de letras: Establece el límite mínimo de letras para
          contar palabras.
        </li>
        <li>
          Distinguir entre mayúsculas y minúsculas: Activa esta opción si deseas
          que las palabras se distingan por su capitalización.
        </li>
      </ul>
    </li>
    <li>Haz clic en el botón "Aceptar" para iniciar el conteo.</li>
    <li>
      Los resultados se mostrarán en una tabla, que incluirá las palabras que se
      repiten más de una vez y su cantidad.
    </li>
    <li>
      Si es necesario, puedes borrar palabras de la tabla haciendo clic en el
      botón "Borrar" junto a cada palabra.
    </li>
  </ol>

  <h2>Autor</h2>

  <p class="author">José Luis Paternina Martínez</p>
</section>


<style>
  /* Estilos para el contenedor principal */
  section {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    font-size:34px;
    color: #250303;
    margin-top: 0;
  }

  p {
    font-size: 20px;
    line-height: 1.5;
    color: #302e2e;
  }

  /* Estilos para las listas */
  ol,
  ul {
    text-align: left;
    margin-left: 20px;
  }

  li {
    font-size: 20px;
    color: #302e2e;
    margin-bottom: 10px;
  }

  /* Estilos para el autor */
  h2 {
    font-size: 30px;
    color: #302e2e;
    margin-top: 30px;
  }

  p.author {
    font-size: 20px;
    color: #302e2e;
    font-style: italic;
  }
</style>

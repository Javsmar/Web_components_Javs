/*

Responsabilidad
    - Mostrar un texto que hace referencia a la tarea que tenemos que hacer
    - Eliminarse cuando se pulsa el botón de borrado

Atributos
    - texto a mostrar -> content
    - texto de botón de borrado -> buttonLabel

Eventos
    - Hemos meditado la opción de incluir un evento de borrado pero no lo vemos necesario aún.

Custom properties
    - SKIP

*/

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="list-item-wrapper">
  <span>keepcoding component boilerplate</span>
</div>

`;

class ListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
  }
}

customElements.define("list-item", ListItem);

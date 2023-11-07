/*

Responsabilidad
  - Cada vez que se cree un elemento nuevo, mostrarlo en la lista
  - Persistir los todos una vez creados
  - Contador de todos pendientes
Opcional -> lista de todos completados.

Atributos
- 0

Eventos
- 0

Custom properties
- 0

*/

import './custom-input.js';
import './list-item.js';

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="todo-app-wrapper">
  <custom-input></custom-input>
  <div class="todo-list"></div>
</div>

`;

class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const customInput = this.shadowRoot.querySelector('custom-input');
    customInput.addEventListener('submit', (event) => {
      this.addTodo(event.detail);
    })
  }

  addTodo(todo) {
    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    todoList.appendChild(newDiv);
  }

}

customElements.define("todo-app", TodoApp);

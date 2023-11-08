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
  <span class="counter">0</span>
  <custom-input></custom-input>
  <div class="todo-list"></div>
</div>

`;

class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.todos = this.getTodos();
    this.counter = this.todos.length;
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    template.querySelector('.counter').textContent = this.counter;
    this.shadowRoot.appendChild(template);

    this.drawPendingTodos();

    const customInput = this.shadowRoot.querySelector('custom-input');
    customInput.addEventListener('submit', (event) => {
      this.addTodo(event.detail);
    })
  }

  addTodo(todo) {
    this.todos.push(todo);
    const counter = this.shadowRoot.querySelector('.counter');
    counter.textContent = ++this.counter;

    this.addListItem(todo);
    
    localStorage.setItem('todos', this.todos);
  }

  getTodos() {
    const todosAsString = localStorage.getItem("todos");
    let todos = [];

    if (todosAsString) {
      todos = todosAsString.split(',');
    }

    return todos;

    // return todosAsString ? todosAsString.split(',') : [];
  }

  drawPendingTodos() {
    this.todos.forEach(todo => { this.addListItem (todo)});
  }

  addListItem(todo) {
    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    const listItem = newDiv.querySelector('list-item');
    listItem.addEventListener('onItemRemoved', (event) => {
      const counter = this.shadowRoot.querySelector('.counter');
      counter.textContent = --this.counter;
      this.todos = this.todos.filter(todo => todo !== event.detail);
      localStorage.setItem('todos', this.todos);
    })

    todoList.appendChild(newDiv);
  }

}

customElements.define("todo-app", TodoApp);

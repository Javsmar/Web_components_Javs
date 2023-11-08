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
    this.todos = this.getTodosFromLocalstorage();
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
    const id = Date.now().toString();
    this.todos.push({content: todo, id: id, isCompleted: false });
    this.incrementCounter()

    this.addListItem({content: todo, id: id});
    
    this.saveTodosInLocalstorage(this.todos);
  }

  drawPendingTodos() {
    this.todos.forEach(todo => { this.addListItem(todo)});
  }

  addListItem(todo) {
    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<list-item id="${todo.id}" content="${todo.content}"></list-item>`;

    const listItem = newDiv.querySelector('list-item');
    
    listItem.addEventListener('onItemRemoved', (event) => {
      const currentTodo = this.getTodoById(event.detail);
      if (!currentTodo.isCompleted) {
        this.decreaseCounter();
      }
      this.todos = this.todos.filter(todo => todo.id !== event.detail);
      this.saveTodosInLocalstorage(this.todos);
    });

    listItem.addEventListener("onItemCompleted", (event) => {
      const currentTodo = this.getTodoById(event.detail.id)
      currentTodo.isCompleted = event.detail.checked;
      
      if (event.detail.checked) {
        this.decreaseCounter();
      } else {
        this.incrementCounter();
      }

      this.saveTodosInLocalstorage(this.todos);
    })

    todoList.appendChild(newDiv);
  }

  saveTodosInLocalstorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  getTodosFromLocalstorage() {
    const todosAsString = localStorage.getItem("todos");
    let todos = [];

    if (todosAsString) {
      todos = JSON.parse(todosAsString);
    }

    return todos;
  }

  incrementCounter() {
    const counter = this.shadowRoot.querySelector('.counter');
    counter.textContent = ++this.counter;
  }

  decreaseCounter() {
    const counter = this.shadowRoot.querySelector('.counter');
    counter.textContent = this.counter === 0 ? this.counter : --this.counter;
  }

  getTodoById(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    return this.todos[index];
  }

}

customElements.define("todo-app", TodoApp);

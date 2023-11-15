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

// Importar componentes personalizados 'custom-input' y 'list-item'
import './custom-input.js';
import './list-item.js';

// Crear un template para el componente 'TodoApp'
const templateElement = document.createElement("template");

// Definir la estructura interna del componente, incluyendo estilos CSS
templateElement.innerHTML = `
<style>
    /* Estilos CSS pueden ser agregados aquí si es necesario */
</style>

<div class="todo-app-wrapper">
    <span class="counter">0</span>
    <custom-input></custom-input>
    <div class="todo-list"></div>
</div>
`;

// Definición de la clase 'TodoApp' que extiende HTMLElement
class TodoApp extends HTMLElement {
    constructor() {
        super();

<<<<<<< HEAD
        // Crear el Shadow DOM para el componente
        this.attachShadow({ mode: "open" });

        // Inicializar el contador de todos pendientes
        this.counter = 0;
    }

    // Método que se llama cuando el componente se conecta al DOM
    connectedCallback() {
        // Clonar el contenido del template
        const template = templateElement.content.cloneNode(true);
        this.shadowRoot.appendChild(template);

        // Obtener el componente 'custom-input' y escuchar el evento 'submit'
        const customInput = this.shadowRoot.querySelector('custom-input');
        customInput.addEventListener('submit', (event) => {
            this.addTodo(event.detail);
        })
    }

    // Método para agregar un nuevo todo a la lista
    addTodo(todo) {
      // Obtener el elemento que muestra el contador de tareas pendientes
      const counter = this.shadowRoot.querySelector('.counter');
  
      // Incrementar el contador y actualizar el texto
      counter.textContent = ++this.counter;
  
      // Obtener el contenedor de la lista de tareas
      const todoList = this.shadowRoot.querySelector('.todo-list');
  
      // Crear un nuevo elemento 'div' para contener la tarea
      const newDiv = document.createElement('div');
  
      // Crear la estructura HTML para la tarea utilizando el componente 'list-item'
      newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;
  
      // Obtener la instancia del componente 'list-item' recién creada
      const listItem = newDiv.querySelector('list-item');
  
      // Agregar un escuchador de evento para detectar cuando la tarea se elimina
      listItem.addEventListener('onItemRemoved', () => {
          // Decrementar el contador y actualizar el texto cuando una tarea se elimina
          counter.textContent = --this.counter;
      });
  
      // Agregar el nuevo elemento 'div' con la tarea a la lista de tareas
      todoList.appendChild(newDiv);
  }
  
=======
    this.attachShadow({ mode: "open" });
    this.todos = this.getTodosFromLocalstorage();
    this.counter = this.todos.filter(todo => !todo.isCompleted).length;
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

    this.addListItem({content: todo, id: id, isCompleted: false });
    
    this.saveTodosInLocalstorage(this.todos);
  }

  drawPendingTodos() {
    this.todos.forEach(todo => { this.addListItem(todo)});
  }

  addListItem(todo) {
    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<list-item id="${todo.id}" content="${todo.content}" ${todo.isCompleted && 'isCompleted'}></list-item>`;

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

>>>>>>> 28c5f278c27f2f83cc393a9542ff8b89d9597583
}

// Registrar el componente personalizado 'todo-app'
customElements.define("todo-app", TodoApp);


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
  
}

// Registrar el componente personalizado 'todo-app'
customElements.define("todo-app", TodoApp);


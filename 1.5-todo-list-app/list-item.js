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

// Crear un template (plantilla) para el componente
const templateElement = document.createElement("template");

// Definir la estructura interna del componente, incluyendo estilos CSS
templateElement.innerHTML = `
<style>
    /* Estilos CSS pueden ser agregados aquí si es necesario */
</style>

<div class="list-item-wrapper">
    <span></span>
    <button></button>
</div>
`;

// Definición de la clase 'ListItem' que extiende HTMLElement
class ListItem extends HTMLElement {
    constructor() {
        super();

        // Crear el Shadow DOM para el componente
        this.attachShadow({ mode: "open" });

        // Leer atributos personalizados o establecer valores predeterminados
        this.content = this.getAttribute('content') || 'Estudiar programación';
        this.buttonLabel = this.getAttribute('buttonLabel') || '❌';
    }

    // Método que se llama cuando el componente se conecta al DOM
    connectedCallback() {
        // Clonar el contenido del template
        const template = templateElement.content.cloneNode(true);

        // Configurar el texto y etiqueta del botón con valores de atributos
        template.querySelector('span').textContent = this.content;
        template.querySelector('button').textContent = this.buttonLabel;

        // Agregar el contenido clonado al Shadow DOM
        this.shadowRoot.appendChild(template);

        // Agregar un evento de clic al botón para eliminar el elemento
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', () => {
            // Disparar un evento de borrado personalizado
            const event = new CustomEvent("onItemRemoved");
            this.dispatchEvent(event);
            // Eliminar el elemento del DOM
            this.remove();
        });
    }
}

// Registrar el componente personalizado 'list-item'
customElements.define("list-item", ListItem);

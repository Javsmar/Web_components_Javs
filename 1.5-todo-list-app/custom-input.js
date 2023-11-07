// Crear un template para el componente
const templateElement = document.createElement("template");

// Definir el contenido del template, que incluye estilos CSS y la estructura HTML del componente
templateElement.innerHTML = `
<style>
  /* Estilos CSS para el botón */
  button {
    color: var(--custom-input-button-color, lightblue);
  }

  /* Estilos CSS para el campo de entrada */
  input {
    border-color: var(--custom-input-input-border-color, lightblue);
  }
</style>

<div class="custom-input-wrapper">
  <!-- Campo de entrada de texto -->
  <input type="text">
  <!-- Botón para agregar -->
  <button></button>
</div>
`;

// Definición de la clase CustomInput que extiende HTMLElement
class CustomInput extends HTMLElement {
  constructor() {
    super();

    // Crear el Shadow DOM para el componente
    this.attachShadow({ mode: "open" });

    // Leer atributos personalizados o establecer valores predeterminados
    this.type = this.getAttribute('type') || 'text';
    this.placeholder = this.getAttribute('placeholder') || 'Write a task';
    this.buttonLabel = this.getAttribute('buttonLabel') || 'Add';
  }

  // Método que se llama cuando el componente se conecta al DOM
  connectedCallback() {
    // Clonar el contenido del template
    const template = templateElement.content.cloneNode(true);

    // Configurar el campo de entrada con el tipo y el marcador de posición
    const input = template.querySelector('input');
    input.setAttribute('type', this.type);
    input.setAttribute('placeholder', this.placeholder);

    // Configurar el botón con la etiqueta
    const button = template.querySelector('button');
    button.textContent = this.buttonLabel;

    // Agregar un evento de clic al botón
    button.addEventListener('click', () => {
      this.onButtonClicked();
    });

    // Agregar el contenido clonado al Shadow DOM
    this.shadowRoot.appendChild(template);
  }

  // Método que se llama cuando se hace clic en el botón
  onButtonClicked() {
    const input = this.shadowRoot.querySelector('input');
    const inputValue = input.value;

    // Si el campo de entrada no está vacío, disparar un evento "submit" con el valor
    if (inputValue !== '') {
      const event = new CustomEvent("submit", {
        detail: inputValue
      });

      this.dispatchEvent(event);
      input.value = ''; // Limpiar el campo de entrada
    }
  }
}

// Registrar el componente personalizado 'custom-input'
customElements.define("custom-input", CustomInput);

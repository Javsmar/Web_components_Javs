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

.list-item-wrapper.checked span {
  text-decoration: line-through;
}

</style>

<div class="list-item-wrapper">
  <input type="checkbox">
  <span></span>
  <button></button>
</div>

`;

class ListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.content = this.getAttribute('content') || 'Estudiar programación';
    this.buttonLabel = this.getAttribute('buttonLabel') || '❌';
    this.id = this.getAttribute("id");
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    template.querySelector('span').textContent = this.content;
    template.querySelector('button').textContent = this.buttonLabel;

    this.shadowRoot.appendChild(template);

    this.handleDeleteClick();
    this.handleCheckboxChange();
  }

  handleDeleteClick() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', () => {
      const event = new CustomEvent("onItemRemoved", {
        detail: this.id
      });
      this.dispatchEvent(event);
      this.remove();
    })
  }

  handleCheckboxChange() {
    const checkbox = this.shadowRoot.querySelector('input');
    checkbox.addEventListener('change', (event) => {
      const itemWrapper = this.shadowRoot.querySelector('.list-item-wrapper');
      if (event.target.checked) {
        itemWrapper.classList.add('checked');
      } else {
        itemWrapper.classList.remove('checked');
      }
      const completedEvent = new CustomEvent("onItemCompleted", {
        detail: {
          checked: event.target.checked,
          id: this.id
        }
      });

      this.dispatchEvent(completedEvent);
    })
  }
}

customElements.define("list-item", ListItem);

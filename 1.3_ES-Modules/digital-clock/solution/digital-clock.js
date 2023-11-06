/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
*/

class DigitalClock extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('connectedCalback');

    setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
  
      this.innerHTML = `<span>${hours} : ${minutes} : ${seconds}</span>`;
    }, 1000);
    
  }
}

window.customElements.define('digital-clock', DigitalClock);

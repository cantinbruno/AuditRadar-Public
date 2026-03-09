class SecureBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="protectedContent">
          <navigation-bar></navigation-bar>
      </section>
    `;
  }
}

customElements.define("secure-box", SecureBox);

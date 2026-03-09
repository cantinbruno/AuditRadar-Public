class SecureBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="protectedContent">
          <navigation-bar></navigation-bar>
          <main-db></main-db>
      </section>
    `;
  }
}

customElements.define("secure-box", SecureBox);

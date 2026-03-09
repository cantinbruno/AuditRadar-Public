class SecureBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="protectedContent">
          <navigation-bar></navigation-bar>
          <main></main>
      </section>
    `;
  }
}

customElements.define("secure-box", SecureBox);

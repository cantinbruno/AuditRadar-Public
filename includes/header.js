class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a href="/" class="logo">
           <img src="/img/logo.png" alt="WaveTools">
        </a>
      </header>
    `;
  }
}

customElements.define("site-header", SiteHeader);

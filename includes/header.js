class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a href="https://www/wavetools.fr" class="logo">
           <img src="/img/logo.png" alt="WaveTools" class="logo">
        </a>
      </header>
    `;
  }
}

customElements.define("site-header", SiteHeader);

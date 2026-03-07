class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <!-- Le header est actuellement vide -->
      </header>
    `;
  }
}

customElements.define("site-header", SiteHeader);

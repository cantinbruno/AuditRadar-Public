class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div class="site-footer__brand">
            <strong>Audit Radar</strong>
            <span class="site-footer__muted">© ${year} WaveTools</span>
          </div>

          <nav class="site-footer__links" aria-label="Liens de bas de page">
            <a href="/mentions-legales.html">Mentions légales</a>
            <a href="/confidentialite.html">Confidentialité</a>
            <a href="/contact.html">Contact</a>
          </nav>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);

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
        </div>
      </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);

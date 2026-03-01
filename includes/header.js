class SiteHeader extends HTMLElement {
  connectedCallback() {
    const path = (window.location.pathname || "").toLowerCase();

    const isActive = (filename) =>
      path.endsWith("/" + filename) || path.endsWith(filename) || (filename === "index.html" && (path.endsWith("/") || path.endsWith("/index.html")));

    this.innerHTML = `
      <header class="site-header">
        <div class="site-header__inner">
          <a class="site-logo" href="/index.html" aria-label="Accueil Audit Radar">
            Audit Radar
          </a>

          <nav class="site-nav" aria-label="Navigation principale">
            <a class="site-nav__link ${isActive("index.html") ? "is-active" : ""}" href="/index.html">Accueil</a>
            <a class="site-nav__link ${isActive("audit.html") ? "is-active" : ""}" href="/audit.html">Audit</a>
            <a class="site-nav__link ${isActive("contact.html") ? "is-active" : ""}" href="/contact.html">Contact</a>
          </nav>

          <button class="site-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false">
            ☰
          </button>
        </div>
      </header>
    `;

    // Burger menu (mobile)
    const burger = this.querySelector(".site-burger");
    const nav = this.querySelector(".site-nav");

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    };

    burger?.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      setOpen(open);
    });

    // Fermer le menu quand on clique un lien (mobile)
    nav?.addEventListener("click", (e) => {
      if (e.target?.closest("a")) setOpen(false);
    });
  }
}

customElements.define("site-header", SiteHeader);

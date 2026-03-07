class SiteHead extends HTMLElement {
  connectedCallback() {
    document.head.innerHTML = `
      <link rel="icon" href="/img/favicon.ico" sizes="any">
      <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Audit Radar</title>
      <meta name="description" content="Audit Radar : Auditer votre système depuis internet en un clic.">
      <meta name="robots" content="index, follow">
      <meta http-equiv="content-language" content="fr">
      <meta name="author" content="Audit Radar">
    `;
  }
}

customElements.define("site-head", SiteHead);

class SiteHead extends HTMLElement {
  connectedCallback() {

    const title = this.getAttribute("title") || "Audit Radar";
    const description = this.getAttribute("description") 
      || "Audit Radar : Auditer votre système depuis internet en un clique.";

    document.head.innerHTML = `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>${title}</title>

      <meta name="description" content="${description}">
      <meta name="robots" content="index, follow">
      <meta http-equiv="content-language" content="fr">
      <meta name="author" content="Audit Radar">

      <script src="/includes/header.js" defer></script>
      <script src="/includes/footer.js" defer></script>
      <script src="/includes/auth-box.js" defer></script>
      <script src="/includes/secure-box.js" defer></script>
      <script src="/includes/auth.js" defer></script>
  
      <link rel="stylesheet" href="/includes/styles.css">
      <link rel="stylesheet" href="/includes/auth.css">
      
    `;
  }
}

customElements.define("site-head", SiteHead);

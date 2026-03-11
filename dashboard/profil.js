class Profil extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <!-- Contenu principal de la page -->
    <div class="content">
        <div id="profileData"></div>  <!-- Élément où les données seront affichées -->
      </div>
    `;
  }
}

customElements.define('profil-db', Profil);
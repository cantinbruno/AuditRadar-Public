class Audit extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div id="modal" class="modal">
        <div class="modal-content">
            <span id="closeModal" class="close">&times;</span>
            <h2>Fenêtre d'Audit</h2>
            <p>Voici le contenu de l'audit...</p>
        </div>
    </div>
    `;
  }
}

customElements.define('audit-db', Audit);
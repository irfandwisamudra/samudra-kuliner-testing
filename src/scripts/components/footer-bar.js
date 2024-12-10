class FooterBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
    .container {
      margin: 0 auto;
      max-width: 1320px;
      padding: 1rem;

      @media (max-width: 992px) {
        max-width: 720px;
      }

      @media (max-width: 768px) {
        max-width: 540px;
      }

      @media (max-width: 576px) {
        padding: 0 5%;
      }
    }

    footer {
      background-color: #ccd2f3;
      color: #0080ff;
      text-align: center;
      border-top: 2px solid #0080ff;
    }

    footer .footer-content {
      display: flex;
      justify-content: space-between;
    }

    @media (max-width: 768px) {
      footer .footer-content {
        flex-direction: column;
      }

      footer .footer-content p {
        margin: 0;
      }
    }

    footer .footer-content p {
      font-size: 1rem;
      line-height: 2.75rem;
    }

    footer .footer-content p a {
      color: #4335a7;
      text-decoration: none;
      font-weight: bold;
      padding: 0.9rem 0;
    }

    footer .footer-content p a:hover {
      text-decoration: underline;
    }
    `;
  }

  connectedCallback() {
    this._copyright = this.getAttribute('copyright') || 'Copyright is not defined';
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <footer>
        <div class="container footer-content">
          <p>
            Copyright © 2024 - 
            <a href="./index.html">${this._copyright}</a>
          </p>
          <p>
            Developed by
            <a
              href="https://irfandwisamudra.netlify.app"
              target="_blank"
              rel="noreferrer"
            >
              Irfan Dwi Samudra
            </a>
          </p>
        </div>
      </footer>
    `;
    this._shadowRoot.appendChild(this._style);
    this._updateStyle();
  }
}

customElements.define('footer-bar', FooterBar);

class CulinaryTips extends HTMLElement {
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

    .tips {
      padding: 6rem 1rem;
      text-align: center;
    }

    .tips .tips-title {
      font-size: 2rem;
      color: #0080ff;
      margin-bottom: 1.5rem;
    }

    .tips .tips-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .tips .tips-content .tips-item {
      background: #ccd2f3;
      border: 1px solid #0080ff;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .tips .tips-content .tips-item .tips-img {
      width: 100px;
      height: 100px;
      margin-bottom: 1rem;
    }

    .tips .tips-content .tips-item .tips-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .tips .tips-content .tips-item h3 {
      font-size: 1.2rem;
      color: #4335a7;
      margin-bottom: 0.5rem;
    }

    .tips .tips-content .tips-item p {
      font-size: 0.9rem;
      color: #0080ff;
      line-height: 1.5;
    }
    `;
  }

  connectedCallback() {
    this._title = this.getAttribute('title') || 'Title is not defined';
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <section class="tips container">
        <h2 class="tips-title">${this._title}</h2>
        <div class="tips-content">
          <div class="tips-item">
            <div class="tips-img">
              <img src="./images/explore-local.png" alt="Explore Local" />
            </div>
            <h3>Eksplor Kuliner Lokal</h3>
            <p>
              Jangan lewatkan kesempatan mencicipi hidangan khas daerah saat
              berkunjung ke suatu tempat. Setiap kota memiliki cita rasa unik yang
              patut dicoba.
            </p>
          </div>
          <div class="tips-item">
            <div class="tips-img">
              <img src="./images/try-new-flavors.png" alt="Try New Flavors" />
            </div>
            <h3>Coba Rasa Baru</h3>
            <p>
              Beranikan diri mencoba rasa baru dan makanan yang belum pernah
              dicoba sebelumnya. Siapa tahu kamu menemukan makanan favorit baru!
            </p>
          </div>
          <div class="tips-item">
            <div class="tips-img">
              <img src="./images/food-reviews.png" alt="Read Reviews" />
            </div>
            <h3>Baca Ulasan</h3>
            <p>
              Sebelum memilih restoran, baca ulasan dari pengunjung lain untuk
              mendapatkan gambaran pengalaman mereka dan memilih tempat terbaik.
            </p>
          </div>
        </div>
      </section>
    `;
    this._shadowRoot.appendChild(this._style);
    this._updateStyle();
  }
}

customElements.define('culinary-tips', CulinaryTips);

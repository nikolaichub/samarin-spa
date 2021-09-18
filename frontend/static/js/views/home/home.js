import Template from '../template.js';

export default class extends Template {
  constructor(params) {
    super(params);
    this.setTitle('Home');
  }

  async getHtml() {
    return `
    <div id="scrollContainer" class="scrollContainer">
    <main id="main" class="main">
      <div id="mainWrapper" class="main__wrapper">
        <div id="particles" class="particles"></div>
        <div class="pictures__wrapper">
          <div id="pictures" class="pictures"></div>
        </div>
        <div id="home" class="home__wrapper">
          <div class="home">
            <div class="home__content">
              <div class="home__logo">
                <span>ANDREY</span><br />
                <span>SAMARIN</span>
              </div>
              <div class="home__about">
                <div class="about__item">
                  <span class="about__text">
                    Web gallery of Andrey Samarin —
                  </span>
                </div>
                <div class="about__item">
                  <span class="about__text">the place where all</span>
                </div>
                <div class="about__item">
                  <span class="about__text">works of his are</span>
                </div>
                <div class="about__item">
                  <span class="about__text">collected</span>
                </div>
              </div>
              <div class="home__button">
                <button id="homeButton" class="home__button-item">
                  <span>Take a Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="gallery" class="gallery"></div>
      </div>
      <div class="block"></div>
    </main>
  </div>
    `;
  }

  async getJs() {
    return '/static/js/views/home/app.js';
  }
}

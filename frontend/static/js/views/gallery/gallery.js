import Template from '../template.js';

export default class extends Template {
  constructor(params) {
    super(params);
    this.setTitle('Gallery');
  }

  async getHtml() {
    return `
    <div id="scrollContainer" class="scrollContainer">
      <main id="main" class="main">
          <div id="mainWrapper" class="main__wrapper">
              <div id="particles" class="particles"></div>
              <div id="gallery" class="gallery"></div>
          </div>
          <div class="block"></div>
      </main>
      </div>
    `;
  }

  async getJs() {
    return '/static/js/views/gallery/app.js';
  }
}

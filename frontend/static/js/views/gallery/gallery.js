import Template from '../template.js';

export default class extends Template {
  constructor(params) {
    super(params);
    this.setTitle('Gallery');
  }

  async getHtml() {
    return `
      <h1>Gallery Page</h1>
      <ul>
        <li><a href="/gallery/1" class="nav__link" data-link>Gallery 1</a></li>
        <li><a href="/gallery/2" class="nav__link" data-link>Gallery 2</a></li>
        <li><a href="/gallery/3" class="nav__link" data-link>Gallery 3</a></li>
        <li><a href="/gallery/4" class="nav__link" data-link>Gallery 4</a></li>
      </ul>
    `;
  }

  async getJs() {
    return '/static/js/views/gallery/app.js';
  }
}

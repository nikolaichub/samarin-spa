import Template from '../template.js';

export default class extends Template {
  constructor(params) {
    super(params);
    this.setTitle('About');
  }

  async getHtml() {
    return `
      <h1 id="settings_text">About Page</h1>
      <ul>
        <li>Settings</li>
        <li>Settings</li>
      </ul>
    `;
  }

  async getJs() {
    return '/static/js/views/about/app.js';
  }
}

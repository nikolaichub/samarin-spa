import Template from '../template.js';

export default class extends Template {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle('Viewing Post');
  }

  async getHtml() {
    return `
            <h1>Post</h1>
            <p>You are viewing post #${this.postId}.</p>
        `;
  }

  async getJs() {
    return '/static/js/views/galleryview/app.js';
  }
}

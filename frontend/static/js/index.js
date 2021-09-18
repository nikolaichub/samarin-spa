/* eslint-disable new-cap */
import Home from './views/home/home.js';
import Gallery from './views/gallery/gallery.js';
import GalleryView from './views/galleryview/galleryview.js';
import About from './views/about/about.js';

const pathToRegex = path =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    result => result[1]
  );

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/gallery', view: Gallery },
    { path: '/gallery/:id', view: GalleryView },
    { path: '/about', view: About },
  ];

  // testing each route for potential match
  const potentialMatches = routes.map(route => ({
    route,
    result: location.pathname.match(pathToRegex(route.path)),
  }));

  let match = potentialMatches.find(
    potentialMatch => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  // rendering html
  const view = new match.route.view(getParams(match));
  document.getElementById('app').innerHTML = await view.getHtml();

  // adding scripts
  const addscripts = document.querySelectorAll('.additinalscript');
  if (addscripts.length) {
    for (const addscript of addscripts) {
      document.body.removeChild(addscript);
    }
  }
  const script = document.createElement('script');
  script.src = await view.getJs();
  script.type = 'module';
  script.classList.add('additinalscript');
  document.body.append(script);
};

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const updateSizeSettings = () => {
  const origin = {
    windowWidth: 1920,
    windowHeight: 1080,
    homePaddingRL: 120,
    homePaddingTB: 67,
    homeLogoFont: 192,
    homeAboutFont: 24,
    homeButtonFont: 64,
    headerLinkFont: 18,
  };

  const { clientWidth, clientHeight } = document.documentElement;

  const homePaddingRL =
    (clientWidth * origin.homePaddingRL) / origin.windowWidth;

  const homePaddingTB = (clientHeight / clientWidth) * homePaddingRL;
  const homeLogoFont = (clientWidth * origin.homeLogoFont) / origin.windowWidth;
  const homeAboutFont =
    (clientWidth * origin.homeAboutFont) / origin.windowWidth;
  const homeButtonFont =
    (clientWidth * origin.homeButtonFont) / origin.windowWidth;
  const headerLinkFont =
    (clientWidth * origin.headerLinkFont) / origin.windowWidth;

  document.body.style.setProperty('--home-margin-rl', `${homePaddingRL}px`);
  document.body.style.setProperty('--home-margin-tb', `${homePaddingTB}px`);
  document.body.style.setProperty('--home-logo-font', `${homeLogoFont}px`);
  document.body.style.setProperty('--home-about-font', `${homeAboutFont}px`);
  document.body.style.setProperty('--home-button-font', `${homeButtonFont}px`);
  document.body.style.setProperty('--nav-link-font', `${headerLinkFont}px`);
};

window.addEventListener('popstate', router);
window.addEventListener('load', updateSizeSettings);
window.addEventListener('resize', updateSizeSettings);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

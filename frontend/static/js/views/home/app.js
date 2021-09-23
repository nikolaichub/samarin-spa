import { getRandomIntInclusive } from '../../utils/random.js';
import { placeByRandom } from '../../utils/place.js';

// Locomotive scroll settings
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector('#scrollContainer'),
//   smooth: true,
// });

// locoScroll.on('scroll', ScrollTrigger.update);

// ScrollTrigger.scrollerProxy('#scrollContainer', {
//   scrollTop(value) {
//     return arguments.length
//       ? locoScroll.scrollTo(value, 0, 0)
//       : locoScroll.scroll.instance.scroll.y;
//   },
//   getBoundingClientRect() {
//     return {
//       top: 0,
//       left: 0,
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   },
//   pinType: document.querySelector('#scrollContainer').style.transform
//     ? 'transform'
//     : 'fixed',
// });

const { clientWidth, clientHeight } = document.documentElement;

// PARTICLES
const canvas = document.getElementById('particles');
canvas.style.width = `${clientWidth}px`;
canvas.style.height = `${clientHeight}px`;
const canvasWidth = canvas.getBoundingClientRect().width;

const canvasSections = parseInt(canvasWidth / clientWidth);

let left = 0;
let right = 0;
// let particleCounter = 1;
for (let i = 0; i < canvasSections; i++) {
  const top = 0;
  const bottom = clientWidth;
  const sectionSize = 512;

  right += clientWidth;

  const { posX, posY, w, h } = placeByRandom(
    left,
    right,
    top,
    bottom,
    sectionSize,
    [],
    true,
    false
  );

  const particle = document.createElement('div');
  const rotateBy = getRandomIntInclusive(-360, 360);
  // const opacity = getRandom(0.1, 0.25);
  particle.classList.add('particle__wrapper');
  particle.style.width = `${w}px`;
  particle.style.height = `${h}px`;
  particle.style.left = `${posX}px`;
  particle.style.top = `${posY}px`;
  particle.style.opacity = 0.25 / 2;
  particle.style.transform = `rotate(${rotateBy}deg) scale(1.5)`;

  const img = new Image();
  const particleCounter = getRandomIntInclusive(1, 12);
  img.src = `static/Images/Svg/Frame${particleCounter}.svg`;
  particle.appendChild(img);

  canvas.appendChild(particle);

  left += clientWidth;
  // particleCounter += 1;
}

// PICTURES PREVIEW
const pictures = document.getElementById('pictures');
const picturesPos = [];

function renderHomePicture() {
  const timeout = getRandomIntInclusive(5000, 10000);
  const { posX, posY, w, h } = placeByRandom(
    0,
    clientWidth,
    0,
    clientHeight,
    200,
    picturesPos
  );

  const picture = document.createElement('div');
  picture.classList.add('picture__item');
  picture.style.width = `${w}px`;
  picture.style.height = `${h}px`;
  picture.style.left = `${posX}px`;
  picture.style.top = `${posY}px`;
  picture.style.animationDuration = `${timeout}ms`;
  // picture.style.setProperty('--anim', timeout);

  const img = new Image();
  const imgIdx = getRandomIntInclusive(1, 30);
  img.src = `static/Images/Jpg/image${imgIdx}.jpg`;
  picture.appendChild(img);

  pictures.appendChild(picture);
  return new Promise(resolve => {
    setTimeout(() => {
      pictures.removeChild(picture);
      picturesPos.forEach((picPos, i) => {
        if (picPos.posX === posX && picPos.posY === posY) {
          picturesPos.splice(i, 1);
        }
      });
      resolve(true);
    }, timeout);
  });
}

async function updateHomePicture() {
  const elementA = await renderHomePicture();
  const timeout = getRandomIntInclusive(2500, 5000);
  setTimeout(updateHomePicture, timeout);
}

for (let i = 0; i < 3; i++) {
  updateHomePicture();
}

// ANIMATION

// Text animation
CustomEase.create('textappers', 'M0,0 C0.5,0 0,1 1,1');
const textAnimation = gsap.timeline({
  // scrollTrigger: {
  //   trigger: '#main',
  //   start: '100%',
  //   markers: true,
  //   scroller: '#scrollContainer',
  // },
});
textAnimation.from('.about__text, .nav__text', {
  translateY: '350%',
  duration: 1.25,
  stagger: 0.115,
  ease: 'textappers',
  delay: 0.25,
  rotate: -15,
});

// Locomotive scroll settings
// ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
// ScrollTrigger.addEventListener('popstate', () => locoScroll.update());
// ScrollTrigger.addEventListener('resize', () => locoScroll.update());
// ScrollTrigger.refresh();

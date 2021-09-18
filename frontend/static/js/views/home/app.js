// Locomotive scroll settings
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('#scrollContainer'),
  smooth: true,
});

locoScroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#scrollContainer', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector('#scrollContainer').style.transform
    ? 'transform'
    : 'fixed',
});

const { clientWidth, clientHeight } = document.documentElement;

const body = document.getElementById('body');
const scrollContainer = document.getElementById('scrollContainer');
const home = document.getElementById('home');
const gallery = document.getElementById('gallery');

// доп ффункиця
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function placeByGrid(left, top, right, bottom, figures) {
  const w = (right - left) * getRandom(0.25, 1);
  const h = (bottom - top) * getRandom(0.25, 1);
  const posX = left + (right - left - w) / 2;
  const posY = top + (bottom - top - h) / 2;
  const x = posX - left;
  const y = posY - top;
  const dx = x + w;
  const dy = y + h;

  figures.push({ x, y, dx, dy, w, h });
  return { x, y, dx, dy, w, h };
}

function placeByRandom(
  fromX,
  toX,
  fromY,
  toY,
  size,
  figures,
  borders = true,
  intersec = true
) {
  const w = size + size * getRandom(0, 0.5);
  const h = size + size * getRandom(0, 0.5);
  const posX = getRandomIntInclusive(fromX, toX);
  const posY = getRandomIntInclusive(fromY, toY);
  const x = posX - fromX;
  const y = posY - fromY;
  const dx = posX + w;
  const dy = posY + h;

  if ((dx >= toX || dy >= toY) && borders) {
    return placeByRandom(fromX, toX, fromY, toY, size, figures);
  }

  if (figures.length > 0 && intersec) {
    for (const fig of figures) {
      const hasIntersection = (Amin, Amax, Bmin, Bmax) =>
        !((Amax < Bmin && Amin < Bmax) || (Amin > Bmax && Amax > Bmin));

      const intersectionX = hasIntersection(posX, dx, fig.posX, fig.dx);
      const intersectionY = hasIntersection(posY, dy, fig.posY, fig.dy);

      if (intersectionX && intersectionY) {
        // есть пересечение - генерируем еще раз
        return placeByRandom(fromX, toX, fromY, toY, size, figures);
      }
    }
  }

  figures.push({ x, y, posX, posY, dx, dy, w, h });
  return { x, posX, y, posY, w, h };
}

// gallery blocks rendering

const homeWidth = home.getBoundingClientRect().width;
const homeHeight = home.getBoundingClientRect().height;

const blockPosition = [];
const paintingPos = [];
const blockWidth = clientWidth / 2;
const paintingWidth = 200;

let paintingCounter = 1;

for (let i = 0; i < 30; i++) {
  const galleryBlock = document.createElement('div');
  galleryBlock.classList.add('gallery__block');
  galleryBlock.style.width = `${blockWidth}px`;

  gallery.appendChild(galleryBlock);
  const { left, top, right, bottom, width } =
    galleryBlock.getBoundingClientRect();
  blockPosition.push({ left, top, right, bottom, width });

  for (let j = 0; j < 2; j++) {
    const paintingWrapper = document.createElement('div');
    paintingWrapper.classList.add('painting__wrapper');
    galleryBlock.appendChild(paintingWrapper);

    const t = j % 2 === 0 ? 0 : homeHeight / 2;
    const b = j % 2 === 0 ? bottom / 2 : bottom;

    const { x, y, w, h } = placeByRandom(
      left,
      right,
      t,
      b,
      paintingWidth,
      paintingPos
    );

    const painting = document.createElement('div');
    painting.classList.add('painting');
    painting.style.width = `${w}px`;
    painting.style.height = `${h}px`;
    painting.style.left = `${x}px`;
    painting.style.top = `${y}px`;

    const paintingInfo = document.createElement('div');
    paintingInfo.classList.add('painting__info');
    paintingInfo.style.width = `${w}px`;
    paintingInfo.style.height = `${h}px`;
    paintingInfo.style.left = `${x + w}px`;
    paintingInfo.style.top = `${y}px`;

    paintingInfo.innerHTML = `
    <div class="painting__info-label">Snakes, teleports and slaves</div>
    <div class="painting__info-desc">Acrylic, oil sticks, graphite, ballpoint pen, oil pastel, charcoal and oil on canvas (90x70)</div>`;

    const img = new Image();
    img.src = `static/Images/Jpg/image${paintingCounter}.jpg`;
    console.log(img.width, img.height);
    painting.appendChild(img);

    paintingWrapper.appendChild(painting);
    paintingWrapper.appendChild(paintingInfo);
    paintingCounter += 1;
  }
}

// PARTICLES
const canvas = document.getElementById('particles');
const galleryWidth = gallery.getBoundingClientRect().width;
canvas.style.width = `${clientWidth + galleryWidth}px`;
canvas.style.height = `${homeHeight}px`;
const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;

const canvasSections = parseInt(canvasWidth / homeWidth);

let left = 0;
let right = 0;
// let particleCounter = 1;
for (let i = 0; i < canvasSections; i++) {
  const top = 0;
  const bottom = homeHeight;
  const sectionSize = 512;

  right += homeWidth;

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
  const opacity = getRandom(0.1, 0.25);
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

  left += homeWidth;
  // particleCounter += 1;
}

// PICTURES PREVIEW
const pictures = document.getElementById('pictures');
const picturesPos = [];
const picturesColl = [];

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
  return new Promise((resolve, reject) => {
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

function remove(mes) {
  return () => {
    console.log(mes);
  };
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

const selectedProjects = gsap.timeline({
  scrollTrigger: {
    trigger: '#main',
    start: 'top top',
    end: `+=${galleryWidth - 0}`,
    pin: true,
    scrub: true,
    scroller: '#scrollContainer',
    // markers: true,
  },
});

selectedProjects.to('#mainWrapper', {
  translateX: `-${galleryWidth - 0}px`,
  ease: 'linear',
});

// Locomotive scroll settings
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();

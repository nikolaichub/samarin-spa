import { getRandom, getRandomIntInclusive } from './random.js';

export function placeByGrid(left, top, right, bottom, figures) {
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

export function placeByRandom(
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

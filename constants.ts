/**
 * Game Layout
 */
export const containerWidthMobile = 288; // px

export const containerWidthDesktop = 464; // px

export const tileCountPerDimension = 4;

/**
 * Animations
 */
export const mergeAnimationDuration = 100; // ms

export const moveAnimationDuration = 150; // ms

/**
 * Game setup
 */
export const gameWinTileValue = process.env.NEXT_PUBLIC_WIN_TILE_VALUE || 2048;

export const gameTileImages: { [key: number]: string } = {
  2: "/tiles/snake2.jpg",
  4: "/tiles/dino4.jpg",
  8: "/tiles/frog8.jpg",
  16: "/tiles/ape16.jpg",
  32: "/tiles/boar32.jpg",
  64: "/tiles/whale64.jpg",
  128: "/tiles/chad128.jpg",
  256: "/tiles/piggy256.png",
  512: "/tiles/piggy512.png",
  1024: "/tiles/piggy1024.png",
  2048: "/tiles/piggy2048.png",
};

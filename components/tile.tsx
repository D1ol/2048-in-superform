import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  containerWidthMobile,
  containerWidthDesktop,
  mergeAnimationDuration,
  tileCountPerDimension,
} from "@/constants";
import { Tile as TileProps } from "@/models/tile";
import styles from "@/styles/tile.module.css";
import usePreviousProps from "@/hooks/use-previous-props";

export default function Tile({ position, value }: TileProps) {
  const isWideScreen = useMediaQuery({ minWidth: 512 });
  const containerWidth = isWideScreen
    ? containerWidthDesktop
    : containerWidthMobile;

  const [scale, setScale] = useState(1);
  const previousValue = usePreviousProps<number>(value);
  const hasChanged = previousValue !== value;

  const positionToPixels = (position: number) =>
    (position / tileCountPerDimension) * containerWidth;

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => setScale(1), mergeAnimationDuration);
    }
  }, [hasChanged]);

  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
    zIndex: value,
  };

  const tileImages: { [key: number]: string } = {
    2: "/tiles/Qmbko8efzom6oteaBJabrxX4B3jNNPXCtA84YmM8GSRUNx.jpg",
    4: "/tiles/QmejRG5Ck5v5cQxaMJbtUPkxgjqJZEJrsVxpZDBqPf5gZh.jpg",
    8: "/tiles/QmZVyVaqMWPPs3uCBjXNYgPza7YBteuZMLxmWraVzNnWW2.jpg",
    16: "/tiles/QmZYJUzLLeSKAQQ8JtrEAc5FrHHAzd5CSRVXb37HntUuJi.jpg",
    32: "/tiles/QmNxdcJBdM4t6MxTyiqvHRQcRB6kQ5A9V9j7vAvCTFr1x6.jpg",
    64: "/tiles/QmTz6278QacA39L6mFmCTXPhFXttiShR1Uzp7e1PprAkDW.jpg",
    128: "/tiles/Qmf9qiNN8AnFETGC7oRkBfQTMADnfWPkqCuyK6E3zh9mjv.jpg",
    256: "/tiles/piggy256.png",
    512: "/tiles/piggy512.png",
    1024: "/tiles/piggy1024.png",
    2048: "/tiles/piggy2048.png",
  };

  const tileImage = tileImages[value];

  return (
    <div className={`${styles.tile} ${styles[`tile${value}`]}`} style={style}>
      {tileImage ? (
        <img src={tileImage} alt={`Tile ${value}`}
             className={styles.tileImage} />
      ) : (
        value
      )}
    </div>
  );
}

import {CSSProperties} from "react";

import {usePlayerContext} from "../../shared/context/PlayerContext";

import cls from './Cover.module.css';
import {classNames} from "../../shared/helpers/classNames";

export const Cover = () => {
  const { coverSrc, isPlaying } = usePlayerContext();

  const styles:  CSSProperties = {
    backgroundImage: `url(${coverSrc})`,
  };

  return (
    <div className={classNames(cls.cover, {[cls.playing]: isPlaying}, [])} style={styles} />
  );
};

import {CSSProperties, useEffect, useMemo, useRef} from "react";

import {usePlayerContext} from "../../shared/context/PlayerContext";

import cls from './Cover.module.css';

export const Cover = () => {
  const { coverSrc } = usePlayerContext();

  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (coverRef.current) {
      coverRef.current.className = cls.cover;

      setTimeout(() => {
        if (coverRef.current) {
          coverRef.current.className = `${cls.cover} ${cls.animation}`;
        }
      }, 0);
    }
  }, [coverSrc]);

  const styles:  CSSProperties = useMemo(() => ({
    backgroundImage: `url(${coverSrc})`,
  }), [coverSrc]);

  return (
    <div ref={coverRef} className={cls.cover} style={styles} />
  );
};

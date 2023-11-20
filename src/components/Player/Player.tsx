import {ReactNode} from "react";

import cls from './Player.module.css';

interface PlayerProps {
  panel: ReactNode;
  cover: ReactNode;
}

export const Player = ({panel, cover}: PlayerProps) => {
  return (
    <div className={cls.player}>
      { panel }

      { cover }
    </div>
  );
};

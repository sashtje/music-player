import {MouseEvent} from "react";

import {usePlayerContext} from "../../shared/context/PlayerContext";

import cls from './ProgressBar.module.css';

interface ProgressMouseEvent extends MouseEvent<HTMLDivElement> {
  target: HTMLDivElement,
}

export const ProgressBar = () => {
  const { onSetProgress } = usePlayerContext();

  const handleProgressSet = (e: ProgressMouseEvent) => {
    const {left, width} =  e.target.getBoundingClientRect();
    const clickX = e.clientX - left;

    const newProgressValue = clickX * 100 / width;
    onSetProgress(newProgressValue);
  };

  return (
    <div className={cls.progressBar} onClick={handleProgressSet} />
  );
};

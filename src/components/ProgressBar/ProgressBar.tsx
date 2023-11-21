import {KeyboardEvent, MouseEvent} from "react";

import {usePlayerContext} from "../../shared/context/PlayerContext";

import cls from './ProgressBar.module.css';

interface ProgressMouseEvent extends MouseEvent<HTMLDivElement> {
  target: HTMLDivElement,
}

export const ProgressBar = () => {
  const { onSetProgress, onShiftProgressWithKeyboard } = usePlayerContext();

  const handleProgressSet = (e: ProgressMouseEvent) => {
    const {left, width} =  e.target.getBoundingClientRect();
    const clickX = e.clientX - left;

    const newProgressValue = clickX * 100 / width;
    onSetProgress(newProgressValue);
  };

  const handleProgressChangeWithKeyboard = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'ArrowLeft') {
      onShiftProgressWithKeyboard("left");
    } else if (e.code === 'ArrowRight') {
      onShiftProgressWithKeyboard("right");
    } else {
      return;
    }
  };

  return (
    <div className={cls.progressBar} onClick={handleProgressSet} tabIndex={0} onKeyDown={handleProgressChangeWithKeyboard} aria-label="Track's progress bar" role='slider' />
  );
};

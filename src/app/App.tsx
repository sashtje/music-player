import { Player } from "../components/Player";
import {Panel} from "../components/Panel";
import {Cover} from "../components/Cover";
import {usePlayerContext} from "../shared/context/PlayerContext";
import {classNames} from "../shared/helpers/classNames";

import cls from './App.module.css';

export const App = () => {
  const { isPlaying } = usePlayerContext();

  return (
    <main className={classNames(cls.app, {'playing': isPlaying}, [])}>
      <Player panel={<Panel />} cover={<Cover />} />
    </main>
  );
}

import Card from './components/card/Card';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './styles/index.scss'
import Table from './components/table/Table';
import { useCallback, useState } from 'react';
function App() {
  const [startGame, setStartGame] = useState(true)
  const startGameFnc = useCallback(() => {
    setStartGame(true);
  }, [])

  return (
    <div className="App">
      {!startGame && <div>
        <span>Durak Game</span>
        <button onClick={startGameFnc}>Начать игру</button>
      </div>}
      {startGame && <Table />}
    </div>
  );
}

export default App;

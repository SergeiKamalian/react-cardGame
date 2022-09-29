import Card from './components/card/Card';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './styles/index.scss'
import Table from './components/table/Table';
function App() {

  
  const {allCards} = useSelector((state: RootState) => state.cards)


  return (
    <div className="App">
      {/* {allCards.map((card) => <Card card={card} key={card.id} />)} */}
      <Table />
    </div>
  );
}

export default App;

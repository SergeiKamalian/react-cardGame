import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';

const SectionComputer = () => {
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)

    return (
        <div className='SectionComputer section'>
            {computerCards.map((card) => <Card card={card} key={card.id} isBack={true} />)}
        </div>
    )
}

export default SectionComputer
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';

const SectionComputer = () => {
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)

    return (
        <div className='SectionComputer section'>
            {computerCards.map((card, index) => <Card card={card} key={card.id} isBack={false} index={index} />)}
        </div>
    )
}

export default SectionComputer
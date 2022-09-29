import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';

const SectionUser = () => {
    const { userCards } = useSelector((state: RootState) => state.gameReducer)

    return (
        <div className='SectionUser section'>
            {userCards && userCards.map((card) => <Card card={card} key={card.id} isBack={false} />)}
        </div>
    )
}

export default SectionUser
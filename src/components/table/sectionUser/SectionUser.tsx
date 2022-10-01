import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';

const SectionUser = () => {
    const { userCards } = useSelector((state: RootState) => state.gameReducer);

    // const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    // const dispatch = useDispatch()
    // const setInTableCardsFnc = () => {
    //     const cloneInTableCards = inTableCards;
    //     const arr: ICard[] = new Array;
    //     console.log(1);
    // }

    return (
        <div className='SectionUser section'>
            {userCards && userCards.map((card, index) =>
                // <div className='btnCard' key={card.id} onClick={setInTableCardsFnc}>
                    <Card card={card} isBack={false} index={index}  key={card.id} />
                // </div>
            )}
            <button>Бито</button>
        </div>
    )
}

export default SectionUser
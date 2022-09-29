import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux'
import Card from '../../card/Card';
import { useCallback, useEffect } from 'react'
import { setUserAndCompCards } from '../../../functions/functions';
import { setAllCards, setUserCards } from '../../../redux/features/actions';

const SectionUser = () => {
    const dispatch = useDispatch()
    const { allCards } = useSelector((state: RootState) => state.cards)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)

    const getUSerCards = useCallback(() => {
        const arr = setUserAndCompCards(allCards, gameTrump)
        dispatch(setAllCards(arr.allCards))
        return arr.newArr
    }, [])

    useEffect(() => {
        dispatch(setUserCards(getUSerCards()))
    }, [])


    return (
        <div className='SectionUser section'>
            {userCards && userCards.map((card) => <Card card={card} key={card.id} isBack={false} />)}
        </div>
    )
}

export default SectionUser
import React from 'react'
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Card from '../../card/Card';
import { setAllCards, setComputerCards } from '../../../redux/features/actions';
import { setUserAndCompCards } from '../../../functions/functions';

const SectionComputer = () => {

    const dispatch = useDispatch()
    const { allCards } = useSelector((state: RootState) => state.cards)
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)

    const getUSerCards = useCallback(() => {
        const arr = setUserAndCompCards(allCards, gameTrump)
        dispatch(setAllCards(arr.allCards))
        return arr.newArr
    }, [dispatch])

    useEffect(() => {
        dispatch(setComputerCards(getUSerCards()))
    }, [dispatch])

    return (
        <div className='SectionComputer section'>
            {computerCards.map((card) => <Card card={card} key={card.id} isBack={false} />)}
        </div>
    )
}

export default SectionComputer
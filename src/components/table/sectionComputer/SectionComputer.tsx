import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';
import { useCallback, useEffect, useState } from 'react';
import { ICard } from '../../../model';
import { useDispatch } from 'react-redux';
import { setComputerCards, setInTableCards } from '../../../redux/features/actions';

const SectionComputer = () => {
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)
    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const dispatch = useDispatch()

    const closeCardInTable = () => {
        let cloneCompCards = computerCards;
        inTableCards.forEach((inTableCardArr) => {
            computerCards.map((compCard) => {
                if (inTableCardArr.length === 1 && (inTableCardArr[0].trump === compCard.trump && inTableCardArr[0].value < compCard.value)) {
                    console.log('нашел');
                    inTableCardArr.push(compCard)
                    cloneCompCards = cloneCompCards.filter((cloneCompCard) => cloneCompCard.id !== compCard.id)
                }
            })
        })
        
        setTimeout(() => {
            dispatch(setInTableCards(inTableCards))
            dispatch(setComputerCards(cloneCompCards))
        }, 1000);
    }

    useEffect(() => {
        closeCardInTable()
    }, [userCards])


    return (
        <div className='SectionComputer section'>
            {computerCards.map((card, index) => <Card card={card} key={card.id} isBack={true} index={index} />)}
        </div>
    )
}

export default SectionComputer
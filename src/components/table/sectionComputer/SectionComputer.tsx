import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';
import { useCallback, useEffect, useState } from 'react';
import { ICard } from '../../../model';
import { useDispatch } from 'react-redux';
import { setCompComment, setComputerCards, setComputerState, setInTableCards } from '../../../redux/features/actions';
import { getMinCloseCard } from '../../../functions/functions';

const SectionComputer = () => {
    // const [compComment, setCompComment] = useState(false)
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)
    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const { compComment } = useSelector((state: RootState) => state.inGameReducer)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const dispatch = useDispatch()

    const closeCardInTable = () => {
        let cloneCompCards = computerCards;
        inTableCards.forEach((inTableCardArr) => {
            const closeCards: ICard[] = [];
            computerCards.forEach((compCard) => {
                if (
                    inTableCardArr.length === 1
                    && ((inTableCardArr[0].trump === compCard.trump
                        && inTableCardArr[0].value < compCard.value) || (
                            compCard.trump === gameTrump?.trump
                            && inTableCardArr[0].trump !== gameTrump?.trump) || (
                            compCard.trump === gameTrump?.trump
                            && (inTableCardArr[0].trump === gameTrump?.trump
                                && inTableCardArr[0].value < compCard.value)
                        )
                    )
                ) {
                    closeCards.push(compCard)
                }
            })

            if (closeCards.length) {
                getMinCloseCard(closeCards, gameTrump, inTableCardArr);
                inTableCardArr.push(getMinCloseCard(closeCards, gameTrump, inTableCardArr));
                cloneCompCards = cloneCompCards.filter((cloneCompCard) => cloneCompCard.id !== getMinCloseCard(closeCards, gameTrump, inTableCardArr).id)
            }
        })

        setTimeout(() => {
            dispatch(setInTableCards(inTableCards))
            dispatch(setComputerCards(cloneCompCards))
            if (inTableCards.find((item) => item.length === 1)) {
                dispatch(setComputerState('protecting-no'))
                dispatch(setCompComment(true))
            }
        }, 1000);
    }

    useEffect(() => {
        closeCardInTable()
    }, [userCards])

    return (
        <div className="mainUser">
            <div className='SectionComputer section'>
                {computerCards.map((card, index) => <Card card={card} key={card.id} isBack={true} index={index} />)}
            </div>
            <div className='compComment'> {compComment ? <div>Беру</div> : ''}</div>
        </div>
    )
}

export default SectionComputer
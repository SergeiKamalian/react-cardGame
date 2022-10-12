import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';
import { useCallback, useEffect, useState } from 'react';
import { ICard } from '../../../model';
import { useDispatch } from 'react-redux';
import { setCompComment, setComputerCards, setComputerState, setInTableCards } from '../../../redux/features/actions';
import { attackMinCompCard, getMinCloseCard } from '../../../functions/functions';

const SectionComputer = () => {
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)
    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const { compComment } = useSelector((state: RootState) => state.inGameReducer)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const { computerState } = useSelector((state: RootState) => state.inGameReducer)
    const { userState } = useSelector((state: RootState) => state.inGameReducer)
    const { gameStart } = useSelector((state: RootState) => state.gameReducer)
    const dispatch = useDispatch()

    //* отбивается компютер
    const closeCardInTable = () => {

        if (userState === 'attacking') {
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

                if (inTableCards.find((item) => item.length === 1) && userState === 'attacking') {
                    dispatch(setComputerState('protecting-no'))
                    dispatch(setCompComment(true))
                }
            }, 1000);
        }
    }
    //* нападает компютер
    const attackFromComputer = useCallback(() => {
        if (computerState === 'attacking') {
            const attackCard = attackMinCompCard(computerCards, gameTrump);

            const cloneInTableCards = inTableCards;
            if (!inTableCards.length) {
                const arr: ICard[] = []
                { attackCard && arr.push(attackCard) }

                cloneInTableCards.push(arr)

                const cloneCompCards = computerCards.filter((compCard) => compCard.id !== attackCard?.id);
                console.log(cloneCompCards);

                setTimeout(() => {
                    dispatch(setInTableCards(cloneInTableCards))
                    dispatch(setComputerCards(cloneCompCards))
                }, 1000);
            } else if (inTableCards.length) {

                const cloneInTableCards = inTableCards;
                const cloneComputerCards = computerCards
                console.log(cloneComputerCards);

                cloneInTableCards.forEach((inTableCardArr) => {
                    cloneComputerCards.forEach((compCard) => {
                        if (compCard?.value === inTableCardArr[0]?.value
                            || compCard?.value === inTableCardArr[1]?.value) {

                            if (cloneInTableCards.every((card) => card.length === 2)) {

                                const arr: ICard[] = []
                                console.log(compCard);

                                { compCard && arr.push(compCard) }

                                cloneInTableCards.push(arr)
                                const cloneCompCards = cloneComputerCards.filter((compCardA) => compCardA.id !== compCard?.id);
                                console.log(cloneCompCards);

                                setTimeout(() => {
                                    dispatch(setInTableCards(cloneInTableCards))
                                    dispatch(setComputerCards(cloneCompCards))
                                }, 1000);
                            }
                        }
                    })
                })


            }
        }
    }, [computerState, computerCards, dispatch, gameTrump, inTableCards])

    useEffect(() => {
        closeCardInTable()
    }, [userCards])

    useEffect(() => {
        attackFromComputer();
    }, [userCards, attackFromComputer])

    return (
        <div className="mainUser">
            <div className='SectionComputer section'>
                {computerCards.map((card, index) => <Card card={card} key={card.id} isBack={false} index={index} />)}
            </div>
            <div className='compComment'> {compComment ? <div>Беру</div> : ''}</div>
        </div>
    )
}

export default SectionComputer
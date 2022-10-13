import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';
import { useCallback, useEffect, useState } from 'react';
import { ICard } from '../../../model';
import { useDispatch } from 'react-redux';
import { setBitoCards, setCompComment, setComputerCards, setComputerState, setInTableCards, setUserCards, setUserState } from '../../../redux/features/actions';
import { attackMinCompCard, getMinCloseCard, getNewCards, sortCardsFnc } from '../../../functions/functions';

const SectionComputer = () => {
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)
    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const { compComment } = useSelector((state: RootState) => state.inGameReducer)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const { bitoCards } = useSelector((state: RootState) => state.gameReducer)
    const { computerState } = useSelector((state: RootState) => state.inGameReducer)
    const { userState } = useSelector((state: RootState) => state.inGameReducer)
    const { allCards } = useSelector((state: RootState) => state.cards)
    const dispatch = useDispatch()

    //* отбивается компютер
    const closeCardInTable = () => {

        if (userState === 'attacking') {
            let cloneCompCards = [...computerCards];
            const cloneInTableCards = [...inTableCards]
            cloneInTableCards.forEach((inTableCardArr) => {
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
                dispatch(setInTableCards(cloneInTableCards))
                dispatch(setComputerCards(cloneCompCards))
                console.log('выкинул сейчас');
                
                if (cloneInTableCards.find((item) => item.length === 1) && userState === 'attacking') {
                    dispatch(setComputerState('protecting-no'))
                    dispatch(setCompComment(true))
                }
            }, 1000);
        }
    }


    const bitoCardsFnc = useCallback(() => {
        console.log('бито');
        const cloneInTableCards = [...inTableCards];
        const newCompCards = [...computerCards];
        let newUserCards = [...userCards];
        const newAllCards = allCards;
        const cloneBitoCards = bitoCards;
        cloneInTableCards.forEach((inTable) => {
            console.log(inTable[1]);
            newUserCards = newUserCards.filter((card) => card.id !== inTable[1].id)
            console.log(newUserCards);
            
        })        
        cloneInTableCards.forEach((cloneInTableCard) => {
            cloneInTableCard.forEach((cloneCard) => {
                cloneBitoCards.push(cloneCard)
            })
        })

        if (newUserCards.length < 6) {
            console.log('обновляю юзера');
            const finishUserCards = getNewCards(newUserCards, newAllCards, gameTrump)
            dispatch(setUserCards(sortCardsFnc(finishUserCards)))
        }
        if (computerCards.length < 6) {
            console.log('обновляю компа');

            const finishCompCards = getNewCards(newCompCards, newAllCards, gameTrump)
            dispatch(setComputerCards(sortCardsFnc(finishCompCards)))
        }

        dispatch(setInTableCards([]))
        dispatch(setBitoCards(cloneBitoCards))
    }, [allCards, bitoCards, computerCards, dispatch, gameTrump, inTableCards, userCards])

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
                // console.log(cloneComputerCards);
                const newAttackCards: ICard[][] = []
                cloneInTableCards.forEach((inTableCardArr) => {
                    cloneComputerCards.forEach((compCard) => {
                        if (compCard?.value === inTableCardArr[0]?.value
                            || compCard?.value === inTableCardArr[1]?.value) {

                            if (cloneInTableCards.every((card) => card.length === 2)) {
                                console.log(cloneInTableCards);

                                const arr: ICard[] = []
                                // console.log(compCard);

                                { compCard && arr.push(compCard) }
                                newAttackCards.push(arr)
                            }
                        }
                    })
                })
                console.log(newAttackCards);

                if (newAttackCards.length > 0 && inTableCards.length > 0) {
                    cloneInTableCards.push(newAttackCards[0])
                    const cloneCompCards = cloneComputerCards.filter((compCardA) => compCardA.id !== newAttackCards[0][0]?.id);

                    setTimeout(() => {
                        dispatch(setInTableCards(cloneInTableCards))
                        dispatch(setComputerCards(cloneCompCards))
                    }, 1000);
                } else if (cloneInTableCards.every((card) => card.length === 2) && !newAttackCards.length) {
                    console.log('логика бито от компа');
                    setTimeout(() => {
                        dispatch(setCompComment(true))
                    }, 1000);
                    setTimeout(() => {
                        bitoCardsFnc()
                        dispatch(setCompComment(false))
                        dispatch(setUserState('attacking'))
                        dispatch(setComputerState('protecting-ok'))
                    }, 2000);
                }
            }
        }
    }, [computerState, computerCards, dispatch, gameTrump, inTableCards])

    useEffect(() => {
        closeCardInTable()
    }, [userCards])

    useEffect(() => {
        attackFromComputer();
    }, [attackFromComputer, userCards])

    const compCommentFnc = () => {
        let com = '';
        if (compComment) {
            if (computerState === 'attacking') {
                com = 'Бито'
            } else if (computerState !== 'attacking') {
                com = 'Беру'
            }
        }
        return com
    }

    return (
        <div className="mainUser">
            <div className='SectionComputer section'>
                {computerCards.map((card, index) => <Card card={card} key={card.id} isBack={true} index={index} />)}
            </div>
            {compComment &&
                <div className='compComment'> {<div>{compCommentFnc()}</div>}</div>
            }
        </div>
    )
}

export default SectionComputer
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from '../../card/Card';
import { getNewCards, sortCardsFnc } from '../../../functions/functions';
import { useDispatch } from 'react-redux';
import { setBitoCards, setCompComment, setComputerCards, setComputerState, setInTableCards, setUserCards, setUserState } from '../../../redux/features/actions';

const SectionUser = () => {
    const { userCards } = useSelector((state: RootState) => state.gameReducer);
    const { userState } = useSelector((state: RootState) => state.inGameReducer);
    const { computerState } = useSelector((state: RootState) => state.inGameReducer);
    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer);
    const { computerCards } = useSelector((state: RootState) => state.gameReducer);
    const { allCards } = useSelector((state: RootState) => state.cards);
    const { bitoCards } = useSelector((state: RootState) => state.gameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const dispatch = useDispatch()

    const takeComputer = () => {
        const newCompCards = computerCards;
        const newUserCards = userCards;
        const newAllCards = allCards;

        inTableCards.forEach((inTableCardArr) => {
            inTableCardArr.forEach((inTableCard) => {
                newCompCards.push(inTableCard)
            })
        })
        for (let i = 0; i < newAllCards.length; i++) {
            if (newUserCards.length < 6) {
                const newUserCard = newAllCards.pop()
                newUserCard && newUserCards.push(newUserCard)
            }
        }

        const finishUserCards = getNewCards(newUserCards, newAllCards, gameTrump)


        dispatch(setComputerCards(sortCardsFnc(newCompCards)))
        dispatch(setUserCards(sortCardsFnc(finishUserCards)))
        dispatch(setInTableCards([]))
        dispatch(setComputerState('protecting-ok'))
        dispatch(setCompComment(false))
    }

    const bitoCardsFnc = () => {
        console.log('бито');
        const newCompCards = computerCards;
        const newUserCards = userCards;
        const newAllCards = allCards;
        const cloneInTableCards = inTableCards;
        const cloneBitoCards = bitoCards;
        cloneInTableCards.forEach((cloneInTableCard) => {
            cloneInTableCard.forEach((cloneCard) => {
                cloneBitoCards.push(cloneCard)
            })
        })

        const finishUserCards = getNewCards(newUserCards, newAllCards, gameTrump)
        const finishCompCards = getNewCards(newCompCards, newAllCards, gameTrump)


        dispatch(setInTableCards([]))
        dispatch(setBitoCards(cloneBitoCards))
        dispatch(setUserCards(sortCardsFnc(finishUserCards)))
        dispatch(setComputerCards(sortCardsFnc(finishCompCards)))
    }

    const takeUser = () => {
        const cloneInTableCards = inTableCards;
        const newAllCards = allCards;
        const newCompCards = computerCards;
        const cloneUserCards = userCards
        cloneInTableCards.forEach((cloneInTableCard) => {
            cloneInTableCard.forEach((card) => {
                cloneUserCards.push(card)
            })
        })
        const finishCompCards = getNewCards(newCompCards, newAllCards, gameTrump)
        dispatch(setCompComment(false))
        dispatch(setUserCards(cloneUserCards));
        dispatch(setInTableCards([]));
        dispatch(setComputerCards(finishCompCards))
    }

    const handleClick = () => {
        if (computerState === 'protecting-ok' && userState === 'attacking') {
            if (!inTableCards.find((item) => item.length === 1) && inTableCards.length) {
                bitoCardsFnc()
                dispatch(setUserState('protecting-ok'))
                dispatch(setComputerState('attacking'))
            } else {
                console.log('Подожди');
            }

        } else if (computerState === 'protecting-no' && userState === 'attacking') {
            console.log('логика бери');
            takeComputer()
        } else if (computerState === 'attacking') {
            console.log('Я беру');
            takeUser()
        }
    }

    const userComFnc = () => {
        let com = '';
        if (userState === 'attacking' && computerState === 'protecting-ok') {
            com = 'Бито'
        } else if (userState === 'attacking' && computerState === 'protecting-no') {
            com = 'Бери'
        } else if (userState !== 'attacking') {
            com = 'Беру'
        }
        return com;
    }

    return (
        <div className='mainUser'>
            <div className='SectionUser section'>
                {userCards && userCards.map((card, index) =>
                    <Card card={card} isBack={false} index={index} key={card.id} />
                )}
            </div>
            {inTableCards.length ?
                <button onClick={handleClick}>
                    {userComFnc()}
                </button>
                : ''
            }
        </div>
    )
}

export default SectionUser
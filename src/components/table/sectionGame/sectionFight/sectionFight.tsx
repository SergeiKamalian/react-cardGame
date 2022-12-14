import { useDispatch, useSelector } from 'react-redux'
import { ICard } from '../../../../model'
import { useEffect } from 'react'
import { setClickedCard, setGameWin, setUserCards, setUserClickedCard } from '../../../../redux/features/actions'
import { RootState } from '../../../../redux/store'
const SectionFight = () => {

    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const { userState } = useSelector((state: RootState) => state.inGameReducer)
    const { clickedUserCard } = useSelector((state: RootState) => state.inGameReducer)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const { allCards } = useSelector((state: RootState) => state.cards)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)
    const dispatch = useDispatch()
    const findCard = (card: ICard) => {
        const cloneInTableCards = [...inTableCards];

        if (userState !== 'attacking') {

            cloneInTableCards.map((cardArr) => {
                if (cardArr.length === 1) {
                    dispatch(setClickedCard(card))
                    if (
                        (card.trump === clickedUserCard?.trump && card.value < clickedUserCard?.value) ||
                        gameTrump?.trump === clickedUserCard?.trump
                    ) {
                        cloneInTableCards.forEach((inTableCard) => {
                            if (inTableCard[0].id === card.id) {
                                clickedUserCard && inTableCard.push(clickedUserCard)
                                const cloneUserCards = userCards.filter((userCard) => userCard.id !== clickedUserCard?.id)
                                dispatch(setUserCards(cloneUserCards))
                                dispatch(setUserClickedCard(null))
                                dispatch(setClickedCard(null))
                            }
                        })
                    } else {
                        if (clickedUserCard) {
                            alert('???????????? ????????????????????')
                        } else {
                            alert('???????????? ??????????')
                        }
                    }
                }
            })
        }
    }

    return (
        <div className='sectionFight'>
            {inTableCards.map((cardsArr) =>
                <div className="option" key={cardsArr[0]?.cardName + cardsArr[1]?.cardName}>
                    <img className='Card Cardone'
                        onClick={() => findCard(cardsArr[0])}
                        src={require(`../../../../images/${cardsArr[0]?.cardName}.png`)}
                        style={userState === 'attacking' ? { animationName: 'anim' } : { animationName: 'anim' }}
                    ></img>
                    {cardsArr.length > 1 && <img className='Card Cardtwo'
                        style={userState !== 'attacking' ? { animationName: 'userAnim' } : { animationName: 'compAnim' }}
                        src={require(`../../../../images/${cardsArr[1]?.cardName}.png`)}></img>}
                </div>
            )}
        </div>
    )
}
export default SectionFight
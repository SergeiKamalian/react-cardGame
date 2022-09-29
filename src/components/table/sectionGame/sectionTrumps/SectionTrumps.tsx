import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { useCallback, useEffect } from 'react'
import { setAllCards, setGameTrump } from '../../../../redux/features/actions'
import Card from '../../../card/Card'
import { randomArr } from '../../../../functions/functions'
import { ICard } from '../../../../model'
const SectionTrumps = () => {
    const dispatch = useDispatch()
    const { allCards } = useSelector((state: RootState) => state.cards)
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)

    const selectTrump = useCallback(() => {
        const rand = Math.floor(Math.random() * allCards.length);
        const trumpEl = allCards[rand]
        const allCardsClone: ICard[] = randomArr(allCards)
        allCardsClone.push(trumpEl)
        allCardsClone.splice(rand, 1)
        dispatch(setAllCards(allCardsClone))
        dispatch(setGameTrump(trumpEl))
    }, [])

    useEffect(() => {
        selectTrump()
        console.log(gameTrump);
    }, [])

    return (
        <div className='SectionTrumps'>
            {gameTrump &&
                <Card card={gameTrump} isBack={false} />}
        </div>
    )
}

export default SectionTrumps
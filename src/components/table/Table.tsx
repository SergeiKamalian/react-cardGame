
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useCallback, useEffect } from 'react'
import SectionComputer from './sectionComputer/SectionComputer'
import SectionGame from './sectionGame/SectionGame'
import SectionUser from './sectionUser/SectionUser'
import { setGameTrump } from '../../redux/features/actions'
import { setAllCards } from '../../redux/features/actions'
import { setUserCards } from '../../redux/features/actions'
import { setComputerCards } from '../../redux/features/actions'
import { ICard } from '../../model'
import { randomArr } from '../../functions/functions'

const Table = () => {
  const dispatch = useDispatch()
  const { allCards } = useSelector((state: RootState) => state.cards)


  const getGameTrump = useCallback(() => {
    const rand = Math.floor(Math.random() * allCards.length);
    const gameTrumpEl = allCards[rand]
    allCards.splice(rand, 1)

    dispatch(setGameTrump(gameTrumpEl))
    dispatch(setAllCards(allCards))
  }, [])

  const getCards = useCallback((dispatchValue: string) => {
    const cardsArr: ICard[] = []
    allCards.forEach((card) => {
      if (cardsArr.length < 6) {
        const rand = Math.floor(Math.random() * allCards.length);
        const cardEl = allCards[rand]
        cardsArr.push(cardEl)
        allCards.splice(rand, 1)
        cardsArr.sort(function (a, b) {
          var textA = a.trump.toUpperCase();
          var textB = b.trump.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }
    })
    if (dispatchValue === 'user') {
      dispatch(setUserCards(cardsArr))
      dispatch(setAllCards(allCards))
    } else if (dispatchValue === 'computer') {
      dispatch(setComputerCards(cardsArr))
      dispatch(setAllCards(allCards))
    }
  }, [])

  useEffect(() => {
    getGameTrump()
    getCards('user')
    getCards('computer')
    dispatch(setAllCards(randomArr(allCards)))
  }, [dispatch])




  return (
    <div className='Table'>
      <SectionComputer />
      <SectionGame />
      <SectionUser />
    </div>
  )
}

export default Table
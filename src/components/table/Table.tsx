
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useCallback, useEffect } from 'react'
import SectionComputer from './sectionComputer/SectionComputer'
import SectionGame from './sectionGame/SectionGame'
import SectionUser from './sectionUser/SectionUser'
import { setGameStarter, setGameTrump } from '../../redux/features/actions'
import { setAllCards } from '../../redux/features/actions'
import { setUserCards } from '../../redux/features/actions'
import { setComputerCards } from '../../redux/features/actions'
import { ICard } from '../../model'
import { decideAttacker, randomArr } from '../../functions/functions'

const Table = () => {
  const dispatch = useDispatch();
  const { allCards } = useSelector((state: RootState) => state.cards);
  const { userCards } = useSelector((state: RootState) => state.gameReducer);
  const { computerCards } = useSelector((state: RootState) => state.gameReducer);
  const { gameTrump } = useSelector((state: RootState) => state.gameReducer);

  const getGameTrump = useCallback(() => {
    const rand = Math.floor(Math.random() * allCards.length);
    const gameTrumpEl = allCards[rand]
    allCards.splice(rand, 1)

    dispatch(setGameTrump(gameTrumpEl))
    dispatch(setAllCards(allCards))
  }, [allCards, dispatch])

  const getCards = useCallback((dispatchValue: string) => {
    const cardsArr: ICard[] = []
    allCards.forEach(() => {
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
  }, [allCards, dispatch])

  useEffect(() => {
    getGameTrump()
    getCards('user')
    getCards('computer')
    dispatch(setAllCards(randomArr(allCards)))
  }, [allCards, dispatch, getCards, getGameTrump])

  useEffect(() => {
    dispatch(setGameStarter(decideAttacker(userCards, computerCards, gameTrump)!))
  }, [computerCards, dispatch, gameTrump, userCards])


  return (
    <div className='Table'>
      <SectionComputer />
      <SectionGame />
      <SectionUser />
    </div>
  )
}

export default Table
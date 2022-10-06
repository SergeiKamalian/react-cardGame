import { FC, useEffect } from 'react'
import { ICard, ICardProps } from "../../model"
import '../../images/6-heart.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { setInTableCards, setUserCards } from '../../redux/features/actions'

const Card: FC<ICardProps> = ({ card, isBack }) => {

    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     console.log(card?.cardName);
    // }, [userCards])

    const setInTableCardsFnc = useCallback(() => {
        let cloneInTableCards = inTableCards;
        const arr: ICard[] = [];
        { card && arr.push(card) }
        if (!cloneInTableCards.length ||
            cloneInTableCards.some((cloneCard) => cloneCard[0]?.value === card?.value || cloneCard[1]?.value === card?.value)
        ) {
            cloneInTableCards.push(arr)
            dispatch(setInTableCards(cloneInTableCards))
            const cloneUserCards = userCards.filter((userCard) => userCard.id !== card?.id)
            dispatch(setUserCards(cloneUserCards))
        }else {
            alert('На столе нет карт с таким значением')
        }

    }, [card, inTableCards, dispatch, userCards])
    return (
        <>
            {card && <img className={!isBack ? 'Card pointer' : 'Card'} onClick={!isBack ? setInTableCardsFnc : undefined} src={isBack
                ? require(`../../images/cardBack.png`)
                : require(`../../images/${card?.cardName}.png`)}></img>}
        </>
    )
}

export default Card
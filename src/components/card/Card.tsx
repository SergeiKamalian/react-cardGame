import { FC } from 'react'
import { ICard, ICardProps } from "../../model"
import '../../images/6-heart.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setAllCards, setInTableCards } from '../../redux/features/actions'
import {useCallback} from 'react'

const Card: FC<ICardProps> = ({ card, isBack }) => {

    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const dispatch = useDispatch()
    const setInTableCardsFnc = useCallback(() => {

            const cloneInTableCards = inTableCards;
            const arr: ICard[] = [];
            {card && arr.push(card)}
    }, [card, inTableCards])
    return (
        <>
            {isBack
                ? <img className='Card' src={require(`../../images/cardBack.png`)}></img>
                : <img className='Card pointer' onClick={setInTableCardsFnc} src={require(`../../images/${card!.cardName}.png`)}></img>}
        </>
    )
}

export default Card
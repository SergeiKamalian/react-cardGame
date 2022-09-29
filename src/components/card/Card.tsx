import { useSelector } from "react-redux/es/exports"
import { RootState } from "../../redux/store"
import { FC } from 'react'
import { ICardProps } from "../../model"
import '../../images/6-heart.png'

const Card: FC<ICardProps> = ({ card, isBack }) => {

    return (
        <>
            {isBack
                ? <img className='Card' src={require(`../../images/cardBack.png`)}></img>
                : <img className='Card pointer' src={require(`../../images/${card!.cardName}.png`)}></img>}
        </>

    )
}

export default Card
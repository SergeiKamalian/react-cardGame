import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
const SectionFight = () => {

    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)

    return (
        <div className='sectionFight'>
            {inTableCards.map((cardsArr) =>
                <div className="option" key={cardsArr[0]?.cardName + cardsArr[1]?.cardName}>
                    <img className='Card' src={require(`../../../../images/${cardsArr[0]?.cardName}.png`)}></img>
                    {cardsArr.length > 1 && <img className='Card Cardtwo' src={require(`../../../../images/${cardsArr[1]?.cardName}.png`)}></img>}
                </div>
            )}
        </div>
    )
}
export default SectionFight
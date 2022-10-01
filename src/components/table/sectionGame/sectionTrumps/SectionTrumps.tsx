import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import Card from '../../../card/Card'
const SectionTrumps = () => {
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)

    return (
        <div className='SectionTrumps'>
            {gameTrump &&
                <Card card={gameTrump} isBack={false} index={null} />}
                <img className='Card backCard trumpCard' src={require(`../../../../images/cardBack.png`)}></img>
        </div>
    )
}

export default SectionTrumps
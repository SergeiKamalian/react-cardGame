import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import {useEffect} from 'react'
import Card from '../../../card/Card'
const SectionTrumps = () => {
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const { allCards } = useSelector((state: RootState) => state.cards)
    // console.log(allCards);
    useEffect(() => {
        // console.log(allCards);
        
    }, [allCards])
    return (
        <div className='SectionTrumps'>
            {gameTrump &&
                <Card card={gameTrump} isBack={false} index={null} />}
            {allCards.length > 0 &&
                <div className='Card backCard trumpCard'>
                    <span>{allCards.length + 1} карт</span>
                </div>}
        </div>
    )
}

export default SectionTrumps
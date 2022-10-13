import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { useEffect } from 'react'
const SectionTrumps = () => {
    const { gameTrump } = useSelector((state: RootState) => state.gameReducer)
    const { allCards } = useSelector((state: RootState) => state.cards)
    useEffect(() => {

    }, [allCards])
    return (
        <div className='SectionTrumps'>
            {(gameTrump && allCards.length === 0) &&
                <img
                    src={require(`../../../../images/${gameTrump?.trump}.png`)}
                    className="gameTrumpIcon"
                />
            }
            {(gameTrump && allCards.length >= 1) &&
                <img
                    src={require(`../../../../images/${gameTrump?.cardName}.png`)}
                    className="gameTrumpImg"
                />}
            {(allCards.length > 0 && allCards.length !== 1) &&
                <div className='Card backCard trumpCard'>
                    <span>{allCards.length === 23 ? '24' : allCards.length} карт</span>
                </div>}
        </div>
    )
}

export default SectionTrumps
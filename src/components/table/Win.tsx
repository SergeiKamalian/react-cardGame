import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const Win = () => {
    // const { win } = useSelector((state: RootState) => state.inGameReducer)
    const [win, setWin] = React.useState<string | null>(null)
    const { computerCards } = useSelector((state: RootState) => state.gameReducer)
    const { userCards } = useSelector((state: RootState) => state.gameReducer)
    const { allCards } = useSelector((state: RootState) => state.cards)
    const { inTableCards } = useSelector((state: RootState) => state.inGameReducer)
    const winFnc = () => {
        let winner = '';
        if (!allCards.length) {
            if (!userCards.length) {
                winner = 'user'
            } else if (!computerCards.length) {
                winner = 'computer'
            }
        }
        return winner
    }
    React.useEffect(() => {
        setWin(winFnc())
    }, [userCards, computerCards, inTableCards])

    return (
        <>
            {win &&
                <div className='Win'>
                    {win === 'user' ? <span>ПОБЕЖДАЕТЕ ВЫ</span> : <span>ПОБЕЖДАЕТ СИСТЕМА</span>}
                </div>
            }
        </>
    )
}

export default Win
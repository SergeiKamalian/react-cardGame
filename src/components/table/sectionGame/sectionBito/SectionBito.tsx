import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"

const SectionBito = () => {
    const { bitoCards } = useSelector((state: RootState) => state.gameReducer)
    return (
        <div className='SectionBito'>
            {bitoCards.length &&
                <img src={require(`../../../../images/bitoCards.png`)} />
            }
        </div>
    )
}

export default SectionBito
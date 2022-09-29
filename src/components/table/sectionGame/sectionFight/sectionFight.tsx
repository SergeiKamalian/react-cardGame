import React from 'react'

const SectionFight = () => {
    return (
        <div className='sectionFight'>
            <div className="option">
                <img className='Card' src={require(`../../../../images/Q-spade.png`)}></img>
                <img className='Card Cardtwo' src={require(`../../../../images/A-spade.png`)}></img>
            </div>
            <div className="option">
                <img className='Card' src={require(`../../../../images/Q-spade.png`)}></img>
                <img className='Card Cardtwo' src={require(`../../../../images/A-spade.png`)}></img>
            </div>
        </div>
    )
}

export default SectionFight
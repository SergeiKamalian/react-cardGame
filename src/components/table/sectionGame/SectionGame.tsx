import SectionBito from './sectionBito/SectionBito'
import SectionTrumps from './sectionTrumps/SectionTrumps'
import SectionFight from './sectionFight/sectionFight'

const SectionGame = () => {
  return (
    <div className='SectionGame'>
      <SectionTrumps />
      <SectionFight />
      <SectionBito />
    </div>
  )
}

export default SectionGame
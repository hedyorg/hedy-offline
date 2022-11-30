import { useContext, useState, useEffect } from 'react'
import { TbCheckupList, TbListCheck } from 'react-icons/tb'
import AppContext from '../../app-context'
import InfoPanel from '../../components/info-panel/InfoPanel'
import ResultsPanel from '../../components/results-panel/results-panel'

const RightPanel: React.FC = (props) => {
  const appContext = useContext(AppContext)
  const [panel, setPanel] = useState<'info' | 'results'>('info')

  useEffect(() => {
    if (appContext!.hedy) {
      setPanel('results')
    }
  }, [appContext!.hedy])

  return (
    <div className='flex flex-col gap-6 h-full'>
      <div className={'flex gap-4 pt-6  px-6 pr-12'}>
        <button
          onClick={() => setPanel('info')}
          className={`font-bold flex items-center gap-2 text-neutral-300 text-[18px] tracking-normal px-5 py-2 rounded-3xl ${
            panel === 'info' ? 'bg-[#E1EBFF]' : ''
          } `}
        >
          <TbCheckupList size={24} />
          Instructions
        </button>

        <button
          onClick={() => setPanel('results')}
          className={`font-bold flex items-center gap-2 text-neutral-300 text-[18px] tracking-normal px-5 py-2 rounded-3xl ${
            panel === 'results' ? 'bg-[#E1EBFF]' : ''
          } `}
        >
          <TbListCheck size={24} />
          Results
        </button>
      </div>

      {/* CONTENT */}
      <div className='relative h-full '>
        <div className={panel != 'info' ? 'hidden' : ''}>
          <InfoPanel />
        </div>
        <div className={panel != 'results' ? 'hidden' : 'h-full'}>
          <ResultsPanel />
        </div>
      </div>
    </div>
  )
}
export default RightPanel

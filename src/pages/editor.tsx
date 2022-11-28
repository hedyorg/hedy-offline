import Header from '../components/header/header'
import InfoPanel from '../components/info-panel/InfoPanel'
import CodePanel from '../components/code-panel/code-panel'
import { RefObject, useRef, useState } from 'react'
import AppContext, { LANGUAGES } from '../app-context'
import useResize from '../hooks/useResize'
import { TbCheckupList, TbListCheck } from 'react-icons/tb'
import ResultsPanel from '../components/results-panel/results-panel'
import { useEffect, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

const Editor: React.FC = () => {
  const { lang, adventure, level, levelId } = useLoaderData() as {
    lang: typeof LANGUAGES[number]
    adventure: AdventureType
    level: LevelType
    levelId: string
  }
  const [hedy, setHedy] = useState<string>('')

  return (
    <AppContext.Provider
      value={{
        levelId,
        lang,
        adventure,
        level,
        hedy,
        setHedy,
      }}
    >
      <App />
    </AppContext.Provider>
  )
}

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      <Header />
      <div ref={containerRef} className='w-full flex-1 overflow-hidden'>
        <div className='flex h-full'>
          {/* EDITOR */}
          <div className='flex-1 h-full'>
            <CodePanel />
          </div>

          {/* INFO PANEL */}
          <RightEditor containerRef={containerRef} />
        </div>
      </div>
    </div>
  )
}

const RightEditor: React.FC<{ containerRef: RefObject<HTMLDivElement> }> = (props) => {
  const appContext = useContext(AppContext)
  const buttonRef = useRef<HTMLDivElement>(null)
  const resize = useResize(props.containerRef, buttonRef, true)
  const [panel, setPanel] = useState<'info' | 'results'>('info')

  useEffect(() => {
    if (appContext!.hedy) {
      setPanel('results')
    }
  }, [appContext!.hedy])

  return (
    <div
      style={{ width: resize.distribution ? `${100 - resize.distribution * 100}%` : '50%' }}
      className='relative border-l border-neutral-100/40 h-full'
    >
      <div
        ref={buttonRef}
        className='h-full z-50 cursor-col-resize w-12 absolute left-0 top-0 -translate-x-1/2 '
      />

      <div>
        <div className={'flex gap-4 pt-6 pb-4  px-6 pr-12'}>
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
        <div className='relative overflow-scroll h-full z-10 min-h-full'>
          <div className={panel != 'info' ? 'hidden' : ''}>
            <InfoPanel />
          </div>
          <div className={panel != 'results' ? 'hidden' : ''}>
            <ResultsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor

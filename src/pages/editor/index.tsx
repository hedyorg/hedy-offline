import Header from '../../components/header/header'
import { useRef, useState } from 'react'
import AppContext, { LANGUAGES } from '../../app-context'
import { useLoaderData } from 'react-router-dom'
import RightPanel from './right-panel'
import LeftPanel from './left-panel'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

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
  const container = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  var r = document.querySelector(':root') as HTMLElement

  const onMouseDown = () => {
    r.style.setProperty('--text-selection', 'none')
    setIsMouseDown(true)
  }

  const onMouseUp = () => {
    r.style.setProperty('--text-selection', 'text')
    setIsMouseDown(false)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      animate(x, container.current!.getBoundingClientRect().width - e.clientX)
    }
  }

  const x = useMotionValue(600)

  const width = useTransform(x, (value) => {
    if (x.get() < 500) {
      return 500
    }

    if (container.current) {
      if (x.get() > container.current!.getBoundingClientRect().width - 500) {
        return container.current!.getBoundingClientRect().width - 500
      }
    }

    return value
  })

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className='h-screen flex flex-col overflow-hidden'
    >
      <Header />
      <div ref={container} className='w-full flex-1 overflow-hidden'>
        <div className='flex h-full'>
          <div className='overflow-y-hidden flex-1'>
            <LeftPanel />
          </div>
          <div
            onMouseDown={onMouseDown}
            className={`h-full rounded-lg transition-colors ${
              isMouseDown ? 'bg-neutral-100' : ''
            } hover:bg-neutral-100 cursor-col-resize relative z-50 w-4`}
          >
            <div
              className={`absolute w-full h-full scale-x-[100] z-50 ${
                isMouseDown ? 'block' : 'hidden'
              }`}
            />
          </div>
          <motion.div layout className='overflow-y-auto relative' style={{ width }}>
            <RightPanel />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Editor

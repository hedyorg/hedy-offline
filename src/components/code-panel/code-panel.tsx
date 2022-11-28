import { useContext, useRef, useState } from 'react'
import AppContext from '../../app-context'
import { FiZap } from 'react-icons/fi'
import CodeEditor from '../code-editor/code-editor'

interface CodePanelType {}

const CodePanel: React.FC<CodePanelType> = (props) => {
  const appContext = useContext(AppContext)!
  const [code, setCode] = useState(appContext.level!.start_code)
  const prevCode = useRef<string>('')

  return (
    <div className='w-full h-full relative'>
      <CodeEditor setCode={(code) => setCode(code)} code={code} />
      <button
        onClick={async () => {
          prevCode.current = code
          appContext.setHedy!(code)
        }}
        disabled={code === prevCode.current}
        className={` px-6 group flex items-center gap-2 text-xl tracking-wide font-semibold py-2 absolute bottom-8 right-12 bg-white border disabled:border-neutral-100 disabled:text-neutral-100 border-neutral-300 rounded-lg`}
      >
        <FiZap
          className={`${
            code === prevCode.current ? '' : 'group-hover:fill-[#E6D706] group-hover:text-[#E6D706]'
          } transition-all`}
          size={'24px'}
        />
        <span>Execute</span>
      </button>
    </div>
  )
}

export default CodePanel

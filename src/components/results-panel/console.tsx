import { useContext } from 'react'
import AppContext from '../../app-context'
import ResultsContext from './context'

const Console: React.FC = () => {
  const props = useContext(ResultsContext)!
  const appContext = useContext(AppContext)!

  return (
    <div className='p-4 rounded-xl relative flex gap-6 flex-col bg-gray-100'>
      <div className='space-y-2'>
        <p className='text-neutral-300 mt-4 text-sm font-bold font-mono uppercase'>
          {props.status === 'error' ? 'Error Message' : 'Output'}
        </p>
        <div className=' bg-white p-8 rounded-lg relative'>
          <Code>{props.output}</Code>
        </div>
      </div>

      {props.showInput && (
        <>
          <p className='text-neutral-300 mt-4 text-sm font-bold font-mono uppercase'>User Input</p>
          <div className=' bg-white gap-1 flex flex-col p-8 rounded-lg relative'>
            <p className='font-bold'>Promt: {props.promt.current}</p>
            <UserInput />
          </div>
        </>
      )}

      <div className={`space-y-2 ${props.hasTurtle ? '' : 'hidden'}`}>
        <p className='text-neutral-300 mt-4 text-sm font-bold font-mono uppercase'>
          Turtle Graphics
        </p>
        <div className=' bg-white p-8 rounded-lg relative'>
          <div id='turtlecanvas' className=' aspect-square w-full bg-white rounded-lg relative' />
        </div>
      </div>

      <div className='space-y-2'>
        <p className='text-neutral-300 text-sm font-bold font-mono uppercase'>Code Run</p>
        <div className='bg-white p-8 rounded-lg'>
          <Code>
            {appContext.hedy.split('\n').map((line, i) => {
              const hasError = props.errorLines?.includes(i + 1)

              if (hasError) {
                return (
                  <div className='relative'>
                    <div className='w-[110%] -translate-x-[5%] h-full absolute top-0 left-0 bg-[#FDEAEA] rounded-xl'></div>

                    <p className='relative my-1 py-1'>{line}</p>
                  </div>
                )
              }

              return <p>{line}</p>
            })}
          </Code>
        </div>
      </div>
    </div>
  )
}

const UserInput: React.FC = () => {
  const props = useContext(ResultsContext)!

  return (
    <input
      id='input'
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          props?.onSubmit?.current(e.currentTarget.value)
        }
      }}
      className='font-mono outline-none placeholder:font-mono'
      placeholder='Write input here'
    />
  )
}

const Code: React.FC<{ children: React.ReactNode }> = (props) => {
  return <pre className='font-mono'>{props.children}</pre>
}

export default Console

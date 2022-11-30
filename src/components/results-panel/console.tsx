import { motion } from 'framer-motion'
import { useContext } from 'react'
import ResultsContext from './context'

interface ConsoleType {
  code: string
  output: string
  isError: boolean
  errorLines?: number[]
  onSubmit?: (text: string) => void
  showInput: boolean
}

const Console: React.FC<ConsoleType> = (props) => {
  const context = useContext(ResultsContext)!
  return (
    <div className='p-4 rounded-xl relative flex gap-2 flex-col bg-gray-100'>
      <p className='text-neutral-300 text-sm font-bold font-mono uppercase'>Code Run</p>
      <div className='bg-white  p-8 rounded-lg'>
        <Code>
          {props.code.split('\n').map((line, i) => {
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
      <p className='text-neutral-300 mt-4 text-sm font-bold font-mono uppercase'>
        {props.isError ? 'Error Message' : 'Output'}
      </p>
      <div className=' bg-white p-8 rounded-lg relative'>
        <Code>{props.output}</Code>
      </div>

      {props.showInput && (
        <>
          <p className='text-neutral-300 mt-4 text-sm font-bold font-mono uppercase'>User Input</p>
          <div className=' bg-white gap-1 flex flex-col p-8 rounded-lg relative'>
            <p className='font-bold'>Promt: {context.promt.current}</p>
            <UserInput />
          </div>
        </>
      )}
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

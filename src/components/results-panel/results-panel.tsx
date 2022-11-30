import { useEffect, useContext, useState, useRef } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import AppContext from '../../app-context'
import { fetchHedy } from '../../helpers/fetchHedy'

const ResultsPanel = () => {
  const appContext = useContext(AppContext)!
  const [output, setOutput] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<'error' | 'succes' | 'waiting'>('succes')
  const [errorLines, setErrorLines] = useState<number[]>([])
  const [showInput, setShowInput] = useState(false)
  const setinput = useRef<any>(null)

  const run = async () => {
    const res = await fetchHedy(appContext.hedy, appContext.levelId)
    setOutput('')

    // TODO CHECK FOR ERRORS

    if (res.Error) {
      setStatus('error')
      setOutput(res.Error)
      setErrorLines(res.Location!)
      return
    }

    async function setInput(promt: string): Promise<string> {
      if (loading) setLoading(false)
      setShowInput(true)

      const x1 = new Promise<string>((res) => {
        setinput.current = (text: string) => res(text)
      })

      const x2 = new Promise<string>((res) => {
        setTimeout(() => {
          res('')
        }, 10000)
      })

      const x = await Promise.race([x1, x2])

      setShowInput(false)

      return x
    }

    setStatus('succes')

    const Sk = window.Sk

    Sk.configure({
      output: (text: string) => setOutput((prev) => prev + text),
      inputfun: setInput,
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
    })

    Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, res.Code, true), {
      '*': () => {
        // We don't do anything here...
      },
    })
  }

  useEffect(() => {
    setOutput(undefined)
    if (appContext.hedy) {
      setLoading(true)
      run()
    }
  }, [appContext.hedy])

  useEffect(() => {
    if (loading == false) setLoading(false) // Weird bug fix
    if (output) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [output])

  return (
    <div className='w-full h-full relative px-6'>
      {(!output || loading) && (
        <div className='flex gap-4 py-6  flex-col items-center justify-center w-full'>
          <IoSettingsOutline
            className={`text-neutral-100 transition-all ${
              loading ? 'animate-spin-slow text-neutral-300' : ''
            } `}
            size={40}
          />
          <p className='text-neutral-300 max-w-md font-extrabold text-xl'>
            {loading ? 'Running your code...' : 'Run Execute to check your code'}
          </p>
          {!loading && (
            <p className='text-xl max-w-md text-neutral-100 text-center'>
              We'll run your code and then show you the results here.
            </p>
          )}
        </div>
      )}

      {output && !loading && (
        <div className='py-2 flex flex-col relative h-full gap-4'>
          <Banner status={status} />
          <Result
            errorLines={status === 'error' ? errorLines : []}
            code={appContext.hedy ?? ''}
            output={output}
            isError={status === 'error'}
          />

          {showInput && (
            <div className=' h-24 flex bg-gray-200 overflow-hidden rounded-xl shadow-2xl fixed bottom-12 w-[400px]'>
              <input className='flex-1 outline-none' />
              <button
                onClick={() => {
                  setinput.current('Hello World')
                }}
                className='h-12 '
              >
                Submit
              </button>
            </div>
          )}

          <div className='h-40' />
        </div>
      )}
    </div>
  )
}

const Banner: React.FC<{
  status: 'succes' | 'error' | 'waiting'
}> = ({ status }) => {
  return (
    <div
      className={`w-full rounded-xl h-ful relative p-4 ${
        status == 'succes' ? 'bg-[#cefad0]' : ''
      } ${status == 'error' ? 'bg-[#FDEAEA]' : ''} ${status == 'waiting' ? 'bg-[#cefad0]' : ''}`}
    >
      <p className='w-full text-center text-neutral-300 '>
        {status == 'succes' ? 'Your code ran succesfully!' : ''}
        {status == 'error' ? 'Your code failed to run!' : ''}
        {status == 'waiting' ? 'Waiting for your input...' : ''}
      </p>
    </div>
  )
}

interface ResultType {
  code: string
  output: string
  isError: boolean
  errorLines?: number[]
}

const Result: React.FC<ResultType> = (props) => {
  return (
    <div className='p-4 rounded-xl flex gap-2 flex-col bg-gray-100'>
      <p className='text-neutral-300 text-sm font-bold font-mono uppercase'>Code Run</p>
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
      <p className='text-neutral-300 mt-4 text-sm font-bold font-mono uppercase'>
        {props.isError ? 'Error Message' : 'Output'}
      </p>
      <Code>{props.output}</Code>
    </div>
  )
}

const Code: React.FC<{ children: React.ReactNode }> = (props) => {
  return <pre className='font-mono rounded-lg bg-white p-8'>{props.children}</pre>
}

export default ResultsPanel

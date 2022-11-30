import { useEffect, useContext, useState, useRef } from 'react'
import AppContext from '../../app-context'
import { fetchHedy } from '../../helpers/fetchHedy'
import Loading from './loading'
import Output from './output'
import ResultsContext from './context'

const ResultsPanel = () => {
  const appContext = useContext(AppContext)!
  const [output, setOutput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<'error' | 'succes' | 'pending'>('succes')
  const [errorLines, setErrorLines] = useState<number[]>([])
  const [showInput, setShowInput] = useState(false)
  const onSubmit = useRef<any>(null)
  const inputPromt = useRef<any>(null)

  async function setInput(promt: string): Promise<string> {
    setLoading(false)
    setShowInput(true)

    const x1 = new Promise<string>((res) => {
      inputPromt.current = promt
      onSubmit.current = (text: string) => res(text)
    })

    const x2 = new Promise<string>((res) => {
      setTimeout(() => {
        res('Default Input')
      }, 20000)
    })

    const x = await Promise.race([x1, x2])

    setShowInput(false)

    return x
  }

  const run = async () => {
    const res = await fetchHedy(appContext.hedy, appContext.levelId)
    setOutput('')

    if (res.Error) {
      setStatus('error')
      setOutput(res.Error)
      setErrorLines(res.Location!)
      setLoading(false)
      return
    }

    setStatus('pending')

    const Sk = window.Sk

    Sk.configure({
      output: (text: string) => setOutput((prev) => prev + text),
      inputfun: setInput,
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
    })

    await Sk.misceval.asyncToPromise(
      () => Sk.importMainWithBody('<stdin>', false, res.Code, true),
      {
        '*': () => {
          // We don't do anything here...
        },
      },
    )
    setLoading(false)
    setStatus('succes')
  }

  useEffect(() => {
    if (appContext.hedy) {
      setLoading(true)
      run()
    }
  }, [appContext.hedy])

  useEffect(() => {
    if (showInput) {
      const input = document.getElementById('input') as HTMLInputElement
      input.scrollIntoView()
    }
  }, [showInput])

  return (
    <ResultsContext.Provider
      value={{
        output,
        loading,
        status,
        errorLines,
        showInput,
        setLoading,
        setOutput,
        setStatus,
        setErrorLines,
        setShowInput,
        promt: inputPromt,
        onSubmit,
      }}
    >
      <div className='w-full h-full relative px-6'>
        {(!output || loading) && <Loading />}
        {output && !loading && <Output />}
      </div>
    </ResultsContext.Provider>
  )
}

export default ResultsPanel

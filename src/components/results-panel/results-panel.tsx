import { useEffect, useContext, useState, useRef } from 'react'
import AppContext from '../../app-context'
import { fetchHedy } from '../../helpers/fetchHedy'
import Loading from './loading'
import Output from './output'

const ResultsPanel = () => {
  const appContext = useContext(AppContext)!
  const [output, setOutput] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<'error' | 'succes' | 'pending'>('succes')
  const [errorLines, setErrorLines] = useState<number[]>([])
  const [showInput, setShowInput] = useState(false)
  const setinput = useRef<any>(null)

  async function setInput(promt: string): Promise<string> {
    setLoading(false)
    setShowInput(true)

    const x1 = new Promise<string>((res) => {
      setinput.current = (text: string) => res(text)
    })

    const x2 = new Promise<string>((res) => {
      setTimeout(() => {
        res('Default Input')
      }, 10000)
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

  return (
    <div className='w-full h-full relative px-6'>
      {(!output || loading) && <Loading isLoading={loading} />}

      {output && !loading && (
        <Output
          isLoading={loading}
          status={status}
          code={appContext.hedy}
          output={output}
          showInput={showInput}
          errorLines={errorLines}
        />
      )}
    </div>
  )
}

export default ResultsPanel

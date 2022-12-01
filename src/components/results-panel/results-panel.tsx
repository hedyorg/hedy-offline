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
  const [hasTurtle, setHasTurtle] = useState<boolean>(false)
  const [showInput, setShowInput] = useState(false)
  const onSubmit = useRef<any>(null)
  const inputPromt = useRef<any>(null)
  const [hasRun, setHasRun] = useState<boolean>(false)

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

  function builtinRead(x: any) {
    const Sk = window.Sk
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
      throw "File not found: '" + x + "'"
    return Sk.builtinFiles['files'][x]
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
      read: builtinRead,
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
    })

    let code = normal_prefix + res.Code

    if (res.has_turtle) {
      code = turtle_prefix + code
      setHasTurtle(true)
    }

    setLoading(false)

    await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true), {
      '*': () => {
        // We don't do anything here...
      },
    })
    setLoading(false)
    setStatus('succes')
  }

  useEffect(() => {
    if (appContext.hedy) {
      setLoading(true)
      setHasRun(true)
      setHasTurtle(false)
      setShowInput(false)
      setOutput('')
      run()
    }
  }, [appContext.hedy])

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
        hasTurtle,
        setHasTurtle,
      }}
    >
      <div className='w-full h-full relative px-6'>
        {(!hasRun || loading) && <Loading />}

        <div className={`${hasRun && !loading ? '' : 'hidden'}`}>
          <Output />
        </div>
      </div>
    </ResultsContext.Provider>
  )
}

export default ResultsPanel

const normal_prefix = `# coding=utf8
import random, time
global int_saver
global convert_numerals # needed for recursion to work
int_saver = int
def int(s):
  if isinstance(s, str):
    numerals_dict = {'0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '𑁦': '0', '𑁧': '1', '𑁨': '2', '𑁩': '3', '𑁪': '4', '𑁫': '5', '𑁬': '6', '𑁭': '7', '𑁮': '8', '𑁯': '9', '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9', '૦': '0', '૧': '1', '૨': '2', '૩': '3', '૪': '4', '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9', '੦': '0', '੧': '1', '੨': '2', '੩': '3', '੪': '4', '੫': '5', '੬': '6', '੭': '7', '੮': '8', '੯': '9', '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9', '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4', '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9', '୦': '0', '୧': '1', '୨': '2', '୩': '3', '୪': '4', '୫': '5', '୬': '6', '୭': '7', '୮': '8', '୯': '9', '൦': '0', '൧': '1', '൨': '2', '൩': '3', '൪': '4', '൫': '5', '൬': '6', '൭': '7', '൮': '8', '൯': '9', '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4', '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9', '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4', '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9', '၀': '0', '၁': '1', '၂': '2', '၃': '3', '၄': '4', '၅': '5', '၆': '6', '၇': '7', '၈': '8', '၉': '9', '༠': '0', '༡': '1', '༢': '2', '༣': '3', '༤': '4', '༥': '5', '༦': '6', '༧': '7', '༨': '8', '༩': '9', '᠐': '0', '᠑': '1', '᠒': '2', '᠓': '3', '᠔': '4', '᠕': '5', '᠖': '6', '᠗': '7', '᠘': '8', '᠙': '9', '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4', '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9', '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4', '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9', '໐': '0', '໑': '1', '໒': '2', '໓': '3', '໔': '4', '໕': '5', '໖': '6', '໗': '7', '໘': '8', '໙': '9', '꧐': '0', '꧑': '1', '꧒': '2', '꧓': '3', '꧔': '4', '꧕': '5', '꧖': '6', '꧗': '7', '꧘': '8', '꧙': '9', '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9', '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9', '〇': '0', '一': '1', '二': '2', '三': '3', '四': '4', '五': '5', '六': '6', '七': '7', '八': '8', '九': '9', '零': '0'}
    latin_numerals = ''.join([numerals_dict.get(letter, letter) for letter in s])
    return int_saver(latin_numerals)
  return(int_saver(s))
def convert_numerals(alphabet, number):
  numerals_dict_return = {
    'Latin': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'Brahmi': ['𑁦', '𑁧', '𑁨', '𑁩', '𑁪', '𑁫', '𑁬', '𑁭', '𑁮', '𑁯'],
    'Devanagari': ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
    'Gujarati': ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
    'Gurmukhi': ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
    'Bengali': ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
    'Kannada': ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
    'Odia': ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'],
    'Malayalam': ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
    'Tamil': ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
    'Telugu':['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
    'Burmese':['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'],
    'Tibetan':['༠', '༡', '༢', '༣', '༤', '༥', '༦', '༧', '༨', '༩'],
    'Mongolian':['᠐', '᠑', '᠒', '᠓', '᠔', '᠕', '᠖', '᠗', '᠘', '᠙'],
    'Khmer':['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'],
    'Thai':['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'],
    'Lao':['໐', '໑', '໒', '໓', '໔', '໕', '໖', '໗', '໘', '໙'],
    'Javanese':['꧐', '꧑', '꧒', '꧓', '꧔', '꧕', '꧖', '꧗', '꧘', '꧙'],
    'Arabic':['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
    'Persian':['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    'Urdu': ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']}
  numerals_list = numerals_dict_return[alphabet]
  number=str(number)
  number = str(number)
  if number.isnumeric():
    numerals_list = numerals_dict_return[alphabet]
    all_numerals_converted = [numerals_list[int(digit)] for digit in number]
    return ''.join(all_numerals_converted)
  else:
    return number
`

const turtle_prefix = `# coding=utf8
import random, time, turtle
t = turtle.Turtle()
t.shape("turtle")
t.hideturtle()
t.penup()
t.left(90)
t.pendown()
t.speed(3)
t.showturtle()
`

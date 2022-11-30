// export const runPython = async (code: string, level: string) => {
//   const Sk = window.Sk
//   if (!Sk) return null

//   const outf = (text: string) => {
//     console.log(text)
//   }

//   Sk.configure({ output: outf })

//   var myPromise = Sk.misceval.asyncToPromise(function () {
//     return Sk.importMainWithBody('<stdin>', false, "prisdasnt('Hello Worlasdasdad!')", true)
//   })

//   //   const result = await myPromise;
// }

export function runPython(
  code: string,
  level: string,
  setInput: (promt: string) => Promise<string>,
  setOutput: (text: string) => void,
) {
  const Sk = window.Sk
  Sk.configure({
    output: setOutput,
    inputfun: setInput,
    inputfunTakesPrompt: true,
    __future__: Sk.python3,
  })

  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true), {
    '*': () => {
      // We don't do anything here...
    },
  })
}

export default runPython

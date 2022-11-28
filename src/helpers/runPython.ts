export const runPython = async (code: string, level: string) => {
  const Sk = window.Sk
  if (!Sk) return null

  const outf = (text: string) => {
    console.log(text)
  }

  Sk.configure({ output: outf })

  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody('<stdin>', false, "prisdasnt('Hello Worlasdasdad!')", true)
  })

  //   const result = await myPromise;
}

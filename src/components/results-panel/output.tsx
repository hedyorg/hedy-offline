import { useContext } from 'react'
import AppContext from '../../app-context'
import Banner from '../../banner'
import Console from './console'
import ResultsContext from './context'

const Output: React.FC = () => {
  const props = useContext(ResultsContext)!
  const appContext = useContext(AppContext)!

  return (
    <div className='py-2 pb-[500px] flex flex-col relative h-full gap-4'>
      <Banner
        status={props.status}
        errorContent='There was an error running your code'
        successContent='Your code ran successfully!'
        pendingContent='Your code is running...'
      />

      <Console
        errorLines={props.status === 'error' ? props?.errorLines : []}
        code={appContext.hedy}
        output={props.output}
        isError={props.status === 'error'}
        showInput={props.showInput}
      />
    </div>
  )
}

export default Output

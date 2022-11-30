import Banner from '../../banner'
import Console from '../console'

interface OutputProps {
  isLoading: boolean
  status: 'succes' | 'error' | 'pending'
  errorLines?: number[]
  code: string
  output: string
  showInput: boolean
}

const Output: React.FC<OutputProps> = (props) => {
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
        code={props.code}
        output={props.output}
        isError={props.status === 'error'}
        showInput={props.showInput}
      />
    </div>
  )
}

export default Output

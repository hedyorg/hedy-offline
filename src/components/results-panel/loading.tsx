import { useContext } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import ResultsContext from './context'

const Loading: React.FC = () => {
  const props = useContext(ResultsContext)!

  return (
    <div className='flex gap-4 py-6  flex-col items-center justify-center w-full'>
      <IoSettingsOutline
        className={`text-neutral-100 transition-all ${
          props.loading ? 'animate-spin-slow text-neutral-300' : ''
        } `}
        size={40}
      />
      <p className='text-neutral-300 max-w-md font-extrabold text-xl'>
        {props.loading ? 'Running your code...' : 'Run Execute to check your code'}
      </p>
      {!props.loading && (
        <p className='text-xl max-w-md text-neutral-100 text-center'>
          We'll run your code and then show you the results here.
        </p>
      )}
    </div>
  )
}

export default Loading

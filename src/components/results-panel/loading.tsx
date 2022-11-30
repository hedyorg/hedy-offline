import { IoSettingsOutline } from 'react-icons/io5'

interface LoadingProps {
  isLoading: boolean
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div className='flex gap-4 py-6  flex-col items-center justify-center w-full'>
      <IoSettingsOutline
        className={`text-neutral-100 transition-all ${
          props.isLoading ? 'animate-spin-slow text-neutral-300' : ''
        } `}
        size={40}
      />
      <p className='text-neutral-300 max-w-md font-extrabold text-xl'>
        {props.isLoading ? 'Running your code...' : 'Run Execute to check your code'}
      </p>
      {!props.isLoading && (
        <p className='text-xl max-w-md text-neutral-100 text-center'>
          We'll run your code and then show you the results here.
        </p>
      )}
    </div>
  )
}

export default Loading

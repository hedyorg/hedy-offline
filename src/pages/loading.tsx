interface LoadingProps {
  text: string
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div className='h-screen w-screen grid place-items-center'>
      <div className='flex flex-col items-center gap-6'>
        <img className='w-28 animate-bounce h-28' src='/images/logo.png' alt='Hedy Logo' />
        <div>
          <p className='text-3xl font-bold'>{props.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Loading

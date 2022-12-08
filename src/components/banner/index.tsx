interface BannerProps {
  status: 'succes' | 'error' | 'pending'
  errorContent?: string
  successContent?: string
  pendingContent?: string
}

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <div
      className={`w-full rounded-xl h-ful relative p-4 
      ${props.status == 'succes' ? 'bg-[#cefad0]' : ''} 
      ${props.status == 'error' ? 'bg-[#FDEAEA]' : ''} 
      ${props.status == 'pending' ? 'bg-[#f7e3b7]' : ''}`}
    >
      <p className='w-full text-center text-neutral-300 '>
        {props.status == 'succes' ? props?.successContent : ''}
        {props.status == 'error' ? props?.errorContent : ''}
        {props.status == 'pending' ? props?.pendingContent : ''}
      </p>
    </div>
  )
}

export default Banner

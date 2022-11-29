import { useLoaderData } from 'react-router'
import LevelPicker from './level-picker'

const Home: React.FC = () => {
  const { adventures, level } = useLoaderData() as {
    adventures: AdventureCollectionType
    level: string
  }

  return (
    <div className='min-[2000px] pb-12'>
      <div className='text-center mb-8 flex gap-6 mt-12 items-center flex-col'>
        <img className='w-24 h-24' src='/images/logo.png' />
        <h1 className='text-4xl text-center font-black '>Hedy Offline</h1>
        <p className=' max-w-xl'>
          Become fluent in your chosen programming languages by completing these tracks created by
          our awesome team of contributors
        </p>
      </div>
      <LevelPicker adventures={adventures} level={level} />
    </div>
  )
}

export default Home

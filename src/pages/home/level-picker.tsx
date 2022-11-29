import { AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const LevelPicker: React.FC<{ adventures: AdventureCollectionType; level: string }> = ({
  adventures,
  level,
}) => {
  const [cLevel, setLevel] = useState(level)

  const adventureKeysOnThisLevel = useMemo(
    () =>
      Object.keys(adventures['en'].adventures).filter((p) => {
        return Object.keys(adventures['en'].adventures[p].levels).includes(level)
      }),
    [cLevel],
  )

  const levels = useMemo(() => {
    let set = new Set<string>()

    Object.values(adventures['en'].adventures).forEach((p) => {
      Object.keys(p.levels).forEach((l) => {
        set.add(l)
      })
      return Object.keys(p.levels)
    })
    return Array.from(set)
  }, [adventures])

  const getAdventure = (adventureId: string) => {
    return adventures['en'].adventures[adventureId]
  }

  return (
    <div>
      <div className='flex mb-12  gap-5 justify-center'>
        {levels.map((l) => {
          return (
            <button
              onClick={() => setLevel(l)}
              className={`min-h-[30px] min-w-[30px] rounded-full text-white font-bold  grid place-items-center ${
                cLevel === l ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              {l}
            </button>
          )
        })}
      </div>

      <div className='grid gap-5 max-w-5xl mx-auto grid-cols-2'>
        <AnimatePresence initial={false}>
          {adventureKeysOnThisLevel.map((adventureID, index) => {
            const adventure = getAdventure(adventureID)
            const delay = (index % 2 == 0 ? index : index - 1) * 0.05
            return (
              <Link key={Math.random()} to={`/editor/en/${adventureID}/${cLevel}`}>
                <motion.div
                  transition={{ delay }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='w-full p-5 bg-gray-200'
                  key={adventure.name}
                >
                  <p> {adventure.name}</p>
                  <p> {adventure.description}</p>
                </motion.div>
              </Link>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LevelPicker

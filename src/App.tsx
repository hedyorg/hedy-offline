import { useEffect, useState } from 'react'
import Editor from './pages/editor'
import Loading from './pages/loading'

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [adventures, setAdventures] = useState<AdventureCollectionType | null>(null)

  const isConnected = async () => {
    var raw = JSON.stringify({
      code: 'print hello world!',
      level: '1',
    })

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    try {
      const res = await fetch('http://localhost:4444/parse', {
        method: 'POST',
        body: raw,
        redirect: 'follow',
        headers: myHeaders,
      })
      return res.status === 200
    } catch (error) {
      return false
    }
  }

  const loadAdventures = async () => {
    const data = await window.info.getAdventures()
    setAdventures(data)
  }

  const load = async () => {
    await loadAdventures()
    let reachable = await isConnected()
    while (!reachable) {
      reachable = await isConnected()
      await new Promise((r) => setTimeout(r, 1000))
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  if (!loading && adventures) {
    return <Editor adventures={adventures} />
  }

  return <Loading text={'Loading...'} />
}

export default App

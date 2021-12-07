import { useState } from 'react'

const useForceUpdate = () => {
  const [remountCount, setRemountCount] = useState(0)

  return (
    [remountCount, () => {
      setRemountCount(remountCount + 1);
    }]
  )
}

export { useForceUpdate }

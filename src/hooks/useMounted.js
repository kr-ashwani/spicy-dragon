import { useEffect, useRef } from 'react'

const useMounted = () => {
  let mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => mounted.current = false;
  }, [])
  return mounted;
}

export default useMounted

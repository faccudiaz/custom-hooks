import { useRef, useState } from 'react'
import { useEffect } from 'react/cjs/react.development'

export const useFetch = (url) => {

    const isMounted = useRef(true)
    const [state, setState] = useState({ data: null, loading: true, error: null })

    useEffect(() => {
        console.log('mounted')
        return () => {
            console.log('UNmounted')
            isMounted.current = false
        }
    }, [])

    useEffect(() => {
        setState({ data: null, loading: true, error: null })
        console.log('setstateee')
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info',
                })
            })
    }, [url])

    return state
}

import { useCallback, useRef } from 'react'

interface PropTypes {
    loading: boolean
    hasMore: boolean
    callback: () => void
}

interface ReturnTypes {
    reference: (node: HTMLImageElement) => void
}

const useInfinitySearch = ({loading, hasMore, callback}: PropTypes): ReturnTypes => {
    const observer = useRef<IntersectionObserver | null>(null)
    const lastBookElementRef = useCallback((node: HTMLImageElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      })
      if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return {
        reference: lastBookElementRef
    }
}

export default useInfinitySearch
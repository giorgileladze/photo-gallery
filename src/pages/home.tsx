import { useCallback, useEffect, useRef, useState } from "react"
import PhotosList from "../components/PhotosList"
import usePhotosSearch from "../hooks/usePhotosSearch";
import Search from "../components/Search";

const Home: React.FC = () => {
 const [page, setPage] = useState(1);
 const [query, setQuery] = useState<string | null>(null);
 const { 
    photos,
    loading,
    hasMore,
  } = usePhotosSearch(query, page);

  const observer = useRef<IntersectionObserver | null>(null)
  const lastBookElementRef = useCallback((node: HTMLImageElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;

    if(!val) {
      setQuery(null);
    }
    setQuery(val);
    setPage(1);
  }

  useEffect(() => {
    const set = new Set();

    photos.forEach(el => set.add(el.id));

    if(photos.length > set.size) {
      console.log(photos)
    }
  }, [photos])

  return (
    <div>
      <Search handleQueryChange={handleQueryChange}/>
      <PhotosList data={photos} reference={lastBookElementRef}/>
    </div>
  )
}

export default Home
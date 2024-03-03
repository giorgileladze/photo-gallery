import { useState } from "react"
import PhotosList from "../components/PhotosList"
import usePhotosSearch from "../hooks/usePhotosSearch";
import Search from "../components/Search";
import useInfinitySearch from "../hooks/useInfinitySearch";

const Home: React.FC = () => {
 const [page, setPage] = useState(1);
 const [query, setQuery] = useState<string | null>(null);
 const { 
    photos,
    loading,
    hasMore,
  } = usePhotosSearch(query, page);

  const increment = () => {
    setPage(prev => prev + 1);
  }
  
  const { reference } = useInfinitySearch({loading, hasMore, callback: increment});

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;

    if(!val) {
      setQuery(null);
    }
    setQuery(val);
    setPage(1);
  }

  return (
    <div>
      <Search handleQueryChange={handleQueryChange}/>
      <PhotosList data={photos} reference={reference}/>
    </div>
  )
}

export default Home
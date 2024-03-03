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
    setTimeout(() => {
      if(e.target.value == val){
        setQuery(val);
      }
    }, 500) // set timeout to avoid api requests if user is still typing the word to search, since there is no search button, give it 500ms delay before search request is sent
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
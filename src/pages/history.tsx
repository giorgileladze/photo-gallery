import { useEffect, useState } from "react";
import PhotosList from "../components/PhotosList";
import useInfinitySearch from "../hooks/useInfinitySearch";
import usePhotosSearch from "../hooks/usePhotosSearch";
import useHistory from "../hooks/useHistory";
import HistoryCard from "../components/HistoryCard";

const History: React.FC = () => {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<string>('')
  const history = useHistory();
  const { 
    photos,
    loading,
    hasMore,
  } = usePhotosSearch(active, page, false);

  const increment = () => {
    setPage(prev => prev + 1);
  }
  
  const { reference } = useInfinitySearch({loading, hasMore, callback: increment});

  const handleClick = (key: string) => {
    setActive(key);
  }

  useEffect(() => {
    console.log(history)
  }, [page])

  return (
    <div>
      <HistoryCard keys={history} onClick={handleClick} active={active}/>
      <PhotosList data={photos} reference={reference}/>
    </div>
  )
}

export default History;
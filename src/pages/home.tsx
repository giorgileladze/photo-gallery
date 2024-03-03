import { useEffect, useState } from "react"
import PhotosList, { Photo } from "../components/PhotosList"
import api from "../axios";

const Home: React.FC = () => {
  const [data, setData] = useState<Photo[]>([]);
  const parsePhotoData = (data: Photo[]): Photo[] => {
    return data.map(elem => {
      const {
        id,
        alt_description,
        urls: {
          full,
          small,
        },
        likes,
        downloads,
        views,
      } = elem;

      return {
        id,
        alt_description,
        urls: {
          full,
          small,
        },
        likes,
        downloads,
        views,
      }
    });
  }

  useEffect(() => {
    const requestData = async () => {
      const response = await api.get<Photo[]>(`/photos?per_page=20&page=1`);

      setData(parsePhotoData(response.data));
    }

    requestData();
  }, [])

  return (
    <PhotosList data={data} />
  )
}

export default Home
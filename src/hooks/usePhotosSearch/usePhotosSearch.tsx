import { useEffect, useState } from 'react'
import api from '../../axios';
import axios, { Canceler } from 'axios';
import { Photo } from '../../components/PhotosList';

const usePhotosSearch = (query: string | null, pageNumber: number, fetchApi:boolean = true) => {
  const [loading, setLoading] = useState(true)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [hasMore, setHasMore] = useState(false)

  const isCached = ():boolean => {
    const obj = JSON.parse(localStorage.getItem('query') as string);

    if(obj === null) return false;
    
    const keys = Object.keys(obj);

    if(!keys.length) return false;

    let val = false;
    keys.forEach(k => {
        if(k === query && obj[k].length > (pageNumber - 1) * 20) {
          val = true;
        }
    })
    
    return val;
  }

  const updateCache = (newData: Photo[]) => {
    if(!query) return;

    const prevPhotos:Record<string, Photo> = JSON.parse(localStorage.getItem('photos') as string);
    const prevQueries: Record<string, string[]> = JSON.parse(localStorage.getItem('query') as string) || {};
    let newCache:Record<string, Photo> = {};
    if(prevPhotos && Object.keys(prevPhotos)){
        newCache = {...prevPhotos};
    }
    
    const data: Record<string, Photo> = {};
    parsePhotoData(newData).forEach(el => {
        const key = el.id;
        data[key] = el;
    })

    newCache = {...newCache, ...data}

    localStorage.setItem('photos', JSON.stringify(newCache));
    let arr: string[] = [];

    if(prevQueries[query] && prevQueries[query].length) {
        arr = [...prevQueries[query]];
    }

    newData.forEach(el => {
        arr.push(el.id);
    })

    prevQueries[query] = [...new Set(arr)];

    localStorage.setItem('query', JSON.stringify(prevQueries));
  }

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

  const setUniquePhotos = (data: Photo[]) => {
    const map = new Map<string, Photo>();
    setPhotos(prevphotos => {
      prevphotos.forEach(el => {
        map.set(el.id, el);
      });

      data.forEach(el => {
        map.set(el.id, el);
      })

      return [...Array.from(map.values())];
    })
  }

  useEffect(() => {
    setPhotos([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    
    let cancel: Canceler;
    
    if(query){
        if(!isCached() && fetchApi){
            api.get(`/search/photos?page=${pageNumber}&query=${query}&per_page=20`, {
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setUniquePhotos([...parsePhotoData(res.data.results)]);
                setHasMore(res.data.total_pages > pageNumber);
                setLoading(false)
                updateCache(res.data.results);
            })
        } else {
            const obj = JSON.parse(localStorage.getItem('query') as string);
            const arr:string[] = obj[query];

            const photos = JSON.parse(localStorage.getItem('photos') as string);
            const data: Photo[] = [];
            arr.forEach((id, index) => {
                if(index < pageNumber * 20){
                    data.push(photos[id]);
                }
            })

            setUniquePhotos(data);
            setLoading(false);
            setHasMore(true);
        }

    } else if(fetchApi){
        api.get<Photo[]>(`/photos?per_page=20&page=${pageNumber}&order_by=popular`).then(res => {
          const data = [...parsePhotoData(res.data)];  
          setUniquePhotos(data);
          setHasMore(true);
          setLoading(false);
        })
    }

    return () => {
        if(cancel) {
            cancel()
        }
    }
  }, [query, pageNumber])

  return { loading, photos, hasMore }
}

export default usePhotosSearch;
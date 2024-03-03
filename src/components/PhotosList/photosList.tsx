/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Photo, PhotoListProps, PhotoCardProps } from './interfaces'
import './styles.css'
import { createPortal } from 'react-dom';
import StatsCard from '../StatsCard';

const PhotoCard: React.FC<PhotoCardProps> = ({photoData, reference}) => {
    const {
        id,
        alt_description,
        urls: {
            small,
            full
        },
        likes,
        downloads,
        views,
    } = photoData;

    const [showFull, setShowFull] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <div id={id} className='photo-card'>
            <div className='small-photo' onClick={() => setShowFull(true)}>
                <img src={small} alt={alt_description} title={alt_description} ref={reference ? reference : null}/>
            </div>
            {showFull && createPortal(
                <div className={`full-photo portal ${showFull ? 'active' : ''}`}>
                    <div className={`full-photo-img ${loaded ? 'loaded' : ''}`} style={{backgroundImage: `url(${small}`}}>
                        <img onLoad={() => setLoaded(true)} src={full} alt={alt_description}/>
                    </div>                
                    <StatsCard stats={
                        {
                            likes,
                            downloads,
                            views
                        }
                    } id={id}/>
                    <div className='cover' onClick={() => setShowFull(false)}></div>
                </div>,
            document.getElementById('portal')!,
            id
            )}
        </div>
    )
}

const PhotosList: React.FC<PhotoListProps> = ({data, reference}) => {
    
    // create matrix from data to allow creating better grid of photos
    const createGridTemplate = ():Photo[][] => {
        const arr:Photo[][] = [];
        const columnCount = 4;

        data.forEach((elem, index) => {
            const i = index % columnCount;
            if(!arr[i]){
                arr[i] = new Array<Photo>();
            }

            arr[i].push(elem);
        })

        return arr;
    }

    return (
        <div className='photos-container'>
            {createGridTemplate().map((columnElems, i) => {
                return (
                    <div key={i} className='gallery-column'>
                        {columnElems.map((elem, index) => {
                            if(index < columnElems.length - 1){
                                return <PhotoCard key={elem.id} photoData={elem}/>
                            }
                            return <PhotoCard key={elem.id} photoData={elem} reference={reference}/>
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default PhotosList
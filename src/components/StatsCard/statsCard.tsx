import { useEffect, useState } from "react";
import api from "../../axios";
import './style.css';
import likesIcon from '../../assets/likes-icon.svg';
import downloadsIcon from '../../assets/downloads-icon.svg';
import viewsIcon from '../../assets/views-icon.svg';


interface PropTypes {
    id: string
    stats: {
        likes: string | number | undefined
        downloads: string | number | undefined
        views: string | number | undefined
    }
}

const StatsCard = ({stats:{likes, downloads, views}, id}: PropTypes) => {
    const [stats, setStats] = useState({
        downloads,
        views,
    });
    useEffect(() => {
        if(likes == undefined || stats.downloads == undefined || stats.views == undefined) {
            const obj = JSON.parse(localStorage.getItem('photos') as string);

            if(obj[id] && likes !== undefined && obj[id].views !== undefined && obj[id].downloads !== undefined){
                setStats({
                    downloads: obj[id].downloads,
                    views: obj[id].views,
                });
            } else {
                api.get(`/photos/${id}/statistics?quantity=1`).then(res => {
                    const {
                        downloads,
                        views,
                    } = res.data;
    
                    setStats({
                        downloads: downloads.total,
                        views: views.total
                    });
    
                    if(obj && obj[id]){
                        obj[id].downloads = downloads.total;
                        obj[id].views = views.total;
        
                        localStorage.setItem('photos', JSON.stringify(obj));
                    }
    
                    
                })
            }            
        }
    }, [])
    
    return (
        <div className="stats">
            <span><img src={likesIcon} />  Likes: {likes || 0}</span>
            <span><img src={downloadsIcon} />  Downloads: {stats.downloads || 0}</span>
            <span><img src={viewsIcon} />  Views: {stats.views || 0}</span>
        </div>
  )
}

export default StatsCard
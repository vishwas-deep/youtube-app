import React, { useState } from 'react'
import './categoriesBar.scss'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';

const keywords = [
    "All",
    "React js",
    "Angular js",
    "React Native",
    "use of API",
    "Redux",
    "Music",
    "Algorithm Art",
    "Guitar",
    "Classical Songs",
    "Coding",
    "Cricket",
    "Dance",
    "Kathak"
]

const CategoriesBar = () => {

    // maintain state
    const [activeElement, updateActiveElement] = useState(keywords[0]);
    
    // dispatch action creator for selected keyword
    const dispatch = useDispatch();
   
    const handleCategoriesClick = (keyword) => {
        
        updateActiveElement(keyword);
        
        if (keyword === 'All') {
            dispatch(getPopularVideos())
        } else {
            dispatch(getVideosByCategory(keyword))            
        }
    }
    
    return (
        <div className='categoriesBar'>
            {/* map over keyword categories */}
            {
                keywords.map((keyword, index) =>
                    <span
                        onClick={() => handleCategoriesClick(keyword)}
                        key={index}
                        className={activeElement === keyword ? 'active' : ''}
                    >
                        {keyword}
                    </span>
                )
            }
        </div>
    )
}

export default CategoriesBar
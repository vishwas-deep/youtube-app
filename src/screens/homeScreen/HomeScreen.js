import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

// local dependencies
import Video from '../../components/video/Video'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'


const HomeScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopularVideos())
    }, [dispatch])

    // get videos from redux
    const { videos, activeCategory, loading } = useSelector(state => state.homeVideos)

    // fetch more data on pagination
    const fetchMoreData = () => {
        if (activeCategory === 'All') {
            dispatch(getPopularVideos())
        } else {
            dispatch(getVideosByCategory(activeCategory))
        }
    }

    return (
        <Container>
            
            <CategoriesBar />
            
            <InfiniteScroll
                className="row" 
                dataLength={videos.length}
                next={fetchMoreData}
                hasMore={true}
                Loader={
                    <div className='spinner-border text-danger d-block mx-auto' />
                }
            >
                {!loading ?
                    videos.map((video, index) => (
                        <Col lg={3} md={4} key={index}>
                            <Video video={video} key={video.id} />
                        </Col>
                    )) :
                    [...Array(20)].map((video, index) => (
                        <Col lg={3} md={4} key={index}>
                            <SkeletonVideo />
                        </Col>
                    ))
                }
            </InfiniteScroll>
            
        </Container>
    )
}

export default HomeScreen
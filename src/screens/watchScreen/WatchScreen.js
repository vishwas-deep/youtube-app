import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// local dependencies
import './watchScreen.scss'
import VideoMetaData from '../../components/videoMetaData/VideoMetaData'
import RelatedVideosBar from '../../components/relatedVideosBar/RelatedVideosBar'
import Comments from '../../components/comments/Comments'
import { getRelatedVideos, getVideoById } from '../../redux/actions/videos.action'


const WatchScreen = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    
    const { video, loading } = useSelector(state => state.selectedVideo);
    const { videos, relatedVideosLoading } = useSelector(state => state.relatedVideos);

    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getRelatedVideos(video?.snippet?.channelTitle))
    }, [dispatch, id, video?.snippet?.channelTitle])
    
    return (
        <Row>
            <Helmet>
                <title>{video?.snippet?.title}</title>
            </Helmet>
            <Col lg={8}>

                {/* video player */}
                <div className='watchScreen__player'>
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder={'0'}
                        title={video?.snippet?.title}
                        allowFullScreen
                        width={'100%'}
                        height={'100%'}
                    />
                </div>

                {/* video data */}
                {
                    !loading ? <VideoMetaData video={video} videoId={id} /> : <h6>Loading</h6>
                }

                {/* comments component */}
                <Comments videoId={id} commentCount={video?.statistics?.commentCount} />
            </Col>

            {/* Related Videos tab */}
            <Col lg={4}>
                {
                    !relatedVideosLoading ? videos?.filter(video => video?.snippet)?.map((video) => {
                        return (
                            <RelatedVideosBar video={video} key={video.id.videoId} />
                        )
                    }) : <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                            <Skeleton width={'100%'} height={'130px'} count={15} />
                        </SkeletonTheme>
                }
            </Col>
        </Row>
    )
}

export default WatchScreen
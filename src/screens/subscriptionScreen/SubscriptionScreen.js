import React, { useEffect } from 'react'
import './subscriptionScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribedChannel } from '../../redux/actions/videos.action'
import { Container } from 'react-bootstrap'
import RelatedVideosBar from '../../components/relatedVideosBar/RelatedVideosBar'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SubscriptionScreen = () => {

    const dispatch = useDispatch()
    const { videos, loading } = useSelector(state => state.subscribedChannel);

    useEffect(() => {
        dispatch(getSubscribedChannel())
    }, [dispatch])

    return (
        <Container fluid>
            {
                !loading ?
                    videos?.map((video) =>
                        <RelatedVideosBar subscriptionScreen={true} video={video} key={video.id} />) :
                    
                    <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                        <Skeleton width={'100%'} height={'160px'} count={20} />
                    </SkeletonTheme>
            }
        </Container>
    )
}

export default SubscriptionScreen
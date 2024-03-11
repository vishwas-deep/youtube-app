import React, { useEffect } from 'react'
import './channelScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideosByChannel } from '../../redux/actions/videos.action'
import { Col, Container, Row } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Video from '../../components/video/Video'
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action'
import numeral from 'numeral'

const ChannelScreen = () => {

    const { channelId } = useParams();
    const dispatch = useDispatch();
    const { videos, loading } = useSelector(state => state.channelVideos) ?? {}
    const { snippet, statistics } = useSelector(state => state.channelDetails.channel) ?? {}

    useEffect(() => {
        dispatch(getVideosByChannel(channelId))
        dispatch(getChannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])
    
    const subscriptionStatus = useSelector(
        state => state?.channelDetails?.subscriptionStatus
    ) ?? {};

    return (
        <React.Fragment>

            {/* channel header */}
            <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader'>
                <div className='d-flex align-items-center channelHeader__left'>
                    <img src={snippet?.thumbnails?.default?.url} alt='' />

                    <div className='ml-3 channelHeader__details'>
                        <h3>{snippet?.title}</h3>
                        <span>
                            {numeral(statistics?.subscriberCount).format('0.a')}{' '}
                            subscribers
                        </span>
                    </div>
                </div>

                <button className={subscriptionStatus && 'btn-gray'}>{subscriptionStatus ? 'Subscribed' : 'Subscribe'}</button>
            </div>


            {/* channel details */}
            <Container>
                <Row className='mt-2'>
                    {
                        !loading ? videos?.map((video) => <Col md={3} lg={3}>
                            <Video video={video} channelScreen />
                        </Col>) : [...Array(15)].map(() => <Col md={3} lg={3}>
                            <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                                <Skeleton width={'100%'} height={'140px'} />
                            </SkeletonTheme>
                        </Col>)
                    }
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ChannelScreen
import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// local dependencies
import './relatedVideosBar.scss'
import request from '../../api';

const RelatedVideosBar = ({ video, searchScreen, subscriptionScreen }) => {

    const { id, snippet: {
        channelId, channelTitle, description, title, publishedAt, thumbnails, resourceId
    } } = video

    const isVideo = !(id.kind === 'youtube#channel' || subscriptionScreen)

    // maintain state
    const [views, updateViews] = useState(null);
    const [duration, updateDuration] = useState(null);
    const [channelIcon, updateChannelIcon] = useState(null);

    // resolve duration
    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format("mm:ss")

    // get video data
    useEffect(() => {
        const getVideoDetails = async () => {
            const { data: { items } } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: id.videoId
                }
            })
            updateDuration(items[0]?.contentDetails?.duration)
            updateViews(items[0]?.statistics?.viewCount)
        }
        if (isVideo) {
            getVideoDetails();
        }
    }, [id, isVideo])

    // get channel icon
    useEffect(() => {
        const getChannelIcon = async () => {

            const { data: { items } } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId
                },
            })
            updateChannelIcon(items[0]?.snippet?.thumbnails?.default)
        }
        getChannelIcon();
    }, [channelId])

    const navigate = useNavigate();

    const _channelId = resourceId?.channelId || channelId

    const handleRelatedVideoClick = () => {
        isVideo ?
            navigate(`/watch/${id?.videoId}`) :
            navigate(`/channel/${_channelId}`)
    }

    const thumbnail = !isVideo && 'relatedVideosBar__thumbnail--channel'

    return (
        <Row className='relatedVideosBar m-1 py-2 align-items-center' onClick={handleRelatedVideoClick}>

            {/* image and duration */}
            <Col xs={6} md={searchScreen || subscriptionScreen ? 4 : 6} className='relatedVideosBar__left'>

                <LazyLoadImage
                    src={thumbnails?.medium?.url}
                    effect="blur"
                    className={`relatedVideosBar__thumbnail ${thumbnail}`}
                    wrapperClassName='relatedVideosBar__thumbnail__wrapper'
                />

                {
                    isVideo && <span className='relatedVideosBar__duration'>{_duration}</span>
                }

            </Col>

            {/* title desc and channel name */}
            <Col xs={6} md={searchScreen || subscriptionScreen ? 8 : 6} className='relatedVideosBar__right p-0'>

                <p className='relatedVideosBar__title mb-1'>
                    {title}
                </p>

                {
                    isVideo &&
                    <div className='relatedVideosBar__details mb-1'>
                            <AiFillEye /> {numeral(views).format("0.a")} Views • {' '}
                        <span>{moment(publishedAt).fromNow()}</span>
                    </div>
                }

                {
                    (searchScreen || subscriptionScreen) && <p className='mt-1 relatedVideosBar__description'>{description}</p>
                }

                <div className='relatedVideosBar__channel d-flex align-items-center my-1'>
                    {
                        isVideo && <LazyLoadImage
                            src={channelIcon?.url}
                            effect="blur"
                        />
                    }
                    <p className='mb-0'>{channelTitle}</p>
                </div>
                
                {
                    subscriptionScreen &&
                    <p className='mt-2'>
                            {`${video?.contentDetails?.totalItemCount} Videos`}
                        </p>
                }

            </Col>

        </Row>
    )
}

export default RelatedVideosBar

RelatedVideosBar.propTypes = {
    video: PropTypes.object.isRequired,
    searchScreen: PropTypes.bool,
};
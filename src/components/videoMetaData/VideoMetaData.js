import React, { useEffect, useState } from 'react'
import numeral from 'numeral'
import moment from 'moment'
import { MdOutlineThumbUpAlt, MdOutlineThumbDownAlt, MdThumbUpAlt, MdThumbDownAlt } from 'react-icons/md'
import ShowMoreText from 'react-show-more-text'
import { useDispatch, useSelector } from 'react-redux'

// local dependencies
import './videoMetaData.scss'
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action'
import HelmetCustom from '../helmetCustom/HelmetCustom'


const VideoMetaData = ({ video, videoId }) => {

    const { snippet, statistics } = video ?? {}

    const { channelId, channelTitle, description, title, publishedAt } = snippet ?? {}
    const { viewCount, likeCount } = statistics ?? {}

    const dispatch = useDispatch()
    const {
        snippet: channelSnippet,
        statistics: channelStatistics
    } = useSelector(state => state?.channelDetails?.channel) ?? {}

    const subscriptionStatus = useSelector(
        state => state?.channelDetails?.subscriptionStatus
    ) ?? {};

    const { videos } = useSelector(
        state => state?.likedVideos
    ) ?? {};

    let [likedStatus, updateLikedStatus] = useState(false)
    let [dislikeStatus, updateDislikeStatus] = useState(false)

    useEffect(() => {
        updateLikedStatus(videos?.find((video) => video.id === videoId))
    }, [videos, videoId])

    useEffect(() => {
        dispatch(getChannelDetails(channelId));
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])

    const handleLikes = () => {
        updateLikedStatus(prevState => !prevState)
        if (dislikeStatus) {
            updateDislikeStatus(false)
        }
    }

    const handleDislikes = () => {
        updateDislikeStatus(prevState => !prevState)
        if (likedStatus) {
            updateLikedStatus(false)
        }
    }

    return (
        <div className='py-2 videoMetaData'>

            <HelmetCustom title={title} description={description} />

            {/* video title and views */}
            <div className='videoMetaData__top'>

                {/* video title */}
                <h5>{title}</h5>

                <div className='videoMetaData__top__info py-1 d-flex justify-content-between align-items-center'>
                    {/* video views and published date */}
                    <span>
                        {numeral(viewCount).format("0.a")} Views • {' '}
                        {moment(publishedAt).fromNow()}
                    </span>

                    {/* like and dislike icon */}
                    <div>
                        <span className='mr-3' onClick={handleLikes}>
                            {!likedStatus ?
                                <MdOutlineThumbUpAlt size={26} /> : <MdThumbUpAlt size={26} />
                            } {' '}
                            {numeral(likeCount).format("0.a")}
                        </span>

                        <span className='mr-3' onClick={handleDislikes}>
                            {!dislikeStatus ?
                                <MdOutlineThumbDownAlt size={26} /> : <MdThumbDownAlt size={26} />
                            } {' '}
                        </span>
                    </div>

                </div>
            </div>

            {/* channel data */}
            <div className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
                <div className='d-flex' style={{ gap: '20px' }} >
                    {/* channel icon */}
                    <img
                        className='mr-3 rounded-circle'
                        src={channelSnippet?.thumbnails?.default?.url}
                        alt='Channel icon'
                    />

                    {/* channel name and subscribers */}
                    <div className='d-flex flex-column'>
                        <span>{channelTitle}</span>
                        <span>{' '} {numeral(channelStatistics?.subscriberCount).format("0.a")} {' '} Subscribers</span>
                    </div>
                </div>
                {/* subscribe button */}
                <button className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'}`}>{subscriptionStatus ? 'Subscribed' : 'Subscribe'}</button>

            </div>

            {/* video description */}
            <div className='videoMetaData__description'>
                <ShowMoreText
                    lines={3}
                    more="Show more"
                    less="Show less"
                    anchorClass="showMoreText"
                    expanded={false}
                >
                    {description}
                </ShowMoreText>
            </div>
        </div>
    )
}

export default VideoMetaData
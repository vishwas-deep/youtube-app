import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// local dependencies
import './video.scss';
import 'react-loading-skeleton/dist/skeleton.css'
import request from '../../api';
import { useNavigate } from 'react-router-dom';


const Video = ({ video, channelScreen }) => {

    // destructure data from video object
    const {
        id,
        snippet: { channelId,
            channelTitle,
            title,
            publishedAt,
            thumbnails: {
                medium
            }
        },
        contentDetails
    } = video

    // maintain state
    const [views, updateViews] = useState(null);
    const [duration, updateDuration] = useState(null);
    const [channelIcon, updateChannelIcon] = useState(null);

    // resolve duration
    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format("mm:ss")
    
    const _videoId = id?.videoId || contentDetails?.videoId || id;

    // get video data
    useEffect(() => {
        const getVideoDetails = async () => {
            const { data: { items } } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: _videoId
                }
            })
            updateDuration(items[0]?.contentDetails?.duration)
            updateViews(items[0]?.statistics?.viewCount)
        }
        getVideoDetails();
    }, [_videoId])

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
    
    // handle video click
    const handleVideoClick = () => {
        navigate(`/watch/${_videoId}`)
    }

    return (
        <div className='video' onClick={handleVideoClick}>

            {/* image and timestamp */}
            <div className='video__top'>
                <LazyLoadImage
                    src={medium?.url}
                    effect="blur"
                    debounce={false}
                />
                <span className='video__top__duration'>{_duration}</span>
            </div>

            {/* title */}
            <div className='video__title'>
                {title}
            </div>

            {/* eye icon and video details */}
            <div className='video__details'>
                <span style={{marginRight: 4}}>
                    <AiFillEye /> {numeral(views).format("0.a")} Views • {' '}
                </span>
                <span>{moment(publishedAt).fromNow()}</span>
            </div>

            {/* channel details */}
            {!channelScreen && <div className='video__channel'>
                <LazyLoadImage
                    src={channelIcon?.url}
                    effect="blur"
                    debounce={false}
                /> 
                <p>{channelTitle}</p>
            </div>}

        </div>
    )
}

export default Video
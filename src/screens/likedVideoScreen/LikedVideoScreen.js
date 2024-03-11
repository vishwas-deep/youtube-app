import React, { useEffect } from 'react'
import './likedVideoScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedVideos } from '../../redux/actions/videos.action'
import { Col, Container, Row } from 'react-bootstrap'
import Video from '../../components/video/Video'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'

const LikedVideoScreen = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLikedVideos())
    }, [dispatch])

    const { videos, loading } = useSelector(state => state.likedVideos) ?? {}

    return (
        <Container>
            <Row>
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
            </Row>

        </Container>
    )
}

export default LikedVideoScreen
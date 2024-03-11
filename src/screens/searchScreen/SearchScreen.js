import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideosBySearch } from '../../redux/actions/videos.action'
import { Container } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import RelatedVideosBar from '../../components/relatedVideosBar/RelatedVideosBar'

const SearchScreen = () => {

    const { query } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideosBySearch(query))
    }, [dispatch, query])

    const { videos, loading } = useSelector(state => state.searchVideo)

    return (
        <Container>
            {
                !loading ?
                    videos?.map((video) =>
                        <RelatedVideosBar video={video} key={video.id.videoId} searchScreen={true} />
                    ) :
                    <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                        <Skeleton width={'100%'} height={'160px'} count={20} />
                    </SkeletonTheme>
            }
        </Container>
    )
}

export default SearchScreen
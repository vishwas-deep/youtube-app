import { CHANNEL_DETAILS_REQUEST, CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEO_FAIL, HOME_VIDEO_REQUEST, HOME_VIDEO_SUCCESS, LIKED_VIDEOS_FAIL, LIKED_VIDEOS_REQUEST, LIKED_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_QUERY_FAIL, SEARCH_QUERY_REQUEST, SEARCH_QUERY_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIBED_CHANNEL_FAIL, SUBSCRIBED_CHANNEL_REQUEST, SUBSCRIBED_CHANNEL_SUCCESS } from "../actionTypes"
import request from "../../api"

export const getPopularVideos = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEO_REQUEST,
        });
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 20, //20
                pageToken: getState().homeVideos.nextPageToken,
            }
        })

        dispatch({
            type: HOME_VIDEO_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: 'All'
            }
        })
    }
    catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEO_FAIL,
            payload: error.message
        })
    }
}

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEO_REQUEST,
        });
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                maxResults: 20, //20
                pageToken: getState().homeVideos.nextPageToken,
                q: keyword,
                type: 'video'
            }
        })

        dispatch({
            type: HOME_VIDEO_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: keyword
            }
        })
    }
    catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEO_FAIL,
            payload: error.message
        })
    }
}

export const getVideoById = (id) => async dispatch => {
    try {
        dispatch({
            type: SELECTED_VIDEO_REQUEST
        })
        const { data } = await request('./videos', {
            params: {
                part: 'snippet,statistics',
                id: id
            }
        })
        dispatch({
            type: SELECTED_VIDEO_SUCCESS,
            payload: data.items[0]
        })

    } catch (error) {
        console.log(error.message);
        dispatch({
            type: SELECTED_VIDEO_FAIL,
            payload: error.message
        })

    }
}

export const getRelatedVideos = (keyword) => async dispatch => {
    try {
        dispatch({
            type: RELATED_VIDEO_REQUEST,
        })

        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                maxResults: 20, //20
                q: keyword,
                type: 'video'
            }
        })
        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getVideosBySearch = keyword => async dispatch => {
    try {
        dispatch({
            type: SEARCH_QUERY_REQUEST,
        })
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                maxResults: 20, //20
                q: keyword,
                type: 'video,channel',
            },
        })

        dispatch({
            type: SEARCH_QUERY_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: SEARCH_QUERY_FAIL,
            payload: error.message,
        })
    }
}

export const getSubscribedChannel = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBSCRIBED_CHANNEL_REQUEST
        })
        const { data } = await request('/subscriptions', {
            params: {
                part: 'snippet,contentDetails',
                mine: true,
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        dispatch({
            type: SUBSCRIBED_CHANNEL_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        console.log(error?.response?.data)
        dispatch({
            type: SUBSCRIBED_CHANNEL_FAIL,
            payload: error?.response?.data
        })
    }
}

export const getVideosByChannel = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CHANNEL_DETAILS_REQUEST
        })

        // 1. get upload playlist id
        const { data: { items } } = await request('/channels', {
            params: {
                part: 'contentDetails',
                id: id
            }
        })

        const uploadPlaylistId = items[0]?.contentDetails?.relatedPlaylists?.uploads

        // 2. get videos using uploadPlaylistId
        const { data } = await request('/playlistItems', {
            params: {
                part: 'contentDetails,snippet',
                playlistId: uploadPlaylistId,
                maxResults: 30 //30
            }
        })
        dispatch({
            type: CHANNEL_VIDEOS_SUCCESS,
            payload: data.items,
        })

    } catch (error) {
        console.log(error?.response?.data?.message)
        dispatch({
            type: CHANNEL_VIDEOS_FAIL,
            payload: error?.response?.data?.message
        })
    }
}

export const getLikedVideos = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIKED_VIDEOS_REQUEST
        })
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                mine: true,
                myRating: 'like',
                maxResults: 20
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })

        dispatch({
            type: LIKED_VIDEOS_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        console.log(error?.response?.data)
        dispatch({
            type: LIKED_VIDEOS_FAIL,
            payload: error?.response?.data
        })
    }
}
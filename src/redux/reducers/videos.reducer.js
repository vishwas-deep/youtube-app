import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEO_FAIL, HOME_VIDEO_REQUEST, HOME_VIDEO_SUCCESS, LIKED_VIDEOS_FAIL, LIKED_VIDEOS_REQUEST, LIKED_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_QUERY_FAIL, SEARCH_QUERY_REQUEST, SEARCH_QUERY_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIBED_CHANNEL_FAIL, SUBSCRIBED_CHANNEL_REQUEST, SUBSCRIBED_CHANNEL_SUCCESS } from "../actionTypes"

export const homeVideoReducer = (state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: 'All'
}, action
) => {
    const { type, payload } = action
    switch (type) {
        case HOME_VIDEO_SUCCESS:
            return {
                ...state,
                videos: state.activeCategory === payload.category ?
                    [...state.videos, ...payload.videos] :
                    payload.videos,
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCategory: payload.category
            }
        case HOME_VIDEO_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case HOME_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export const selectedVideoReducer = (
    state = {
        loading: true,
        video: null
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case SELECTED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SELECTED_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false
            }
        case SELECTED_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export const relatedVideoReducer = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case RELATED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case RELATED_VIDEO_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case RELATED_VIDEO_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}


export const searchVideoReducer = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case SEARCH_QUERY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SEARCH_QUERY_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case SEARCH_QUERY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}

export const subscribedChannelReducer = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case SUBSCRIBED_CHANNEL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SUBSCRIBED_CHANNEL_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case SUBSCRIBED_CHANNEL_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}


export const channelVideosReducer = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case CHANNEL_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CHANNEL_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case CHANNEL_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}

export const likedVideosReducer = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case LIKED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LIKED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case LIKED_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}
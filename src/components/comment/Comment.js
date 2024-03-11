import moment from 'moment'
import React from 'react'
import './comment.scss'

const Comment = ({_commentSnippet}) => {

    const {authorProfileImageUrl, authorDisplayName, textDisplay, publishedAt } = _commentSnippet
    
    return (
        <div className='comment p-2 d-flex'>
            {/* comment image */}
            <img
                src={authorProfileImageUrl}
                alt='avatar'
                className='rounded-circle mr-3'
            />

            {/* comment body */}
            <div className='comment__body'>
                <p className='comment__header mb-1'>
                    {`${authorDisplayName} • ${moment(publishedAt).fromNow()}`}
                </p>
                <p className='mb-0'>{textDisplay}</p>
            </div>

        </div>
    )
}

export default Comment
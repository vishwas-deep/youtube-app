import React, { useEffect, useState } from 'react';
import './comments.scss';
import Comment from '../comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getCommentsByVideoId } from '../../redux/actions/comments.action';

const Comments = ({ videoId, commentCount }) => {

    const dispatch = useDispatch();
    const [text, updateText] = useState('')

    useEffect(() => {
        dispatch(getCommentsByVideoId(videoId))
    }, [dispatch, videoId])

    const handleComment = (e) => {
        e.preventDefault();
        if (text.length === 0) {
            return;
        }
        dispatch(createComment(videoId, text))
        updateText('')
    }

    const commentList = useSelector(state => state?.commentList?.comments);
    const commentSnippet = commentList?.map((_commentList) => _commentList?.snippet?.topLevelComment?.snippet)

    const {user} = useSelector(state => state?.auth)
            
    return (
        <div className='comments'>
            {/* No. of Comments */}
            <p>{commentCount} Comments</p>

            {/* Comments input */}
            <div className='comments__form d-flex w-100 my-2 p-2'>
                <img
                    src={user?.photoUrl}
                    alt='avatar'
                    className='rounded-circle mr-3'
                />
                <form onSubmit={handleComment} className='d-flex flex-grow-1'>
                    <input
                        type='text'
                        className='flex-grow-1'
                        placeholder='Write a comment...'
                        value={text}
                        onChange={e => updateText(e.target.value)}
                    />
                    <button className='border-0 p-2'>Comment</button>
                </form>
            </div>

            {/* Comments list */}
            <div className='comments__list'>
                {
                    commentSnippet?.map((_commentSnippet, index) => {
                        return (
                            <Comment _commentSnippet={_commentSnippet} key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Comments
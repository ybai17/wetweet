import React, { useEffect } from "react";
import { useState } from "react";
import { Weather } from "./ExternalAPIWeather";
import {ConvertDateTime} from "./DateTimeUtil";
import userIcon from "../assets/user-icon.png";

import "./ItemList.css";
import { fetchGetWithAuth, fetchPostWithAuth } from "../security/fetchWithAuth";

import AddComment from "./AddComment";

const debug_mode = false;

function ItemList() {
    return (
        <div className="items-page-wrapper">
            <div className="post-list-wrapper-container"><PostListWrapper /></div>
            <Weather />
        </div>
    );
}

function PostListWrapper() {
    const [selectedPostId, setSelectedPostId] = useState(-1);
    const [posts, setPostState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPostComments, setSelectedPostComments] = useState([]);
    const [selectedPostLikes, setSelectedPostLikes] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            let tempPosts = [];

            await fetchGetWithAuth("/posts")
                    .then((data) => {
                        if (debug_mode) {
                            console.log("data: ");
                            console.log(data);
                        }
                        
                        data.map((currPost) => {
                            tempPosts = [...tempPosts, currPost];
                        });
                    })
                    .then(() => {
                        if (debug_mode)
                            console.log(posts);
                    })
                    .catch((error) => {
                        alert("Error: " + error);
                    });
            
            setPostState(tempPosts);
            setIsLoading(false);
        };

        fetchPosts();
    }, []);

    function selectPost(id) {
        if (debug_mode)
            console.log("Old selected id: " + selectedPostId);

        const newId = id;
        setSelectedPostId(newId);

        if (debug_mode)
            console.log("selected " + newId);

        let tempComments = [];
        let tempLikes = [];

        fetchGetWithAuth(`/posts/${newId}/comments`)
            .then((data) => {
                if (debug_mode) {
                    console.log("Comment promise: ");
                    console.log(data);
                }

                data.comments.forEach((currComment) => {
                    tempComments = [...tempComments, currComment];
                });

                const loadedComments = tempComments.slice(0);
                setSelectedPostComments(loadedComments);

                return fetchGetWithAuth(`/posts/${newId}/likes`);
            })
            .then((data) => {
                if (debug_mode) {
                    console.log("Likes promise: ");
                    console.log(data);
                }

                data.likes.forEach((currLike) => {
                    tempLikes = [...tempLikes, currLike];
                });

                const loadedLikes = tempLikes.slice(0);
                setSelectedPostLikes(loadedLikes);
            })
            .catch((error) => {
                alert("Error occurred: " + error);
            });
    }

    function likePost(id) {
        if (debug_mode)
            console.log("Liked post " + id);

        fetchPostWithAuth(`/posts/${id}/like`, {id})
        .then((data) => {
            if (debug_mode)
                console.log("Selecting post " + id + "again to refresh:");
            selectPost(id);
        })
        .catch((error) => {
            alert("Error occurred when liking post: " + id + ": " + error);
        });
    }

    return (
        <div className="items-list">
            {isLoading ? (<Loading />) : 
                <PostList
                    posts={posts}
                    selectPost={selectPost}
                    comments={selectedPostComments}
                    likes={selectedPostLikes}
                    selectedPostId={selectedPostId}
                    onClickLike={likePost}
                />
            }
        </div>
    );
}

function Loading() {
    return (
        <div className="loading">
            <p>Loading...</p>
        </div>
    )
}

function PostList({ posts, selectPost, comments, likes, selectedPostId, onClickLike }) {

    return (
        <div className="post-list">
            {
                posts.map((currPost) => {
                    return(
                        <Post
                            key={currPost.id}
                            id={currPost.id}
                            postContent={currPost.content}
                            authorId={currPost.authorId}
                            createdAt={currPost.createdAt}
                            onSelected={selectPost}
                            comments={currPost.id == selectedPostId ? comments : null}
                            likes={currPost.id == selectedPostId ? likes : null}
                            onClickLike={onClickLike}
                        />
                    );
                })
            }
        </div>
    );
}

function Post({id, postContent, authorId, createdAt, onSelected, comments, likes, onClickLike }) {

    let postDateTime = ConvertDateTime(createdAt);

    let convertedDate = postDateTime.date;
    let convertedTime = postDateTime.time;

    return (
        <div className="post-element" aria-label="Post" id={`post-${id}`}>
            <img className="post-user-icon" src={userIcon} aria-label="User Icon" />
            <br/>
            <b>User {authorId}</b>
            <p>{postContent}</p>
            <p>Posted on {convertedDate.month} {convertedDate.date}, {convertedDate.year} @ {convertedTime}</p>
            <button className="comment-like-button" onClick={() => onSelected(id)} aria-label="View Comments and Likes">
                View Comments and Likes
            </button>
            <div className="comment-like-wrapper">
                <AddComment postId={id} />
                <CommentList comments={comments} />
                <br/>
                <LikeList likes={likes} />
                <LikeButton postId={id} onClickLike={onClickLike}/>
            </div>
        </div>
    );
}

function CommentList({ comments }) {

    if (comments != null) {
        return (
            <div className="comment-list">
                {comments.map((currComment) => {
                    return(
                        <Comment 
                            key={currComment.id}
                            id={currComment.id}
                            commentContent={currComment.content}
                            authorId={currComment.userId}
                            createdAt={currComment.createdAt}/>
                    );
                })}
            </div>
        );
    }

    return(
        <div className="comment-list">
        </div>
    );
}

function Comment({id, commentContent, authorId, createdAt}) {

    let commentDateTime = ConvertDateTime(createdAt);

    let commentDate = commentDateTime.date;
    let commentTime = commentDateTime.time;

    return (
        <div className="comment" id={id} aria-label="Comment">
            <img className="post-user-icon" src={userIcon} aria-label="User Icon"/>
            <br/>
            <b>User {authorId}</b>
            <p>{commentContent}</p>
            <p>
                {commentDate.month} {commentDate.date}, {commentDate.year} @ {commentTime}
            </p>
            
        </div>
    );
}

function LikeList({ likes }) {

    if (likes != null) {
        return (
            <div className="like-list">
                {
                    likes.map((currLike) => {
                        return (
                            <Like
                                key={currLike.id}
                                userId={currLike.userId} />
                        );
                    })
                }
            </div>
        );
    }

    return(
        <div className="like-list">
        </div>
    );
}

function Like({ id, userId }) {
    return (
        <div className="like" id={id} aria-label="Like">
            <strong>User {userId} liked this</strong>
        </div>
    );
}

function LikeButton({ postId, onClickLike}) {
    return (
        <button className="comment-like-button" onClick={() => onClickLike(postId)}>Like!</button>
    )
}

export default ItemList;
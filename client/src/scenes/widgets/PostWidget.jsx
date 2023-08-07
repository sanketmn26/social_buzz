import {
  ChatBubbleOutlined,
  FavoriteBorder,
  FavoriteBorderOutlined,
  DeleteOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  setState,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // Like post API
  const patchLike = async () => {
    const response = await fetch(
      // `http://localhost:3001/posts/${postId}/like`,
      `https://social-buzz-server.onrender.com/posts/${postId}/like`,

      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // Delete post API
  const deletePost = async () => {
    const response = await fetch(
      // `http://localhost:3001/posts/${postId}/delete`,
      `https://social-buzz-server.onrender.com/posts/${postId}/delete`,

      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const updatedPosts = await response.json();
    setState();
  };

  return (
    <>
      <WidgetWrapper mb="2rem" sx={{ boxShadow: "0px 1px 7px #858585" }}>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            // src={`http://localhost:3001/assets/${picturePath}`}
            src={`https://social-buzz-server.onrender.com/assets/${picturePath}`}

          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            {/* Like button section */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            {/* Comment button section */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          {/* Share icon */}
          <FlexBetween>
            <IconButton alignItem="right">
              <ShareOutlined />
            </IconButton>

            {postUserId === loggedInUserId && (
              <IconButton>
                <DeleteOutlined onClick={deletePost} sx={{ color: "red" }} />
              </IconButton>
            )}
          </FlexBetween>
        </FlexBetween>

        {/* Comment section */}
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;

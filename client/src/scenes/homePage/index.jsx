import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import { useSelector } from "react-redux";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <>
      <Box>
        <Navbar />
        <Box
          // width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="1.5rem"
          justifyContent="space-between"
        >
          {/* First section */}
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>

          {/* Second section */}
          <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>

          {/* Third section */}

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0">
              <FriendListWidget userId={_id} />
            </Box>
          </Box>
        )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;

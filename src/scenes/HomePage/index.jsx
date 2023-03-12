import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget';
import { useSelector } from 'react-redux';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import AdvertWidgets from '../widgets/AdvertWidgets';
import FriendListWidget from '../widgets/FriendListWidget'


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const user = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between">
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user?.picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
          <MyPostWidget picturePath={user?.picturePath} />
          <PostsWidget userId={user._id} isProfile={false} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidgets />
            <Box m="2rem 0" />
            <FriendListWidget userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage;
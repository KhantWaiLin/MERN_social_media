import React, { useEffect, useState } from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../state';

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.user.friends);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const [currentFriends, setCurrentFriends] = useState([]);

    const getFriends = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json",
            });

        const data = await response.json();
        dispatch(setFriends({ friends: data }));
        setCurrentFriends(data);
    }

    useEffect(() => {
        getFriends();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                fontWeight="500"
                variant="h5"
                sx={{ mb: "1.5rem" }}>
                Friends List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {
                    currentFriends?.map((friend) => (
                        <Friend key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                        />
                    ))
                }
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget
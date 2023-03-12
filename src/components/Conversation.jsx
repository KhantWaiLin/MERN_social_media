import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';



const Conversation = ({ data, currentUser, token, online }) => {

    const [userData, setUserData] = useState(null);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const userId = data.members.find((id) => id !== currentUser);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUserData(data);
    }

    useEffect(() => {
        getUser();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps


    return (
        < Box flex={1} display="flex" alignItems="center" padding="10px" sx={{
            minWidth: "100%",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "#cfd8dc",
            }
        }}>
            {online && <div className='online-dot' />}

            <img src={`http://localhost:3001/assets/${userData?.picturePath}`} alt="user"

                style={{
                    objectFit: 'cover',
                    borderRadius: "50%",
                }}
                width={60}
                height={60} />

            <div className="name" style={{
                fontSize: "0.8rem", display: "flex", flexDirection: "column", marginLeft: "20px",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    {userData?.firstName} {userData?.lastName}
                </span>
                <span>{online ? "online" : "offline"}</span>
            </div>
        </Box >


    )
}

export default Conversation
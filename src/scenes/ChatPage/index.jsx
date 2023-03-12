import { useState, useEffect, useRef } from 'react';
import './index.css';
import Navbar from '../navbar';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Conversation from '../../components/Conversation';
import ChatBox from '../../components/ChatBox';
import { io } from 'socket.io-client';

const Chat = () => {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:500px)");

    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const navigate = useNavigate();
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    console.log(receivedMessage);

    const userChats = async () => {
        const response = await fetch(
            `http://localhost:3001/chat/${user?._id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        setChats(data);
    };

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io("http://localhost:8080");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    console.log(onlineUsers);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    // Get the message from socket server
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceivedMessage(data);
        }

        );
    }, [receivedMessage]);


    useEffect(() => {
        userChats();
    }, [user]); //eslint-disable-line react-hooks/exhaustive-deps

    const checkOnlineStatus = (chat) => {
        const chatMember = chat?.members?.find((member) => member !== user?._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);

        return online ? true : false;
    }

    return (
        <div>
            <Navbar />
            <div className="Chat">
                {/* Left-Side-Chat */}
                <div className='Left-side-chat'>
                    <div className='Chat-container'>

                        <h2>Chats</h2>
                        <div className="Chat-list">
                            {chats.map((chat) => (
                                <div key={chat?._id} onClick={() => {
                                    setCurrentChat(chat);
                                    !isNonMobileScreens && navigate("/chat/mobile-chat")
                                }}>
                                    <Conversation data={chat} currentUser={user?._id} token={token}
                                        online={checkOnlineStatus(chat)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isNonMobileScreens && <div className='Right-side-chat'>
                    <ChatBox chat={currentChat} currentUser={user?._id} token={token}
                        setSendMessage={setSendMessage}
                        setReceivedMessage={setReceivedMessage}
                        receivedMessage={receivedMessage} />
                </div>}
            </div>
        </div>
    )
}

export default Chat
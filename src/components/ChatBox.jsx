import { useState, useEffect, useRef } from 'react';
import { format } from 'timeago.js';
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, token, setSendMessage, setReceivedMessage, receivedMessage }) => {

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const scroll = useRef();

    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUserData(data);
    }

    // fetching Data for messages

    const getMessages = async () => {
        const response = await fetch(`http://localhost:3001/message/${chat?._id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setMessages(data);
    }

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat?._id,
        }

        const response = await fetch("http://localhost:3001/message", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
        const data = await response.json();
        setMessages([...messages, data]);
        setNewMessage('');

        //send message to socket server
        const receiverId = chat?.members?.find((id) => id !== currentUser);
        setSendMessage({ ...message, receiverId });
    }

    useEffect(() => {
        getMessages();
    }, [chat])


    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
            setReceivedMessage(null);
        }
    }, [receivedMessage])

    useEffect(() => {
        if (chat !== null) getUser();
    }, [chat, currentUser]);  //eslint-disable-line react-hooks/exhaustive-deps


    //scroll to the last messages
    useEffect(() => {
        scroll.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);



    if (!chat) return <h4 style={{ fontSize: "24px", alignItems: "center" }}>Tap on a Chat to start Conversation </h4>

    return (
        <>
            <div style={{ marginTop: "20px" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={`http://localhost:3001/assets/${userData?.picturePath}`} alt="user"

                            style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                            width={60}
                            height={60} />
                        <div className="name">
                            <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "20px" }}>
                                {userData?.firstName} {userData?.lastName}
                            </span>
                        </div>
                    </div>
                    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                </div>
            </div>
            {/* Chat Messages */}
            <div className='chat-body'>
                {
                    messages?.map((message) => (
                        <div ref={scroll} key={message._id} style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "column",
                            margin: "20px"
                        }}
                            className={message?.senderId === currentUser ? "messageWrapperUser " : "messageWrapperOther"}
                        >
                            <div className={message?.senderId === currentUser ?
                                "message own" : "message"}>
                                <span>{message?.text}</span>
                                <span>{format(message?.createdAt)}</span>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Chat - Sender */}
            <div className='chat-sender'>
                <div style={{
                    backgroundColor: "#fcf75e",
                    padding: "10px",
                    borderRadius: "20px"
                }}>+</div>
                <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                    placeholder="Type a message"
                    style={{ width: "20px" }}
                />
                <div className="button" onClick={handleClick}>
                    send
                </div>
            </div>
        </>
    )
}

export default ChatBox;
import { useEffect, useRef, useState } from "react";
import socketIOClient from  "socket.io-client";
import UserLogin from "./UserLogin";
import InputText from './InputText';
import ChatBoxReceiver, { ChatBoxSender } from './ChatBox';

function ChatContainer() {
    
    let socketio = socketIOClient('http://localhost:3000');
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

    const chatListRef = useRef(null);

    useEffect(() => {
        socketio.on('chat', senderChats =>{
            setChats(senderChats);
        })
        // Cleanup on component unmount
        return () => {
            socketio.off('chat');
        };
    }, [socketio]);

    //To scroll when chats update
    useEffect(() => {
        // Automatically scroll to the latest message
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [chats]);

    function sendChatToSocket(chat) {
        socketio.emit("chat", chat);
    }

    function addMessage(chat){
        const newChat = {...chat, user, avatar};
        setChats([...chats, newChat]);
        sendChatToSocket([...chats, newChat]);
    }

    function logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setUser("");   
        socketio.disconnect();
    }

    function ChatsList(){
        return chats.map((chat, index) => {
            if(chat.user === user) {
                return <ChatBoxSender  key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
            }else {
                return <ChatBoxReceiver key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
            }
        });
    }
    
    return ( 
        <div className>
            {
            user? <div>
                <div className="header-panel">
                    <h1>Chat</h1>
                    <div className = "logOutButton-container">
                        <button className="logOutButton"
                            onClick={()=> logout()}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
                <div className="chatList-container" ref={chatListRef}>
                    <ChatsList />
                </div>
                <InputText addMessage={addMessage} />
            </div>: 
            <UserLogin setUser={setUser}/>
            }
        </div> 
    );
}

export default ChatContainer;
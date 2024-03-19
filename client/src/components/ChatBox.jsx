import {Avatar, Image} from 'antd';
import '../App.css';

export default function ChatBoxReceiver({avatar, user, message}) {
    return (
        <div className="chatBoxReceiver">
            <Avatar
            size = {50}
            src={<Image
                src = {avatar}
                style = {{
                    objectFit: "cover",  
                    width: 45,  
                    height: 45,
                    borderRadius: "100%"
                }}
                preview = {false}
                />}
            />

            <p style = {{padding: 10, backgroundColor: '#ff7e5f', borderRadius: 10, maxWidth: "60%"}}>
                <strong style = {{fontSize:13}}>
                        {user}
                </strong> <br></br>
                {message}
            </p>

        </div>
    );
}

export function ChatBoxSender() {
    return (
        <div className="chatBoxSender">ChatBoxSender</div>
    );
}

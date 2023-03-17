import { useRef } from "react";
import { io } from "socket.io-client";
// import { socket } from "../../backend/server";

const Chat = () => {

    const input = useRef();
    const ul = useRef();
    const socket = io();
    const f = () => {
        socket.emit('op', input.current.value);
        console.log(input.current.value);
        input.current.value = '';
    };

    socket.on('op', op => {
        const li = document.createElement('li');
        li.textContent = op;
        ul.current.appendChild(li);
    });

    return (
        <div>
            <input ref={input} type="text" onChange={f} />
            <ul ref={ul}></ul>
        </div>
    );
};

export default Chat;
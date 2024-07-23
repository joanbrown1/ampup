import { io } from 'socket.io-client';

const socket = io('https://ampupserver.onrender.com'); // Adjust the URL to match your server

export default socket;

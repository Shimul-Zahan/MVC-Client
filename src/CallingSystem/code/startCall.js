import io from 'socket.io-client';

export const handleStartCalling = async (setCalling, setCallStatus) => {
    setCalling(true);
    setCallStatus('dialing');

    // STUN server for NAT traversal
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ],
    });

    // connect socket.io from serve
    const socket = io('http://localhost:5000');
}
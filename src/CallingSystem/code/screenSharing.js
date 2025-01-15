export const startScreenSharing = async (localStream,
    setLocalStream,
    videoRefLocal,
    setOriginalVideoTrack,
    setScreenStream) => {
    
    if (!localStream) return;

    // Save the original video track if switching back later
    const originalVideoTrack = localStream.getVideoTracks()[0];
    setOriginalVideoTrack(originalVideoTrack)
    let screenStream;

    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        });

        const screenTrack = screenStream.getVideoTracks()[0];
        videoRefLocal.current.srcObject = screenStream;
        setLocalStream(screenStream);
        setLocalStream(screenStream)
        console.log("Screen sharing started");

        screenTrack.onended = () => {
            stopScreenSharing(originalVideoTrack, videoRefLocal, setLocalStream);
        };

    } catch (error) {
        console.error("Error starting screen sharing:", error);
    }
};

export const stopScreenSharing = (originalVideoTrack, videoRefLocal, setLocalStream) => {
    console.log('Stopping screen sharing...');

    if (originalVideoTrack) {
        const newStream = new MediaStream([originalVideoTrack]);
        videoRefLocal.current.srcObject = newStream;
        setLocalStream(newStream);
        console.log("Screen sharing stopped, switched back to camera.");
    } else {
        console.error("Original video track is missing.");
    }
};

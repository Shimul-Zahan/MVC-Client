export const endCallAction = async (setCalling,
    setCallStatus,
    localStream,
    videoRefLocal,
    videoRefRemote, screenStream) => {

    // Stop all media tracks (audio and video)
    if (localStream) {
        console.log('1st function');
        localStream.getTracks().forEach(track => track.stop());
    }

    // Optionally clear the video elements
    const localVideoElement = videoRefLocal.current;
    if (localVideoElement) {
        console.log('second function');
        localVideoElement.srcObject = null;
    }

    // for stop sharing
    if (screenStream) {
        console.log('Stopping screen sharing tracks');
        screenStream.getTracks().forEach(track => track.stop());
    }

    const remoteVideoElement = videoRefRemote.current;
    if (remoteVideoElement) {
        console.log('third function');
        remoteVideoElement.srcObject = null;
    }

    setCalling(false);
    setCallStatus('ended');
}
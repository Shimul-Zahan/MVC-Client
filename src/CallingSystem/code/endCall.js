export const endCallAction = async (setCalling,
    setCallStatus,
    localStream,
    videoRefLocal,
    videoRefRemote) => {

    // Stop all media tracks (audio and video)
    if (localStream) {
        console.log('1st function');
        localStream.getTracks().forEach(track => track.stop());
    }

    // Optionally clear the video elements
    const localVideoElement = videoRefLocal.cureent;
    if (localVideoElement) {
        console.log('second function');
        localVideoElement.srcObject = null;
    }

    const remoteVideoElement = videoRefRemote.cureent;
    if (remoteVideoElement) {
        console.log('third function');
        remoteVideoElement.srcObject = null;
    }

    setCalling(false);
    setCallStatus('ended');
}
export const turnOffCamera = (localStream) => {
    if (!localStream) return;

    const videoTrack = localStream.getVideoTracks()[0];
    console.log(videoTrack);
    if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        console.log(`Camera is now ${videoTrack.enabled ? 'on' : 'off'}`);
    }
};

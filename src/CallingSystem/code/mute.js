export const mute = (localStream, setStatus) => {
    console.log(localStream);
    if (!localStream) return
    console.log(localStream.getAudioTracks()[0]);
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setStatus({ audio: "mute" })
    }
}
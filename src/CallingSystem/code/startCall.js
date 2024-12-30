export const handleStartCalling = async (setCalling, setCallStatus) => {
    setCalling(true);
    setCallStatus('dialing');
    console.log("Call Started");
}
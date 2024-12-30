export const endCallAction = async (setCalling, setCallStatus) => {
    setCalling(false);
    setCallStatus('ended');
    console.log("Call Ended");
}
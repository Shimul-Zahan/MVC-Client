export const getConversationId = (user, users) => {
    const id = users[0]._id === user._id ? users[1]._id : users[0]._id
    return id
}
export const getConversationName = (user, users) => {
    const name = users[0]._id === user._id ? users[1]?.name : users[0]?.name
    return name
}
export const getConversationPicture = (user, users) => {
    const image = users[0]._id === user._id ? users[1].image : users[0].image
    return image
}
export const checkOnlineStatus = (onlineUsers, user, users) => {
    let convoId = getConversationId(user, users)
    let check = onlineUsers.find((u) => u.userId === convoId)
    return check ? true : false
}
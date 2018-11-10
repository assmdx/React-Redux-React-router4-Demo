export function getRedirectPath({type,avatar}){
    //根据用户信息 返回跳转地址
    // user.type /boss /genius
    // user.avatar /bossinfo /geniusinfo
    let url = (type === 'boss' ? '/boss' : '/genius')
    //如果没有头像信息，让用户去完善信息
    if(!avatar){
        url += 'info'
    }
    return url
}

export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_')
}

export function getEmojiUrl(text){
    console.log(text.match(/<img src="(\S*)"/)[1])
    return text.match(/<img src="(\S*)"/)[1]
}
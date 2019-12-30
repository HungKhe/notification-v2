export const initCheckTypeUrl = str => {
    const regExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/ig;
    return regExp.test(str);
}
export const findItemInList = (list, id) => {
    let ind = list.findIndex(item => {return id.indexOf(item._id) !== -1});
    return ind;
}
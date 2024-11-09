export const GetMessageError = (body) => {
    if (body.detail) {
        return body.detail;
    } else {
        if (body.messages && body.messages.length > 0) {
            return body.messages[0].content;
        }
    }
    return "Unknow Error";
}
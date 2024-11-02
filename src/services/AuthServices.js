import { API_LOGIN_ACCOUNT, API_REGISTER_ACCOUNT, HTTP_HEADER_JSON, ResponseData } from "../constants/Constant"
export const ApiRegisterAccount = async (data, role) => {
    const response = await fetch(`${API_REGISTER_ACCOUNT}?role=${role}`, {
        method: "POST",
        headers: HTTP_HEADER_JSON,
        body: JSON.stringify(data)
    });
    return ResponseData(response);
}
export const ApiLoginByAccount = async (data) => {
    const response = await fetch(API_LOGIN_ACCOUNT, {
        method: "POST",
        headers: HTTP_HEADER_JSON,
        body: JSON.stringify(data),
    });
    return ResponseData(response);
}
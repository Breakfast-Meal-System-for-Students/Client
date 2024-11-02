import { GetMessageError } from "../utils/StringUtils";
/*
 ** HTTP CONFIG
 */
export const HTTP_SERVER = "https://bms-fs-api.azurewebsites.net";
/*
 ** REQUEST CONFIG
 */
export const HTTP_HEADER_JSON = {
    'Content-Type': 'application/json'
}
/*
 ** RESPONSE CONFIG
 */
export const ResponseData = async (res) => {
    try{
        const body = await res.json();
        console.log(body.isSuccess);
        if (res.ok && body.isSuccess) {
            return {
                ok: true,
                message: "Data transaction success",
                body
            };
        } else {
            return {
                ok: false,
                message: GetMessageError(body),
                body
            };
        }
    } catch (e) {
        console.log("ERROR: " + e);
        return {
            ok: false,
            message: "Unknow Server Error",
            body: []
        };
    }
};
/*
 ** API AUTH
 */
export const API_REGISTER_ACCOUNT = HTTP_SERVER + "/api/Auth/register";
export const API_LOGIN_ACCOUNT = HTTP_SERVER + "/api/Auth/login";
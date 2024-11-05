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
export const HTTP_MULTIPART_FORM_DATA = {
    'accept': '*/*',
}

/*
 ** RESPONSE CONFIG
 */
export const ResponseData = async (res) => {
    try{
        const body = await res.json();
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
 ** CONFIG VARIABLES
 */
 export const DIGIT_CODE_EXPIRED = 60;
 export const ENABLE_DEBUG_CHANGE_PASSWORD = true;
 export const ENABLE_DEBUG_DIGIT_CODE = true;
 export const DIGIT_CODE_DEFAULT = "123456";

/*
 ** API AUTH
 */
export const API_REGISTER_ACCOUNT = HTTP_SERVER + "/api/Auth/register";
export const API_LOGIN_ACCOUNT = HTTP_SERVER + "/api/Auth/login";
export const API_CONFIRM_DIGIT_CODE = HTTP_SERVER + "/api/Auth/confirm-digit-code";
export const API_CHANGE_PASSWORD = HTTP_SERVER + "/api/Auth/change-password";

/*
 ** API PRODUCT
 */
 export const AIP_UPDATE_PRODUCT = HTTP_SERVER + "/api/Product/";
 export const API_GET_PRODUCTS_BY_SHOP_ID = HTTP_SERVER + "/api/Product/all-product-by-shop-id";
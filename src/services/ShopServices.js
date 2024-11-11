import * as Constant from "../constants/Constant"

export const ApiCreateShop = async (email, name, phone, address, password, description) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("description", description);
    const response = await fetch(Constant.AIP_CREATE_SHOP, {
        method: "POST",
        body: formData,
    });
    return Constant.ResponseData(response);
}

export const ApiUpdateShop = async (shopId, image, name, phone, address, description) => {
    const formData = new FormData();
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("description", description);
    formData.append('image', image);
    const response = await fetch(Constant.AIP_UPDATE_SHOP + shopId, {
        method: "PUT",
        body: formData,
    });
    return Constant.ResponseData(response);
}

export const ApiGetShopById = async (shopId) => {
    const response = await fetch(Constant.API_GET_SHOP_BY_ID + shopId);
    return Constant.ResponseData(response);
}
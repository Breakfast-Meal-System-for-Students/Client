import { AIP_UPDATE_PRODUCT, API_GET_PRODUCTS_BY_SHOP_ID, ResponseData } from "../constants/Constant"

export const ApiUpdateProduct = async (updatedProduct, productId) => {
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', updatedProduct.price);
    updatedProduct.images.forEach((img, index) => {
        formData.append(`images[${index}]`, img);
    });
    const response = await fetch(`${AIP_UPDATE_PRODUCT + productId}`, {
        method: "PUT",
        body: formData
    });
    return ResponseData(response);
}
export const ApiGetProductsByShopId = async (id, search, isDesc, pageIndex, pageSize) => {
    const params = new URLSearchParams({ id, search, isDesc, pageIndex, pageSize });
    const response = await fetch(`${API_GET_PRODUCTS_BY_SHOP_ID}?${params.toString()}`);
    return ResponseData(response);
}
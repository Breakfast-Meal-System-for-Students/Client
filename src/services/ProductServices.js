import { AIP_UPDATE_PRODUCT, AIP_GET_PRODUCT_BY_ID, AIP_CREATE_PRODUCT, API_GET_PRODUCTS_BY_SHOP_ID, ResponseData } from "../constants/Constant"
export const ApiGetProductByID = async (productId) => {
    const response = await fetch(`${AIP_GET_PRODUCT_BY_ID + productId}`);
    return ResponseData(response);
}

export const ApiUpdateProduct = async (updatedProduct, productId, imageFiles) => {
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', updatedProduct.price);
    imageFiles.forEach(image => formData.append('images', image));
    const response = await fetch(`${AIP_UPDATE_PRODUCT + productId}`, {
        method: "PUT",
        body: formData
    });
    return ResponseData(response);
}

export const ApiCreateProduct = async (name, description, price, shopId, images) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('shopId', shopId);
    images.forEach(image => formData.append('images', image));
    const response = await fetch(`${AIP_CREATE_PRODUCT}`, {
        method: "POST",
        body: formData
    });
    return ResponseData(response);
}
export const ApiGetProductsByShopId = async (id, search, isDesc, pageIndex, pageSize) => {
    const params = new URLSearchParams({ id, search, isDesc, pageIndex, pageSize });
    const response = await fetch(`${API_GET_PRODUCTS_BY_SHOP_ID}?${params.toString()}`);
    return ResponseData(response);
}
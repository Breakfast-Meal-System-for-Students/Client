import { AIP_UPDATE_PRODUCT, HTTP_MULTIPART_FORM_DATA, ResponseData } from "../constants/Constant"
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
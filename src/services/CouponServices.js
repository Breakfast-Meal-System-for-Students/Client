import * as Constant from "../constants/Constant"

export const ApiCreateCoupon = async (name, percentDiscount, isPercentDiscount, maxDiscount, minPrice, minDiscount, shopId) => {
    const response = await fetch(`${Constant.API_CREATE_COUPON}`, {
        method: "POST",
        headers: Constant.HTTP_HEADER_JSON,
        body: JSON.stringify({
            shopId,
            name,
            percentDiscount: parseInt(percentDiscount),
            isPercentDiscount,
            maxDiscount: parseInt(maxDiscount),
            minPrice: parseInt(minPrice),
            minDiscount: parseInt(minDiscount)
        })
    });
    return Constant.ResponseData(response);
}
export const ApiUpdateCoupon = async (name, percentDiscount, isPercentDiscount, maxDiscount, minPrice, minDiscount, couponId) => {
    const response = await fetch(`${Constant.API_UPDATE_COUPON + couponId}`, {
        method: "PUT",
        headers: Constant.HTTP_HEADER_JSON,
        body: JSON.stringify({
            name,
            percentDiscount: parseInt(percentDiscount),
            isPercentDiscount,
            maxDiscount: parseInt(maxDiscount),
            minPrice: parseInt(minPrice),
            minDiscount: parseInt(minDiscount)
        })
    });
    return Constant.ResponseData(response);
}
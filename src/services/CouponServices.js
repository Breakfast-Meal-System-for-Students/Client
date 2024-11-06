import * as Constant from "../constants/Constant"
export const ApiCreateCoupon = async (name, percentDiscount, maxDiscount, minPrice, minDiscount) => {
    const response = await fetch(`${Constant.API_CREATE_COUPON}`, {
        method: "POST",
        headers: Constant.HTTP_HEADER_JSON,
        body: JSON.stringify({
            name,
            percentDiscount: parseInt(percentDiscount),
            maxDiscount: parseInt(maxDiscount),
            minPrice: parseInt(minPrice),
            minDiscount: parseInt(minDiscount)
        })
    });
    return Constant.ResponseData(response);
}
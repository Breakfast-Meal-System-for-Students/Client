import * as Constant from "../constants/Constant"
export const ApiGetPackages = async (search, isDesc, pageIndex, pageSize, token) => {
    const url = `${Constant.API_GET_PACKAGES}?search=${encodeURIComponent(search)}&isDesc=${isDesc}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const response = await fetch(url, {
        headers: Constant.HEADER_TOKEN(token)
    });
    return Constant.ResponseData(response);
}

export const ApiGetPackageById = async (packageId, token) => {
    const url = `${Constant.API_GET_PACKAGE_BY_ID}/${packageId}`;
    const response = await fetch(url, {
        headers: Constant.HEADER_TOKEN(token)
    });
    return Constant.ResponseData(response);
}

export const ApiBuyPackage = async (shopId ,packageId, token) => {
    const formData = new FormData();
    formData.append("shopId", shopId);
    formData.append("packageId", packageId);
    const response = await fetch(Constant.API_BUY_PACKAGE, {
        method: "POST",
        headers: Constant.HEADER_TOKEN(token),
        body: formData,
    });
    return Constant.ResponseData(response);
}

export const ApiCreatePaymentVNPayURL = async (shopId ,packageId, fullName) => {
    // const formData = new FormData();
    // formData.append("shopId", shopId);
    // formData.append("packageId", packageId);
    // const response = await fetch(Constant.API_BUY_PACKAGE, {
    //     method: "POST",
    //     headers: Constant.HEADER_TOKEN(token),
    //     body: JSON.stringify({
    //         shopI: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //         packageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //         fullName: "string",
    //         orderType: "string",
    //         description: "string",
    //         amount: 0,
    //         returnUrl": "string"
    //       }),
    // });
    // return Constant.ResponseData(response);
}
import * as Constant from "../constants/Constant"
export const ApiGetPackages = async (search, isDesc, pageIndex, pageSize) => {
    const url = `${Constant.API_GET_PACKAGES}?search=${encodeURIComponent(search)}&isDesc=${isDesc}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const response = await fetch(url);
    return Constant.ResponseData(response);
}

export const ApiGetPackageById = async (packageId) => {
    const url = `${Constant.API_GET_PACKAGE_BY_ID}/${packageId}`;
    const response = await fetch(url);
    return Constant.ResponseData(response);
}

export const ApiBuyPackage = async (shopId ,packageId) => {
    const formData = new FormData();
    formData.append("shopId", shopId);
    formData.append("packageId", packageId);
    const response = await fetch(Constant.API_BUY_PACKAGE, {
        method: "POST",
        body: formData,
    });
    return Constant.ResponseData(response);
}
import * as Constant from "../constants/Constant"
export const ApiGetPackages = async (search, isDesc, pageIndex, pageSize) => {
    const url = `${Constant.API_GET_PACKAGES}?search=${encodeURIComponent(search)}&isDesc=${isDesc}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const response = await fetch(url);
    return Constant.ResponseData(response);
}
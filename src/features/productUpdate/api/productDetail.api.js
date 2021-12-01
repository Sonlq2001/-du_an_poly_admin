import api from "api/api";
import { PRODUCTDETAIL_PATH } from "../constants/productUpdate.constants";
const getData =(id)=>{
    return api.get(PRODUCTDETAIL_PATH.DETAIL.replace(":id",id.toString()))
}
export const UpdateProductApi={
    getData
}
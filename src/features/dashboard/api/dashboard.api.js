import api from 'api/api';
const getData = () =>{
    return api.get("/dashboard")
}
export const dashboardApi = {
    getData
};
import api  from "./api"


const   getDashboardStats = async()=>{
 
    const {data} = await api.get("/admin/dashboard")
    
    return data;

}

const adminService = {
    getDashboardStats
}

export default adminService
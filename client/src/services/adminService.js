import api  from "./api"

//get status
const   getDashboardStats = async()=>{
 
    const {data} = await api.get("/admin/dashboard")
    
    return data;

}

const getUsers = async ()=>{
    const {data} = await api.get('/users')
    return data ;
}

const getUserById = async (id)=>{
   const {data } = await api.get(`/users/${id}`)
   return data ;
}

const updateUser = async (id , userData)=>{
    const {data} = await api.put(`/users/${id}`,userData)
    return data ;
}

const deleteUser = async (id) =>{
    const {data} = await api.delete(`/users/${id}`)
    return data ; 
}


const adminService = {
    getDashboardStats,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,


}

export default adminService
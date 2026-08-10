import api from './api'

const uploadImages = async (files)=>{

    const formData = new FormData()
 

    for(let i =0 ; i< files.length;i++){
        formData.append("images",
            files[i]
        )
    }

    const {data}= await api.post(
        "/upload",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    )
    return data 
} 

export default{
    uploadImages
}
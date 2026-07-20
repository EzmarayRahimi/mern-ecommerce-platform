import { useNavigate , useSearchParams } from "react-router-dom";

function    CategoryFilter (){

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    
    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";

    const changeHandler = (e)=>{
        const selectedCategory = e.target.value ;

        const query = [];

        if(keyword){
            query.push(`keyword=${keyword}`)
        }
        
        if(selectedCategory){
            query.push(`category=${selectedCategory}`)
        }

        navigate(`/?${query.join("&")}`)

    }

    return (
        <select value={category} onChange={changeHandler}>
            <option value="">All Category</option>
            <option value="labtop">labtop</option>
            <option value="mobile">mobile</option>
            <option value="monitor">monitor</option>
            <option value="general">general</option>
        </select>
    )
}

export default CategoryFilter
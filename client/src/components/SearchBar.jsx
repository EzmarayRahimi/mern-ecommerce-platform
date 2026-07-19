import { useState } from "react";
import { useNavigate} from "react-router-dom"


function SearchBar(){
    const [keyword , setKeyword] = useState("");
    const navigate = useNavigate();

  

    const submitHandler = (e)=>{
        e.preventDefault();
  if(keyword.trim()){
     navigate(`/?keyword=${keyword}`)
    }
    else{
        navigate("/")
    }

    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" 
                placeholder="search..." 
                value={keyword}
                onChange={(e)=>setKeyword(e.target.value)}     
                />

                <button type="submit">Search</button>
            </form>
        </div>
    )
}
export default SearchBar
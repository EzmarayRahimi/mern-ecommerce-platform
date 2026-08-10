   import { Link } from "react-router-dom"

function   ProductCart({product}){



    return( 
  <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
    >
     <img src={`http://localhost:3000${product.images[0]}`} 
    alt={product.name}
    width="200"/>

    <h2>{product.name}</h2>
    <p><strong>Price: $</strong>{product.price}</p>
    <p>{product.description}</p>
    <p><strong>Category: </strong>{product.category}</p>
    <p><strong>Rating: </strong>{product.rating}</p>

        <Link to={`/product/${product._id}`}>
        Veiw Details
        </Link>
    </div>

    )
}

export default ProductCart
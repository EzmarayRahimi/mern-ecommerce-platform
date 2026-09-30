


import { Link } from "react-router-dom";

function ProductCart({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="relative block overflow-hidden bg-slate-100"
      >
        <div className="flex h-56 items-center justify-center p-5">
          <img
            src={`http://localhost:3000${product.images[0]}`}
            alt={product.name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm backdrop-blur transition hover:text-indigo-600"
          aria-label="Add to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-4.5 w-4.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>
      </Link>

      {/* Product Information */}
      <div className="p-4">

        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-indigo-600">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`}>
          <h2 className="line-clamp-1 text-base font-semibold text-slate-900 transition group-hover:text-indigo-600">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-slate-500">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-amber-400">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span className="text-slate-300">★</span>
          </div>

          <span className="text-xs font-medium text-slate-500">
            {product.rating}
          </span>
        </div>

        {/* Price + Button */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-400">Price</p>

            <p className="text-lg font-bold text-slate-900">
              ${product.price}
            </p>
          </div>

          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
          >
            View Details

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCart;
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../services/productService";
import { useCart } from "../context/CartContext";

function ProductDetailsPage() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await productService.getProductById(id);

        setProduct(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load product!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

            <p className="text-sm font-medium text-slate-500">
              Loading product...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-500">
              !
            </div>

            <h1 className="text-lg font-semibold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              ?
            </div>

            <h1 className="text-xl font-semibold text-slate-900">
              Product Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The product you are looking for could not be found.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isInStock = product.countInStock > 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="font-medium text-slate-500 transition hover:text-indigo-600"
          >
            Home
          </Link>

          <span className="text-slate-300">/</span>

          <span className="truncate text-slate-900">
            {product.name}
          </span>
        </div>

        {/* Product Card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">

            {/* Product Image */}
            <div className="relative flex min-h-[360px] items-center justify-center bg-slate-50 p-6 sm:min-h-[500px] sm:p-10 lg:min-h-[600px]">

              <div className="absolute left-6 top-6 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                {product.category}
              </div>

              <img
                src={`http://localhost:3000${product.images[0]}`}
                alt={product.name}
                className="max-h-[420px] w-full max-w-[520px] object-contain transition duration-500 hover:scale-105"
              />
            </div>

            {/* Product Information */}
            <div className="flex flex-col p-6 sm:p-10 lg:p-12">

              {/* Category */}
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-lg text-amber-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-slate-300">★</span>
                </div>

                <span className="text-sm font-medium text-slate-600">
                  {product.rating}
                </span>

                <span className="text-slate-300">•</span>

                <span className="text-sm text-slate-500">
                  Customer rating
                </span>
              </div>

              {/* Price */}
              <div className="mt-7 border-y border-slate-100 py-6">
                <p className="text-sm text-slate-500">
                  Price
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  ${product.price}
                </p>
              </div>

              {/* Description */}
              <div className="mt-7">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Product Details
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {product.description}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6 flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isInStock
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                ></span>

                <span
                  className={`text-sm font-medium ${
                    isInStock
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {isInStock
                    ? `${product.countInStock} items in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => addToCart(product)}
                  disabled={!isInStock}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0a2.25 2.25 0 0 0-2.25 2.25v.75h13.5v-.75a2.25 2.25 0 0 0-2.25-2.25m-9 0L4.73 5.272A2.25 2.25 0 0 1 6.908 3.75h11.184a1.875 1.875 0 0 1 1.793 2.423l-1.8 6.075a2.25 2.25 0 0 1-2.156 1.612H7.5Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 19.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 0"
                    />
                  </svg>

                  {isInStock ? "Add to Cart" : "Out of Stock"}
                </button>

                <Link
                  to="/"
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Product Information */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold capitalize text-slate-700">
                    {product.category}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Availability
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {isInStock ? "In Stock" : "Unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetailsPage;
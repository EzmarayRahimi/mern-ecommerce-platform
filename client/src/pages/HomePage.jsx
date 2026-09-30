



import { useState, useEffect } from "react";
import productService from "../services/productService";
import ProductCart from "../components/ProductCart";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";

function HomePage() {
  const [products, setProducts] = useState("");
  const [loading, setLoadin] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadin(true);
        setError("");

        const data = await productService.getProducts(keyword, category);

        setProducts(data.products);
      } catch (err) {
        setError(
          err.response?.data?.message || "failed to load products"
        );
      } finally {
        setLoadin(false);
      }
    };

    fetchProducts();
  }, [keyword, category]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
          <p className="text-sm font-medium text-slate-500">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            !
          </div>

          <h1 className="mb-2 text-lg font-semibold text-slate-900">
            Something went wrong
          </h1>

          <p className="text-sm text-slate-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-indigo-400/20"></div>

          <div className="relative z-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-200">
              Welcome to ShopHub
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Find the products you need for a better everyday life.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
              Discover quality products, explore different categories, and
              find what you are looking for in one simple place.
            </p>

            <a
              href="#products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50"
            >
              Explore Products

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              ✓
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
              Quality Products
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Products for your everyday needs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              $
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
              Fair Prices
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Find products at reasonable prices.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              →
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
              Easy Shopping
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Simple and clean shopping experience.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              ✓
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
              Secure Orders
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Manage your orders from your account.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="mt-10 scroll-mt-24">

          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-indigo-600">
                Our collection
              </p>

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Explore Products
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Search and filter products to find exactly what you need.
              </p>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex-1">
                <SearchBar />
              </div>

              <div className="w-full lg:w-52">
                <CategoryFilter />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(keyword || category) && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500">
                Showing results for:
              </span>

              {keyword && (
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  Search: {keyword}
                </span>
              )}

              {category && (
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  Category: {category}
                </span>
              )}
            </div>
          )}

          {/* Products */}
          {products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.1-5.4a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                No products found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or selecting another category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCart
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;

import { useNavigate, useSearchParams } from "react-router-dom";

function CategoryFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  const changeHandler = (e) => {
    const selectedCategory = e.target.value;

    const query = [];

    if (keyword) {
      query.push(`keyword=${keyword}`);
    }

    if (selectedCategory) {
      query.push(`category=${selectedCategory}`);
    }

    navigate(`/?${query.join("&")}`);
  };

  return (
    <div className="relative">
      <label
        htmlFor="category"
        className="mb-1.5 block text-xs font-medium text-slate-500"
      >
        Category
      </label>

      <div className="relative">
        <select
          id="category"
          value={category}
          onChange={changeHandler}
          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Categories</option>
          <option value="labtop">Laptop</option>
          <option value="mobile">Mobile</option>
          <option value="monitor">Monitor</option>
          <option value="general">General</option>
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default CategoryFilter;
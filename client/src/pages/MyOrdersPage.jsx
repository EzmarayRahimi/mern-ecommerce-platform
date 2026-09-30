import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import orderService from "../services/orderService";

function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load orders!"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatStatus = (status = "pending") => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusStyle = (status = "") => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "paid":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">⚠️</div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Unable to Load Orders
          </h1>

          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>

          <button
            onClick={fetchOrders}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and track all your previous orders.
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">
              📦
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              You haven't placed any orders yet. Start shopping and your
              orders will appear here.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Order
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Total
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="transition hover:bg-slate-50"
                      >
                        {/* Order ID */}
                        <td className="px-6 py-5">
                          <p className="max-w-[280px] truncate text-sm font-semibold text-slate-900">
                            #{order._id}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Order ID
                          </p>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-slate-900">
                            ${Number(order.totalPrice || 0).toFixed(2)}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {formatStatus(order.status)}
                          </span>
                        </td>

                        {/* Details */}
                        <td className="px-6 py-5 text-right">
                          <Link
                            to={`/orders/${order._id}`}
                            className="inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-50"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500">
                        Order ID
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        #{order._id}
                      </p>
                    </div>

                    <span
                      className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </div>

                  <div className="my-5 border-t border-slate-100" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        ${Number(order.totalPrice || 0).toFixed(2)}
                      </p>
                    </div>

                    <Link
                      to={`/orders/${order._id}`}
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrderPage;
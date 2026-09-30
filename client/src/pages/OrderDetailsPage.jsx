


import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import orderService from "../services/orderService";

function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load order!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">⚠️</div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Unable to Load Order
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  // Order Not Found
  if (!order) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Order Not Found
        </h2>

        <Link
          to="/orders"
          className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  const orderItems = order.orderItems || [];

  const totalItems = orderItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const formatStatus = (status = "pending") =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const statusColor =
    order.status?.toLowerCase() === "delivered"
      ? "bg-green-100 text-green-700"
      : order.status?.toLowerCase() === "cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-700";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>

          <span>/</span>

          <Link to="/orders" className="hover:text-indigo-600">
            My Orders
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-800">
            Order Details
          </span>
        </div>

        {/* Success Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                ✓
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Order Details
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Review the products and status of your order.
                </p>
              </div>
            </div>

            <Link
              to="/orders"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View All Orders
            </Link>
          </div>
        </div>

        {/* Order Information */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Order ID */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Order ID
            </p>

            <p className="mt-2 break-all text-sm font-semibold text-slate-900">
              {order._id}
            </p>
          </div>

          {/* Status */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Order Status
            </p>

            <div className="mt-3">
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${statusColor}`}
              >
                {formatStatus(order.status)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Order Total
            </p>

            <p className="mt-2 text-2xl font-bold text-indigo-600">
              ${Number(order.totalPrice || 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Products and Summary */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">

          {/* Products */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 border-b border-slate-200 pb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Ordered Products
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {totalItems} {totalItems === 1 ? "item" : "items"} in this order
              </p>
            </div>

            {orderItems.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                No product details are available for this order.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {orderItems.map((item, index) => {
                  const product = item.product || {};
                  const quantity = Number(item.quantity || 0);
                  const price = Number(
                    item.price ?? product.price ?? 0
                  );

                  const imagePath = product.images?.[0];

                  const imageUrl = imagePath
                    ? imagePath.startsWith("http")
                      ? imagePath
                      : `http://localhost:3000${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
                    : null;

                  return (
                    <div
                      key={product._id || item._id || index}
                      className="flex gap-4 py-5"
                    >
                      {/* Product Image */}
                      <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-28">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name || "Product"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">📦</span>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <h3 className="font-semibold text-slate-900">
                          {product.name || "Product"}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Price: ${price.toFixed(2)}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Quantity: {quantity}
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="flex flex-shrink-0 flex-col justify-center text-right">
                        <p className="text-xs text-slate-500">
                          Subtotal
                        </p>

                        <p className="mt-1 font-bold text-slate-900">
                          ${(price * quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Summary */}
          <aside className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-slate-200 pb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Total Items
                </span>

                <span className="font-medium text-slate-900">
                  {totalItems}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Status
                </span>

                <span className="font-medium text-slate-900">
                  {formatStatus(order.status)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 py-6">
              <span className="font-semibold text-slate-900">
                Total
              </span>

              <span className="text-2xl font-bold text-indigo-600">
                ${Number(order.totalPrice || 0).toFixed(2)}
              </span>
            </div>

            <Link
              to="/"
              className="block w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="mt-3 block w-full rounded-xl border border-slate-200 px-5 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              My Orders
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
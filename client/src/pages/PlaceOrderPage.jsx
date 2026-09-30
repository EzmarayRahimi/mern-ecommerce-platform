import { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orderService";
import { useCart } from "../context/CartContext";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      setError("");

      const order = await orderService.createOrder({
        orderItems: cartItems,
        totalPrice,
      });

      clearCart();

      navigate(`/orders/${order._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create order!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">
            🛒
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Add some products to your cart before placing an order.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-7 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Checkout
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
            Review Your Order
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Check your products and confirm your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Order Items */}
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Order Items
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>

              <button
                onClick={() => navigate("/cart")}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Edit Cart
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 py-5"
                >
                  {/* Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product */}
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Quantity: {item.qty}
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      ${item.price.toFixed(2)} × {item.qty}
                    </p>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-slate-200 pb-6">

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Items
                </span>

                <span className="font-medium text-slate-900">
                  {totalItems}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span className="font-medium text-slate-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Shipping
                </span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-6">
              <span className="text-lg font-semibold text-slate-900">
                Total
              </span>

              <span className="text-2xl font-bold text-indigo-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Place Order */}
            <button
              onClick={placeOrderHandler}
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Order..." : "Place Order"}
            </button>

            {/* Back */}
            <button
              onClick={() => navigate("/cart")}
              disabled={loading}
              className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Back to Cart
            </button>

            {/* Secure Checkout */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  🔒
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Secure Order
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your order information is securely processed.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
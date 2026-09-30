import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage() {
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
          
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">
            🛒
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Your Cart is Empty
          </h1>

          <p className="mt-3 max-w-md text-sm text-slate-500 sm:text-base">
            You haven't added any products to your cart yet. Explore our
            products and find something you like.
          </p>

          <Link
            to="/"
            className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Shopping Cart
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review your items before completing your order.
          </p>
        </div>

        {/* Cart Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
            
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="my-6 space-y-4 border-b border-slate-200 pb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Items
                </span>

                <span className="font-medium text-slate-900">
                  {cartItems.reduce((total, item) => total + item.qty, 0)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span className="font-medium text-slate-900">
                  ${total.toFixed(2)}
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
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900">
                Total
              </span>

              <span className="text-2xl font-bold text-indigo-600">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout */}
            <button
              onClick={() => navigate("/placeorder")}
              disabled={cartItems.length === 0}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="mt-3 block w-full rounded-xl border border-slate-200 px-5 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Continue Shopping
            </Link>

            {/* Security Info */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="flex gap-3">
                <div className="text-lg">
                  🔒
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your order information is handled securely.
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

export default CartPage;
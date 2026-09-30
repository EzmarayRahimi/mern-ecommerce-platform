


import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const increaseQty = () => {
    updateQuantity(item._id, item.qty + 1);
  };

  const decreaseQty = () => {
    if (item.qty === 1) {
      removeFromCart(item._id);
      return;
    }

    updateQuantity(item._id, item.qty - 1);
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex gap-4 sm:gap-6">

        {/* Product Image */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-32">
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="flex min-w-0 flex-1 flex-col">

          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 sm:text-base">
                {item.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="flex-shrink-0 text-xs font-medium text-red-500 transition hover:text-red-600"
            >
              Remove
            </button>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">

            {/* Quantity */}
            <div className="flex items-center rounded-lg border border-slate-200">
              <button
                onClick={decreaseQty}
                className="flex h-9 w-9 items-center justify-center text-lg font-medium text-slate-600 transition hover:bg-slate-50"
              >
                −
              </button>

              <span className="flex h-9 min-w-9 items-center justify-center border-x border-slate-200 px-2 text-sm font-semibold text-slate-800">
                {item.qty}
              </span>

              <button
                onClick={increaseQty}
                className="flex h-9 w-9 items-center justify-center text-lg font-medium text-slate-600 transition hover:bg-slate-50"
              >
                +
              </button>
            </div>

            {/* Item Total */}
            <p className="text-base font-bold text-slate-900">
              ${(item.price * item.qty).toFixed(2)}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
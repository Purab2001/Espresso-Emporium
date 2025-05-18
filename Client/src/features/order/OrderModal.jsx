import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function OrderModal({ open, handleClose, coffee }) {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (coffee) {
      setTotalPrice((coffee.price * quantity).toFixed(2));
    }
  }, [coffee, quantity]);

  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const orderData = {
        coffeeId: coffee?._id,
        coffeeName: coffee?.name,
        quantity,
        unitPrice: coffee?.price,
        totalPrice
      };

      console.log('Order data:', orderData);

      await new Promise(resolve => setTimeout(resolve, 800));

      toast.success(
        <div className="flex items-center gap-2">
          <span className="font-rancho text-lg">Order placed successfully!</span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: '#F4F3F0',
            color: '#331A15',
            borderLeft: '4px solid #D2B48C'
          },
          icon: (
            <img
              src="https://img.icons8.com/color/48/000000/coffee-to-go.png"
              alt="Coffee Cup"
              className="w-6 h-6"
            />
          )
        }
      );

      handleClose();

    } catch (error) {
      console.error('Error placing order:', error);

      toast.error(
        <div className="flex items-center gap-2">
          <span className="font-rancho text-lg">Failed to place order!</span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: '#FDEDEC',
            color: '#E74C3C',
            borderLeft: '4px solid #E74C3C'
          }
        }
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !coffee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#F4F3F0] to-[#D2B48C] rounded-t-lg">
          <div className="flex items-center">
            <span className="mr-2 text-[#331A15]">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2h9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 6h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
              </svg>
            </span>
            <span className="font-rancho text-2xl text-[#331A15]">Order {coffee.name}</span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 p-1 rounded transition"
            aria-label="Close"
            disabled={loading}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex gap-4 mb-6">
            <img
              src={coffee.photo}
              alt={coffee.name}
              className="h-40 w-2/3 object-cover rounded-lg shadow-md"
            />
            <div className="flex flex-col justify-center w-1/3">
              <span className="font-rancho text-xl text-[#331A15]">{coffee.name}</span>
              <span className="text-gray-600 mb-2">Unit Price</span>
              <span className="font-bold text-[#331A15]">${coffee.price}</span>
            </div>
          </div>

          <div className="mb-6">
            <span className="mb-2 font-medium block">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="text-[#331A15] p-1 rounded-full border border-[#331A15] disabled:opacity-50"
                disabled={quantity <= 1 || loading}
                aria-label="Decrease quantity"
              >
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                className="w-20 text-center bg-[#F4F3F0] border border-gray-300 rounded py-1"
                disabled={loading}
              />
              <button
                onClick={handleIncrement}
                className="text-[#331A15] p-1 rounded-full border border-[#331A15]"
                disabled={loading}
                aria-label="Increase quantity"
              >
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-4 py-3 bg-[#F8F8F8] rounded-lg flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Total Price:</span>
            <span className="font-bold text-[#331A15]">${totalPrice}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 px-6 pb-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded text-white bg-[#331A15] hover:bg-[#C19A6B] flex items-center gap-2 transition"
            disabled={loading}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2h9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 6h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
            </svg>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
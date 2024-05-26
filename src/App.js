import "./App.css";
import "./index.css";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementAmount,
  deleteItem,
  incrementAmount,
  resetChart,
  clearChart,
} from "./redux/chartSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

const ImageComponent = ({ src, alt }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg  shadow-sm">
      <img className="w-40 h-40" src={src} alt={alt} />
    </div>
  );
};

const CounterItem = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="flex h-9 items-center">
      <button
        onClick={onDecrement}
        className="bg-gray-200 px-2 py-1 rounded-l-lg border border-gray-300"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        className="w-12 text-center border min-h-full border-gray-300"
        readOnly
      />
      <button
        onClick={onIncrement}
        className="bg-gray-200 px-2 py-1 rounded-r-lg border border-gray-300"
      >
        +
      </button>
    </div>
  );
};

const CardCart = ({ items, wishlishClicked }) => {
  const { title, type, color, price, size, amount, note, id } = items;
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementAmount({ id: id }));
  };

  const handleDecrement = () => {
    if (amount > 1) {
      dispatch(decrementAmount({ id: id }));
    }
  };

  return (
    <div className="flex w-full flex-row p-4 bg-white rounded-lg">
      <ImageComponent
        src="https://via.placeholder.com/150.png"
        alt="Placeholder Image"
      />
      <div className="ml-4 flex flex-col flex-1">
        <div className="flex flex-1 flex-row items-start">
          <div className="flex flex-1 flex-col items-start">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm text-blue-500 mt-1">
              {type} - {color}
            </p>
            <p className="text-sm text-gray-600 mt-2">Color: {color}</p>
            <p className="text-sm text-gray-600 mt-1">SIZE: {size}</p>
          </div>
          <div>
            <CounterItem
              quantity={amount}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            {note && (
              <p className="text-sm text-gray-600 mt-2">(Note: {note})</p>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <div
            onClick={() => {
              dispatch(deleteItem({ id: id }));
            }}
            className="hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrash} /> Remove item
          </div>
          <div
            onClick={() => {
              wishlishClicked();
              dispatch(deleteItem({ id: id }));
            }}
            className="hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer ml-3"
          >
            <FontAwesomeIcon icon={faHeart} /> Move to wishlist
          </div>
          <div className="text-sm text-gray-600 ml-auto">
            Price: ${price * amount}
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, closeModal, isWishlist }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {isWishlist ? "Success wishlist" : "Successful Checkout"}
        </h2>
        <p>
          {isWishlist
            ? "Item successfully moved to your wishlish"
            : "Your order has been successfully processed!"}
        </p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const DiscountDropdown = ({ options, onSelectOption, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelectOption(selectedValue);
  };

  return (
    <div className="relative w-full inline-block">
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-500"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
          />
        </svg>
      </div>
    </div>
  );
};

function App() {
  const chart = useSelector((state) => state.chart);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const [isWishlist, setisWishlist] = useState(false);

  const handleCheckout = () => {
    setShowModal(true);
    dispatch(clearChart());
  };

  const closeModal = () => {
    setisWishlist(false);
    setShowModal(false);
  };
  const handleSelectOption = (selectedValue) => {
    setSelectedOption(selectedValue);
  };

  const options = [
    { value: "0.1", label: "10% off" },
    { value: "0.2", label: "20% off" },
    { value: "0.3", label: "30% off" },
  ];

  const total = chart.items.reduce((total, item) => {
    return total + parseInt(item.price) * item.amount;
  }, 0);

  const grandTotal = total - total * selectedOption;

  return (
    <div className="App">
      <div className="bg-slate-100 py-3">
        <div className="font-bold">Shopping Cart</div>
      </div>
      <div className="flex flex-row	p-2">
        <div className="lg:flex lg:flex-row flex-1 lg:space-x-4">
          {/* Cart Items Section */}
          <div className="flex flex-col items-start rounded lg:flex-1 shadow m-3 p-3">
            <div className="font-bold">Cart ({chart.items.length} items)</div>
            {chart.items.map((element) => (
              <CardCart
                items={element}
                wishlishClicked={() => {
                  setisWishlist(true);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
          {/* Cart Total Section */}
          <div className="flex flex-col lg:basis-1/4 mb-4 lg:mb-0">
            <div className="flex h-fit flex-col items-start shadow m-3 p-3">
              <div className="font-bold">The total amount of</div>
              <div className="mt-4 w-full">
                <div className="flex flex-row w-full">
                  Temporary amount <div className="ml-auto">${grandTotal}</div>
                </div>
                <div className="flex flex-row w-full">
                  Shipping <div className="ml-auto">Gratis</div>
                </div>
                <div className="flex w-full border border-gray-200 mt-2" />
                <div className="flex flex-row w-full text-left font-bold">
                  The total amount of (Including VAT)
                  <div className="ml-auto mt-auto mb-auto">${grandTotal}</div>
                </div>
                <div
                  onClick={() => handleCheckout()}
                  className="bg-blue-500 align-middle justify-center w-full p-3 text-white rounded mt-4 hover:bg-blue-400 cursor-pointer "
                >
                  Go To Checkout
                </div>
              </div>
            </div>
            <div className="flex h-fit flex-col items-start rounded shadow m-3">
              <DiscountDropdown
                options={options}
                placeholder={"Add discount code(optional)"}
                onSelectOption={handleSelectOption}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => dispatch(resetChart())}>
        reset
      </div>
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        isWishlist={isWishlist}
      />
    </div>
  );
}

export default App;

import React from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IncreaseQty, ReduceQty } from "../../Redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartStore = () => {
  const state = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(state);

  const handleIncresment = (productId) => {
    dispatch(IncreaseQty(productId));
  };

  const handleDecresment = (productId) => {
    dispatch(ReduceQty(productId));
  };

  const calc = () => {
    let total = 0;
    state.map((product) => {
      let productTotal = +product.price * +product.qty;
      return (total += productTotal);
    });
    return total;
  };
  return (
    <div className="w-full border border-gray md:my-10">
      <div className="bg-black text-pink-300  text-4xl text-center p-4">
        <p className=""> Cart</p>
      </div>
      <div className="flex justify-center w-full bg-gray-500 p-2">
        <div className="name grid  place-content-center ">
          <h1 className="font-bold">store name</h1>
        </div>
      </div>
      {state.map((product) => {
        return (
          <div className="w-full ">
            <div className="flex p-2 justify-between">
              <div className="plus-minus text-center grid place-content-center py-10">
                <div className="w-full">
                  <div className="minus-plus flex justify-around">
                    <button className="text-pink-300 text-xl">
                      <FiMinusCircle
                        onClick={() => handleDecresment(product._id)}
                      />
                    </button>
                    <h5>{product.qty}</h5>
                    <button className="text-pink-300 text-xl">
                      <FiPlusCircle
                        onClick={() => handleIncresment(product._id)}
                      />
                    </button>
                  </div>
                </div>
                <h5>{`${product.price} $`}</h5>
              </div>

              <div className="contact text-end py-10">
                <h1 className="font-bold">{product.name}</h1>
                <p className="text-gray-500 text-sm">{product.brand}</p>
                <p className="text-gray-500 text-sm">{product.color}</p>
              </div>

              <div className="right-img ">
                <img className="w-24" src={product.image} alt={product.name} />
              </div>
            </div>
          </div>
        );
      })}
      <hr />
      <div className="p-2">
        <div className="flex justify-between">
          <h1 className="font-bold">{calc()} $</h1>
          <h1>:Total</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold">{state.length}</h1>
          <h1 className="">: Quantity</h1>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => {
            navigate("/checkout");
          }}
          className="text-white text-xl bg-gray-500  w-full p-4 hover:text-pink-300 hover:duration-500"
        >
          {` For Payment ${calc()} $`}
        </button>
      </div>
    </div>
  );
};

export default CartStore;

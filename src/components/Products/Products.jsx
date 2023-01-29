import React from "react";
import { useState, useEffect } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import ProductPopUp from "./ProductPopUp";
import { getProducts } from "../Manager/ApiCalls/products";
import { AddProduct, ReduceQty } from "../../Redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";
export default function Products({ inputSearch, setProdactLength, storeName }) {
  const [popUpProduct, setPopUpProduct] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  setProdactLength(products.length);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.CartReducer);
  console.log(state);
  const allProduct = async () => {
    const { data: products } = await getProducts();
    const data = products.filter((product) => product.brand === storeName);
    const productsObj = data.map((product) => {
      return { ...product, qty: qty };
    });
    setProducts(productsObj);
  };
  useEffect(() => {
    allProduct();
  }, [state]);
  const addItem = (product) => {
    dispatch(AddProduct(product, product.qty));
    setQty(product.qty);
  };
  const handleDecresment = (product) => {
    dispatch(ReduceQty(product._id));
    setQty(product.qty);
  };
  const showProductPopUp = (e) => {
    console.log(e.target.name);
    console.log(e.target.id);
    products.map((product) => {
      if (product._id === e.target.id) {
        setPopUpProduct(product);
        setPopUp(true);
      }
    });
  };
  const handleOneClose = () => setPopUp(false);
  return (
    <div>
      <div className="w-full px-4">
        <div className="w-full flex flex-wrap justify-between">
          {products
            .filter((product) => {
              if (inputSearch === "") {
                return product;
              } else if (
                product.name.toLowerCase().includes(inputSearch.toLowerCase())
              ) {
                return product;
              }
            })
            .map((product, key) => {
              return (
                <div
                  key={key}
                  className="md:w-[30%] w-full flex flex-col justify-start border-white border-2 p-2 items-center my-4 rounded-md hover:scale-105 duration-300 hover:shadow-md hover:shadow-black"
                >
                  <img
                    id={product._id}
                    name={product}
                    onClick={(e) => showProductPopUp(e)}
                    className="w-full mx-auto"
                    src={product.image}
                    alt="Shoes"
                  />
                  <button className="text-pink-300 font-bold my-4">Click For More</button>
                  <div className=" w-full text-center py-2 ">
                    <button
                      onClick={() => addItem(product)}
                      className="w-full capitalize rounded-lg bg-gray-400 text-white px-2 py-1"
                    >
                      {" "}
                      add to cart
                    </button>
                  </div>
                  <h2 className="font-bold text-center py-2">{product.name}</h2>
                  <p className="text-gray text-end">{product.description}</p>

                  <p className="text-end">Total : {product.price} $</p>
                </div>
              );
            })}
        </div>
      </div>
      <ProductPopUp
        product={popUpProduct}
        onClose={handleOneClose}
        visible={popUp}
      />
    </div>
  );
}

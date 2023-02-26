import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiCreditCard } from "react-icons/hi";
import PaypalCheckOutButton from "./PaypalCheckOutButton";
import AddCard from "./AddCard";
import { useEffect } from "react";
import { ClearCart } from "../../Redux/action/cartActions";
import { useDispatch } from "react-redux";

export default function CheckOut3({ setOrder, order }) {
  const user = JSON?.parse(localStorage?.getItem("user"))?.data;
  const [addCard, setAddCard] = useState(false);
  const [useSaveCard, setUseSaveCard] = useState(false);
const dispatch= useDispatch()
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    setPayment([
      user?.useSaveCards?.map((v) => ({
        cardNumber: v.cardNumber,
        cardValidity: v.cardValidity,
        threeDigits: v.threeDigits,
      })),
    ]);
  }, []);

  const navigetor = useNavigate();
  return (
    <div className="w-full min-h-screen p-10 flex flex-col items-start text-left justify-between bg-white my-4">
      <div className="flex items-start text-left">
        <h1 className="font-medium text-2xl">Payment details</h1>
        <HiCreditCard className="text-pink-100 text-4xl ml-4" />
      </div>
      {user?.saveCards ? (
        <div>
          <p className="my-8 font-medium">Choose a payment method:</p>
          {payment?.map((v, i) => {
            return (
              <div key={i} className="flex items-center">
                <label className="mx-2 font-bold">
                  xxxx xxxx xxxx {user?.saveCards[0]?.cardNumber.slice(15)}
                </label>
                <input
                  onChange={() => {
                    setOrder({
                      ...order,
                      payment: 
                        {
                          cardNumber: user?.saveCards[0].cardNumber,
                          cardValidity: user?.saveCards[0].cardValidity,
                          threeDigits: user?.saveCards[0].threeDigits,
                          allData: true,
                        },
                      
                    });
                    setUseSaveCard(!useSaveCard);
                  }}
                  type="radio"
                  name="cardNum"
                  value={v}
                  className="w-6 h-6 "
                />
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}

      {useSaveCard == false  ? (
        <div className="w-3/4 h-1/2 flex flex-col justify-between items-start text-left">
          <div className="w-full">
            <h3>Credit card number</h3>
            <input
              onChange={(e) => {
                setOrder({
                  ...order,
                  payment: {
                    [e.target.name]: e.target.value,
                  },
                });
              }}
              name="cardNumber"
              type="tel"
              placeholder="3434 3434 3434 3434"
              maxLength={"19"}
              className="border-b placeholder:text-left outline-none py-3 w-fit text-left"
            />
          </div>
          <div className="w-full">
            <h3>validity</h3>
            <input
              onChange={(e) => {
                setOrder({
                  ...order,
                  payment: {
                    ...order.payment,
                    [e.target.name]: e.target.value,
                  },
                });
              }}
              name="cardValidity"
              type="tel"
              placeholder="34/02"
              maxLength={"5"}
              className=" border-b placeholder:text-left outline-none py-2 my-1 w-16 text-left"
            />
          </div>
          <div className="w-full">
            <h3>Last 3 digits on the card</h3>
            <input
              onChange={(e) => {
                setOrder({
                  ...order,
                  payment: {
                    ...order.payment,
                    [e.target.name]: e.target.value,
                    allData: true,
                  },
                });
              }}
              name="threeDigits"
              type="tel"
              placeholder="321"
              maxLength={"3"}
              className="border-b placeholder:text-left outline-none py-2 my-1 w-16 text-left"
            />
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setUseSaveCard(!useSaveCard);
            window.location.reload();
          }}
          className="text-pink-100 bg-black"
        >
        For Payment Click Here
        </button>
      )}
      {addCard ? (
        <AddCard
          payment={payment}
          setPayment={setPayment}
          setAddCard={setAddCard}
          order={order}
        />
      ) : (
        ""
      )}
      <div className="flex flex-col w-full items-start text-left">
        <button
          onClick={async () => {
            if (
              order.payment.cardNumber !== "paypal" &&
              !undefined &&
              !null &&
              order.payment.threeDigits !== "paypal" &&
              !undefined &&
              !null &&
              order.payment.cardValidity !== "paypal" &&
              !undefined &&
              !null &&
              order.addres.allData &&
              order.shipping.allData &&
              useSaveCard == false
            ) {
              setAddCard(!addCard);
              await axios.post(`https://e-commerce-server-3zp6.onrender.com/order`, order);
              console.log(order);
            } else if (
              !undefined &&
              !null &&
              order.payment.threeDigits !== "paypal" &&
              !undefined &&
              !null &&
              order.payment.cardValidity !== "paypal" &&
              !undefined &&
              !null &&
              order.addres.allData &&
              order.shipping.allData &&
              useSaveCard == true
            ) {
              navigetor("/ThanksPage");
              await axios.post("https://e-commerce-server-3zp6.onrender.com/order", order);
              console.log(order);
            } else {
              alert("Fill in all the fields");
              console.log(order);
            }
          dispatch({type: "CLEAR_CART" })
          }}
          className="bg-pink-100 rounded-md text-gray-500 font-bold py-4 px-8  m-1 w-full"
        >
         Purchase confirmation
        </button>
        <PaypalCheckOutButton />
      </div>
    </div>
  );
}

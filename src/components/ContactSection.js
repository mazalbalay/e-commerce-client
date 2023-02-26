import axios from "axios";
import { LoremIpsum, Avatar } from "react-lorem-ipsum";
import React, { useState } from "react";
const ContactSection = () => {
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendMail = async (e) => {
    e.preventDefault();

    const { data: send } = await axios.post(
      "https://e-commerce-server-019n.onrender.com/contact-us",
      data,
    );
  };

  return (
    <div className="antialiased bg-gray-100">
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className=" flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6 bg-gray-400 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden">
          <div className="flex flex-col apace-y-8 justify-between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
              <p className="pt-2 text-white text-sm">
                {" "}
                We want your experience in our store to be amazing, for
                improvement or problems you can always contact us by email and
                call
                <br />
                Thank you so much!
              </p>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="inline-flex space-x-2 items-center">
                <ion-icon
                  name="call-outline"
                  className="text-teal-300 text-xl"
                ></ion-icon>
                <span>054020205156</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <ion-icon
                  name="mail-outline"
                  className="text-teal-300 text-xl"
                ></ion-icon>
                <span>avi@gmail.com</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <ion-icon
                  name="location-outline"
                  className="text-teal-300 text-xl"
                ></ion-icon>
                <span>11, stere</span>
              </div>
            </div>
            <div className="flex space-x-4 text-lg">
              <a href="">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
              <a href="">
                <ion-icon name="logo-linkdin"></ion-icon>
              </a>
              <a href="">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute z-0 w-40 h-40 bg-pink-300 rounded-full -right-28 -top-28"></div>
            <div className="absolute z-0 w-40 h-40 bg-pink-300 rounded-full -left-28 -bottom-28"></div>
            <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-80">
              <form
                action=""
                className="flex flex-col space-y-4"
                onSubmit={sendMail}
              >
                <div>
                  <label for className="text-sm">
                    Full Name
                  </label>

                  <input
                    onChange={handleChange}
                    name="name"
                    type="text"
                    placeholder="your name"
                    className="ring-1 ring-gray-300 w-full mt-2 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-offset-gray-600"
                  />
                </div>

                <div>
                  <label for className="text-sm">
                    Email
                  </label>

                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="your email"
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 mt-2 py-2 outline-none focus:ring-2 focus:ring-offset-gray-600"
                  />
                </div>
                <div>
                  <label for className="text-sm">
                    Message
                  </label>

                  <textarea
                    onChange={handleChange}
                    name="Message"
                    type="text"
                    rows="4"
                    placeholder="your Message"
                    className="ring-1 ring-gray-300 w-full mt-2 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-offset-gray-600"
                  ></textarea>
                </div>
                <button className="inline-block self-end bg-pink-300 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

"use client";
import { Slide, ToastContainer } from "react-toastify";

export const Toast = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick={false}
    theme="dark"
    transition={Slide}
  />
);

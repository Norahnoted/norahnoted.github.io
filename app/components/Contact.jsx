import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { motion } from "motion/react";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "b8504469-d018-435f-aca3-c58ef62a9078");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="contact"
      className="w-full px-5 sm:px-10 lg:px-[12%] py-24"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="text-center text-4xl sm:text-5xl font-PlusJakarta mb-12 text-[#4a423c] dark:text-white"
      >
        Get in touch
      </motion.h2>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.45 }}
        onSubmit={onSubmit}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            type="text"
            placeholder="Enter your name"
            required
            className="flex-1 p-3 outline-none border border-[#d1d5db] rounded-lg bg-[#F7F6F2] dark:bg-white/5 dark:border-white/20 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 font-PlusJakarta text-sm"
            name="name"
          />
          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 p-3 outline-none border border-[#d1d5db] rounded-lg bg-[#F7F6F2] dark:bg-white/5 dark:border-white/20 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 font-PlusJakarta text-sm"
            name="email"
          />
        </div>
        <motion.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.65 }}
          rows="6"
          placeholder="Enter your message"
          required
          className="w-full p-4 outline-none border border-[#d1d5db] rounded-lg bg-[#F7F6F2] mb-6 dark:bg-white/5 dark:border-white/20 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 font-PlusJakarta text-sm"
          name="message"
        ></motion.textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.15 }}
          type="submit"
          className="py-3 px-8 w-max flex items-center gap-2 bg-[#5A6538] text-white rounded-full mx-auto hover:bg-[#4a5430] duration-300 font-PlusJakarta text-sm"
        >
          Send message
          <Image src={assets.right_arrow_white} alt="" className="w-4" />
        </motion.button>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-white/50 font-PlusJakarta">{result}</p>
      </motion.form>
    </motion.div>
  );
};

export default Contact;

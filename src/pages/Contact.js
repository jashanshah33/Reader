import React, { useState } from "react";
import toast from "react-hot-toast";
import { contact } from "../api";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmitMessage = async () => {
    if ((!name, !phone, !email, !message)) {
      return toast.error("Please Fill All The Feilds");
    }
    const response = await contact(name, phone, email, message);

    if (response.success) {
      toast.success(response.message);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      return;
    }
  };

  return (
    <div className="contact_page">
      <div className="contact_heading">
        <h1>Let's make something awesome together. </h1>
        <p>
          Drop a line, or give me a heads up if you're interersting in my
          projects.
        </p>
      </div>
      <div className="contact_form_wrapper">
        <div className="form_header">
          <h1>Get in Touch</h1>
          <p>Let's talk about programming</p>
        </div>
        <div className="form">
          <div className="form_inputs_wrapper">
            <input
              className="name_input"
              type={"text"}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="phone_input"
              type={"number"}
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="email_input"
              type={"email"}
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handelSubmitMessage}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

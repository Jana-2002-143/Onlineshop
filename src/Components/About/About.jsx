import Header from "../../Reusable/Header/Header";
import "./About.css";
import { FaPhone } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

function About() {
  const contacts = [
    {
      icon: <FaPhone aria-label="Phone" />,
      value: "+91 9943653771",
      link: "tel:9943653771",
    },
    {
      icon: <TbWorld aria-label="Website" />,
      value: "OnlineShopping.netlify.app",
      link: "https://onlineshopping.netlify.app",
    },
    {
      icon: <MdEmail aria-label="Email" />,
      value: "janaganjkl930@gmail.com",
      link: "mailto:janaganjkl930@gmail.com",
    },
  ];

  return (
    <>
      <Header />
      <div className="aboutcontainer">
        <h1 className="about-title">About Online Shopping</h1>
        <p className="about-description">
          Online shopping allows you to purchase products and services from
          anywhere, at any time, using websites or mobile apps. Customers can
          browse thousands of products, compare prices, read reviews, and make
          secure payments instantly. Orders are delivered directly to your home,
          saving time and effort. With proper care while choosing sellers and
          secure payment methods, online shopping is one of the safest and most
          convenient ways to shop.
        </p>

        <h2 className="about-heading">Why Choose Our Platform?</h2>
        <ul className="about-list">
          <li>✔ Wide selection of products</li>
          <li>✔ Fast delivery to your doorstep</li>
          <li>✔ Secure payment methods (UPI, Cards, Wallets)</li>
          <li>✔ 24/7 customer support</li>
          <li>✔ Easy refunds & return policies</li>
        </ul>

        <nav className="footer">
          {contacts.map((contact, index) => (
            <div className="contact-card" key={index}>
              {contact.icon}
              <a href={contact.link} target="_blank" rel="noopener noreferrer">
                {contact.value}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}

export default About;

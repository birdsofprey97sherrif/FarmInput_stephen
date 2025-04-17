import React from "react";

const Footer = () => {
  return (
    <div>
      <section className="row text-white bg-secondary p-4">
        <div className="col-md-4 mb-3">
          <h4 className="text-center">About Us</h4>
          <p>
            Alpha Agro Store is an online shop to sell the best farm inputs products at very affordable prices. We are a dedicated company with over 30 years of quality services and top-notch customer care responses.
          </p>
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Contact Us</h4>
          <form>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
            <br />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              className="form-control"
              placeholder="Leave a comment"
              rows="5"
              required
            ></textarea>
            <br />
            <button type="submit" className="btn btn-outline-danger">
              Send Message
            </button>
          </form>
        </div>
        <div className="col-md-4 mb-3">
          <h4 className="text-center">Stay Connected</h4>
          <p className="text-dark">
            Follow us on our social media platforms to stay updated:
          </p>
          <div className="d-flex justify-content-center">
            <a href="https://facebook.com" className="text-white mx-2">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://twitter.com" className="text-white mx-2">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://instagram.com" className="text-white mx-2">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
      </section>

      <footer className="text-white bg-dark text-center p-2">
        <div className="marquee">
          Welcome to Alpha Agro Store! Enjoy the best farm inputs at affordable prices. Contact us for more details!
        </div>
        <h4>Developed by Githinji Stephen.&copy; 2025. All Rights Reserved</h4>
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-light"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
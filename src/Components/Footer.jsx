import React from "react";

const Footer = () => {
  return (
    <div>
      <section className="row text-white bg-secondary p-4 mt-4">
        <div className="col-md-4 mb-3">
          <h4 className="text-center">About Us</h4>
          <p>
            Welcome at ALPHA AGRIGEAR, we are dedicated to providing farmers with high-quality farm inputs and machinery that make agricultural operations more efficient and productive. Our online platform offers a wide range of products, from seeds, fertilizers, and pesticides to cutting-edge machinery designed to meet the needs of modern farming. With a commitment to sustainability and innovation, we ensure that our customers have access to the best tools and resources available. Whether you’re a smallholder or a large-scale commercial farm, our goal is to empower you with the right solutions to grow and succeed. We believe in making farming easier and more profitable, one product at a time.
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
          <img src="images/fb.png" alt="" className="text-white mx-2 img" />
              <i className="fab fa-facebook fa-2x"></i>
              <img src="images/twitter.jpg" alt="" className="text-white mx-2 img" />
              <i className="fab fa-twitter fa-2x"></i>
              <img src="images/instagram.jpg" alt="" className="text-white mx-2 img" />
              <i className="fab fa-instagram fa-2x"></i>
          </div>
        </div>
      </section>
      <footer className="text-white bg-dark text-center p-2">
          <div className="marquee">
            <span>
              Welcome to Alpha AgriGear! Enjoy the best farm inputs at affordable prices. Contact us for more details!
            </span>
          </div>
          <h4>Developed by Githinji Stephen.&copy; 2025. All Rights Reserved.</h4>
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

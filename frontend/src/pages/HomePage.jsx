import { HomeHeader } from "../components/HomeHeader";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

// ✅ Correct Image Imports
import pic1 from "../assets/desktop.jpg";
import headphones from "../assets/headphones.jpg";
import iphone from "../assets/iphone.jpg";
import camera1 from "../assets/camera.jpg";
import laptopFlash from "../assets/laptop.jpg";

import desktop from "../assets/desktop.jpg";
import kids from "../assets/kids.jpg";
import { Link } from "react-router-dom";

export function HomePage() {

  function startCountdown() {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const interval = setInterval(() => {
      const now = new Date();
      const distance = endOfDay - now;

      if (distance <= 0) {
        clearInterval(interval);
        ["days","hours","minutes","seconds"].forEach(id => {
          document.getElementById(id).textContent = "00";
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = String(days).padStart(2, "0");
      document.getElementById("hours").textContent = String(hours).padStart(2, "0");
      document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
      document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }, 1000);
  }

  startCountdown();

  return (
    <>
      <HomeHeader />

      <div className="home-page">

        {/* HERO SECTION */}
        <section className="hero-section text-center text-md-start">
          <div className="container d-flex align-items-center justify-content-between flex-column flex-md-row">
            <div className="hero-text">
              <p className="text-danger fw-bold mb-1">Coming Soon, November</p>
              <h2>
                NEW LAPTOP <br /> INTEL CORE I9 <br /> SSD 1TB
              </h2>
              <Link to={"/shop"}><button className="btn btn-primary mt-3 px-4 py-2">
                Shop Now <i className="bi bi-arrow-right"></i>
              </button></Link>
              
            </div>

            <div>
              <img src={pic1} alt="Laptop" className="hero-img" style={{ height: "200px" }} />
            </div>
          </div>
        </section>

        {/* FLASH SALE */}
        <section className="container">
          <h3 className="section-title">Flash Sale</h3>

          <div className="d-flex justify-content-between mb-3 align-items-center">
            <h6>Deal of the Day</h6>
            <div className="fw-bold text-danger">
              Ends in: <span id="days">00</span>D :<span id="hours">00</span>H :
              <span id="minutes">00</span>M :<span id="seconds">00</span>S
            </div>
          </div>

          <div className="row g-4">

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={headphones} alt="headphones" />
                <h6 className="mt-2">Wired Over-Ear Gaming Headphones</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={iphone} alt="iphone" />
                <h6 className="mt-2">Apple iPhone 11 Blackberry</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={camera1} alt="camera" />
                <h6 className="mt-2">Interchangeable Lens Camera</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={laptopFlash} alt="laptop" />
                <h6 className="mt-2">Microsoft Surface Laptop 4</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

          </div>
        </section>

        {/* LATEST PRODUCTS */}
        <section className="container">
          <h3 className="section-title">Latest Products</h3>
          <div className="row g-4">

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={headphones} alt="watch" />
                <h6 className="mt-2">Luxury Women’s Rose Gold Watch</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={desktop} alt="desktop mic" />
                <h6 className="mt-2">Maono AU-903 Desktop USB Mic</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={kids} alt="kids camera" />
                <h6 className="mt-2">Kids Digital Camera</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product-card position-relative">
                <div className="discount-tag">20% OFF</div>
                <img src={headphones} alt="studio headphones" />
                <h6 className="mt-2">Studio Monitor Headphones</h6>
                <small className="text-success">IN STOCK</small>
                <p className="fw-bold mt-1">$7.22</p>
              </div>
            </div>

          </div>
        </section>

        {/* NEWSLETTER */}
        <div className="container update">
          <span className="line"><hr /></span>
          <h4>Stay Up To Date!</h4>
          <span className="line"><hr /></span>
        </div>

        <div className="container subscribe">
          <h4>Join Our Newsletter</h4>
          <div className="email">
            <input type="text" placeholder="youremail@gmail.com" />
            <button className="subs-btn">Subscribe</button>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default HomePage;

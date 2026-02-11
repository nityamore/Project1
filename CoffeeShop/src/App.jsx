import React, { useState } from 'react';

const App = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="app-wrapper">
      {/* STRICT CSS RESET & STYLES 
          This replaces the need for App.css and Tailwind.
      */}
      <style>{`
        :root {
          --primary: #4a3728;
          --accent: #c89666;
          --bg: #fdfaf7;
          --text: #2d241e;
          --white: #ffffff;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: var(--bg);
          color: var(--text);
          line-height: 1.6;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Navigation */
        nav {
          background: var(--white);
          height: 70px;
          display: flex;
          align-items: center;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          font-weight: 800;
          color: var(--primary);
          font-size: 1.25rem;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: none;
        }

        @media (min-width: 768px) {
          .nav-links {
            display: flex;
            gap: 30px;
          }
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text);
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--accent);
        }

        /* Hero */
        .hero {
          height: 70vh;
          min-height: 400px;
          background-color: var(--primary);
          background-image: radial-gradient(var(--accent) 0.5px, transparent 0.5px);
          background-size: 20px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--white);
          padding: 80px 20px 20px;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .hero p {
          max-width: 600px;
          margin: 0 auto 30px;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* Buttons */
        .btn {
          display: inline-block;
          background: var(--accent);
          color: var(--white);
          padding: 12px 28px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }

        .btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        /* Menu Section */
        section {
          padding: 80px 0;
        }

        .section-title {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-title h2 {
          font-size: 2rem;
          color: var(--primary);
          margin-bottom: 10px;
        }

        .category-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent);
          letter-spacing: 2px;
          margin: 40px 0 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .menu-card {
          background: var(--white);
          padding: 25px;
          border-radius: 8px;
          border-left: 4px solid var(--accent);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: box-shadow 0.3s;
        }

        .menu-card:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.07);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }

        .card-header h4 {
          font-size: 1.1rem;
          color: var(--primary);
        }

        .price {
          color: var(--accent);
          font-weight: 700;
        }

        .card-desc {
          font-size: 0.9rem;
          color: #666;
        }

        /* Contact Section */
        .contact-section {
          background-color: #f0ece9;
        }

        .contact-form {
          background: var(--white);
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
        }

        .success-msg {
          text-align: center;
          padding: 40px;
          background: #e8f5e9;
          color: #2e7d32;
          border-radius: 8px;
        }

        /* Footer */
        footer {
          background: var(--primary);
          color: var(--white);
          padding: 60px 0;
          text-align: center;
        }

        .footer-logo {
          font-weight: 800;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .socials {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 25px 0;
        }

        .socials a {
          color: white;
          text-decoration: none;
          font-size: 0.8rem;
          opacity: 0.7;
        }
      `}</style>

      {/* Navigation */}
      <nav>
        <div className="container nav-content">
          <div className="logo">THE VELVET BEAN</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#contact">Visit</a>
          </div>
          <a href="#contact" className="btn" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Order Now</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="container">
          <h1>Wake Up to Perfection</h1>
          <p>Artisanal coffee sourced from small-batch roasters, paired with pastries baked fresh every dawn in the heart of the city.</p>
          <a href="#menu" className="btn">Explore Menu</a>
        </div>
      </header>

      {/* Menu Section */}
      <section id="menu">
        <div className="container">
          <div className="section-title">
            <h2>The Coffee Menu</h2>
            <p>Crafted with precision by our expert baristas</p>
          </div>

          <div className="category-label">Classics</div>
          <div className="menu-grid">
            {[
              { name: "Espresso Latte", price: "$4.50", desc: "Double shot with silky steamed milk." },
              { name: "Cappuccino", price: "$4.25", desc: "Equal parts espresso, milk, and foam." },
              { name: "Flat White", price: "$4.75", desc: "Micro-foam over a double ristretto shot." },
              { name: "Americano", price: "$3.50", desc: "Double espresso with hot water." }
            ].map((item, idx) => (
              <div className="menu-card" key={idx}>
                <div className="card-header">
                  <h4>{item.name}</h4>
                  <span className="price">{item.price}</span>
                </div>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="category-label">Cold Brews</div>
          <div className="menu-grid">
            {[
              { name: "Signature Cold Brew", price: "$5.00", desc: "Steeped 18 hours for smooth finish." },
              { name: "Nitro Cold Brew", price: "$5.50", desc: "Creamy texture infused with nitrogen." },
              { name: "Iced Macchiato", price: "$5.25", desc: "Vanilla and caramel over cold milk." }
            ].map((item, idx) => (
              <div className="menu-card" key={idx}>
                <div className="card-header">
                  <h4>{item.name}</h4>
                  <span className="price">{item.price}</span>
                </div>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="category-label">Specialties</div>
          <div className="menu-grid">
            {[
              { name: "Honey Lavender", price: "$5.75", desc: "Local honey and organic lavender syrup." },
              { name: "Mocha Ganache", price: "$5.50", desc: "Melted dark chocolate and steamed milk." },
              { name: "Pour Over", price: "$6.00", desc: "Single origin beans brewed to order." }
            ].map((item, idx) => (
              <div className="menu-card" key={idx}>
                <div className="card-header">
                  <h4>{item.name}</h4>
                  <span className="price">{item.price}</span>
                </div>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-form">
            {!formSubmitted ? (
              <>
                <h2 style={{ marginBottom: '20px', color: '#4a3728' }}>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" placeholder="Full Name" required />
                  </div>
                  <div className="form-group">
                    <label>Your Message</label>
                    <textarea rows="4" placeholder="How can we help?"></textarea>
                  </div>
                  <button type="submit" className="btn" style={{ width: '100%' }}>Send Message</button>
                </form>
              </>
            ) : (
              <div className="success-msg">
                <h3>Message Sent!</h3>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-logo">THE VELVET BEAN</div>
          <p style={{ opacity: 0.7 }}>123 Coffee Lane, Beanville • Open 7AM - 7PM Daily</p>
          <div className="socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
          <p style={{ fontSize: '0.7rem', opacity: 0.4 }}>&copy; 2024 The Velvet Bean Coffee Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
import React, { useState } from 'react';

const App = () => {
  // --- Authentication State ---
  const [user, setUser] = useState(null); // null = logged out, {name} = logged in
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  // --- App Logic State ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  // --- Auth Handlers ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      setUser({ name: loginData.username });
      showNotification(`Welcome back, ${loginData.username}!`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]); // Clear cart on logout
    showNotification("Logged out successfully.");
  };

  // --- Storage Logic ---
  const addToCart = (name, price) => {
    const newItem = { 
      name, 
      price, 
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString() 
    };
    setCart([...cart, newItem]);
    showNotification(`${name} added!`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // --- Blog Data ---
  const blogs = [
    {
      id: 1,
      title: "The Art of Micro-foam",
      summary: "Discover how we achieve that signature velvet texture in every cup.",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=500",
      content: "Achieving the perfect velvet micro-foam requires extreme precision. We start with high-quality milk chilled to exactly 4°C, introducing air early in the steaming process to create microscopic bubbles. By transitioning into a high-speed whirlpool vortex, we integrate that air fully, resulting in a glossy, paint-like consistency that perfectly complements our dark roasts."
    },
    {
      id: 2,
      title: "Sustainability at Source",
      summary: "A deep dive into our ethical sourcing practices across the globe.",
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=500",
      content: "Sustainability is the heart of our roastery. We bypass industrial supply chains to work directly with single-origin farms. This direct-trade model ensures that farmers receive premium pay far above fair-trade minimums. By investing in these local communities, we support biodiversity and traditional harvesting methods that preserve the unique floral notes of every bean we source."
    }
  ];

  // --- LOGIN VIEW ---
  if (!user) {
    return (
      <div className="auth-wrapper">
        <style>{`
          .auth-wrapper {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(rgba(45, 36, 30, 0.8), rgba(45, 36, 30, 0.9)), 
                        url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1280');
            background-size: cover;
            background-position: center;
            font-family: 'Lato', sans-serif;
          }
          .login-card {
            background: #FAF7F2;
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
          .login-card h2 { font-family: 'Playfair Display', serif; color: #2D241E; font-size: 32px; margin-bottom: 10px; }
          .login-card p { opacity: 0.6; margin-bottom: 30px; font-size: 14px; }
          .login-input {
            width: 100%;
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: white;
            font-family: inherit;
          }
          .login-btn {
            width: 100%;
            padding: 15px;
            background: #2D241E;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: background 0.3s;
          }
          .login-btn:hover { background: #C89666; }
          .toast {
            position: fixed; top: 25px; left: 50%; transform: translateX(-50%);
            background: #2D241E; color: white; padding: 15px 35px;
            border-radius: 50px; z-index: 2000; font-weight: 700;
            border: 1px solid #C89666;
          }
        `}</style>
        {notification && <div className="toast">{notification}</div>}
        <div className="login-card">
          <h2>The Velvet Bean</h2>
          <p>Sign in to your artisanal account</p>
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Username" 
              className="login-input" 
              required 
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="login-input" 
              required 
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
            <button type="submit" className="login-btn">Enter Roastery</button>
          </form>
          <div style={{marginTop: '20px', fontSize: '12px', opacity: 0.5}}>
            Forgot your password? <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Recover here.</span>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP VIEW ---
  return (
    <div className="app-root">
      <style>{`
        :root {
          --espresso: #2D241E;
          --crema: #C89666;
          --cream: #FFF3DD;
          --paper: #FAF7F2;
          --accent: #4A3728;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        body {
          font-family: 'Lato', sans-serif;
          background-color: #E5E5E5;
          color: var(--espresso);
        }

        .slide-container {
          width: 95vw;
          max-width: 1280px;
          height: auto;
          background-color: var(--paper);
          margin: 40px auto;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 80px 40px 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          border-radius: 12px;
          overflow: hidden;
        }

        /* Nav */
        .top-nav {
          position: absolute;
          top: 30px;
          right: 40px;
          display: flex;
          gap: 20px;
          z-index: 100;
          align-items: center;
        }
        .top-nav a {
          text-decoration: none;
          color: var(--crema);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: color 0.3s;
        }
        .logout-link {
          color: #ff4444 !important;
          cursor: pointer;
        }

        section { padding: 80px 0 40px; }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 44px;
          margin-bottom: 40px;
          border-left: 6px solid var(--crema);
          padding-left: 20px;
          color: var(--espresso);
        }

        /* Hero */
        .home-hero {
          height: 600px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 8px;
          overflow: hidden;
          background: linear-gradient(rgba(45, 36, 30, 0.7), rgba(45, 36, 30, 0.8)), 
                      url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1280');
          background-size: cover;
          background-position: center;
          color: var(--cream);
          margin-bottom: 20px;
        }

        .home-hero h1 {
          font-size: clamp(3rem, 8vw, 6rem);
          font-family: 'Playfair Display', serif;
          margin-bottom: 10px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        /* About Section */
        .about-flex {
            display: flex;
            gap: 60px;
            align-items: center;
            flex-wrap: wrap;
        }
        .about-text { flex: 1.2; min-width: 300px; }
        
        .about-img-single { 
            flex: 0.8; 
            min-width: 300px; 
            height: 450px; 
            object-fit: cover; 
            border-radius: 12px; 
            box-shadow: 15px 15px 0 var(--crema);
        }

        /* Menu Grid */
        .menu-category-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          margin: 40px 0 25px;
          color: var(--crema);
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .tile {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .tile:hover { transform: translateY(-8px); border-color: var(--crema); }

        .tile-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
          background-color: #eee;
        }

        .price-tag { font-size: 20px; font-weight: 800; color: var(--crema); margin: 10px 0; }

        .btn-add {
          background: var(--espresso);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 6px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 11px;
          text-align: center;
        }

        /* Blogs */
        .blog-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        .blog-card:hover { transform: scale(1.02); }
        .blog-img { width: 100%; height: 220px; object-fit: cover; }
        .blog-content { padding: 25px; }
        .blog-content h4 { font-family: 'Playfair Display', serif; font-size: 20px; margin-bottom: 12px; }
        .blog-content p { font-size: 14px; opacity: 0.7; line-height: 1.6; margin-bottom: 20px; }

        /* Blog Modal */
        .blog-modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .blog-modal {
          background: var(--paper);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 12px;
          position: relative;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .blog-modal img { width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 20px; }

        /* BLEND circular trigger */
        .cart-float {
          position: fixed; bottom: 35px; right: 35px;
          background: var(--espresso); color: white;
          width: 80px; height: 80px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 1000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 2px solid var(--crema);
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .cart-float span { font-size: 13px; font-weight: 900; letter-spacing: 1.5px; color: white; }

        .side-panel {
          position: fixed; top: 0; right: 0; width: 100%; max-width: 420px; height: 100vh;
          background: white; z-index: 1001; padding: 45px;
          transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex; flex-direction: column;
        }
        .side-panel.open { transform: translateX(0); }

        .ledger-row {
          display: flex; justify-content: space-between;
          padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px;
        }

        .toast {
          position: fixed; top: 25px; left: 50%; transform: translateX(-50%);
          background: var(--espresso); color: white; padding: 15px 35px;
          border-radius: 50px; z-index: 2000; font-weight: 700;
          border: 1px solid var(--crema);
        }
      `}</style>

      {notification && <div className="toast">{notification}</div>}

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="blog-modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="blog-modal" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedBlog(null)} 
              style={{position:'absolute', top:'20px', right:'20px', border:'none', background:'none', cursor:'pointer', fontSize:'24px'}}
            >✕</button>
            <img src={selectedBlog.image} alt={selectedBlog.title} />
            <h2 style={{fontFamily: 'Playfair Display', marginBottom: '15px'}}>{selectedBlog.title}</h2>
            <p style={{lineHeight: '1.8', opacity: 0.8}}>{selectedBlog.content}</p>
            <button className="btn-add" style={{marginTop: '30px', padding: '12px 25px'}} onClick={() => setSelectedBlog(null)}>Close Reader</button>
          </div>
        </div>
      )}

      {/* BLEND circular trigger */}
      <div className="cart-float" onClick={toggleCart}>
        <span>BLEND</span>
        {cart.length > 0 && (
          <div style={{
            position:'absolute', top:'-2px', right:'-2px', 
            background:'var(--crema)', color:'white',
            width:'26px', height:'26px', borderRadius:'50%', 
            fontSize:'12px', display:'flex', alignItems:'center', justifyContent:'center',
            border: '2px solid var(--espresso)', fontWeight: '900'
          }}>
            {cart.length}
          </div>
        )}
      </div>

      <div className={`side-panel ${isCartOpen ? 'open' : ''}`}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center'}}>
          <h2 style={{fontFamily: 'Playfair Display', fontSize: '32px'}}>Your Blends</h2>
          <button onClick={toggleCart} style={{border: 'none', background: 'none', cursor: 'pointer', fontSize: '28px'}}>✕</button>
        </div>
        <div style={{flexGrow: 1, overflowY: 'auto'}}>
          {cart.length === 0 ? <p style={{textAlign:'center', opacity:0.5, marginTop:'40px'}}>No blends selected yet.</p> : cart.map(item => (
            <div className="cart-item" key={item.id} style={{display:'flex', justifyContent:'space-between', padding:'15px 0', borderBottom:'1px solid #f0f0f0', alignItems: 'center'}}>
              <div>
                <div style={{fontWeight: 'bold', fontSize:'16px'}}>{item.name}</div>
                <div style={{fontSize: '11px', opacity: 0.5}}>{item.timestamp}</div>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{fontWeight:'800', color:'var(--crema)'}}>₹{item.price}</span>
                <button onClick={() => removeFromCart(item.id)} style={{color:'#ff4444', border:'none', background:'none', cursor:'pointer', marginLeft:'15px'}}>✕</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop: '2px solid var(--espresso)', paddingTop: '25px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '900'}}>
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <button className="btn-add" style={{width:'100%', marginTop:'20px', padding:'18px', fontSize:'14px'}}>Complete Selection</button>
        </div>
      </div>

      <div className="slide-container">
        <div className="top-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#blogs">Blogs</a>
          <a href="#contact">Contact</a>
          <a onClick={handleLogout} className="logout-link">Logout</a>
        </div>

        <div className="home-hero" id="home">
          <div>
            <p style={{textTransform: 'uppercase', letterSpacing: '8px', fontWeight: '700', color: 'var(--crema)', marginBottom: '10px'}}>Est. 2024</p>
            <h1>The Velvet Bean</h1>
            <p style={{fontSize: '24px', maxWidth: '650px', margin: '0 auto', fontWeight: '300'}}>Artisanal roasts and balanced micro-foam.</p>
          </div>
        </div>

        <section id="about">
            <h2 className="section-title">Our Story</h2>
            <div className="about-flex">
                <div className="about-text">
                    <p style={{fontSize: '20px', lineHeight: '1.8', marginBottom: '25px', color: 'var(--accent)'}}>
                        At <strong>The Velvet Bean</strong>, we focus on the essence of the bean. Every selection is a custom craft, balanced between bold intensity and delicate, beige micro-foam comfort.
                    </p>
                    <p style={{fontSize: '17px', opacity: 0.8, lineHeight: '1.7', marginBottom: '20px'}}>
                        Founded in 2024, our roastery ensures that every cup served is sustainable, fresh, and uniquely textured.
                    </p>
                </div>
                <img className="about-img-single" src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1000" alt="Coffee Cup resting on Fresh Beans" />
            </div>
        </section>

        <section id="menu">
          <h2 className="section-title">The Menu</h2>
          
          <h3 className="menu-category-title">Espresso Classics</h3>
          <div className="grid">
            <MenuItem name="Espresso Latte" price={340} img="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
            <MenuItem name="Cappuccino" price={320} img="https://images.unsplash.com/photo-1517701550541-628d0f19c00b?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
            <MenuItem name="Cortado" price={300} img="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
            <MenuItem name="Americano" price={280} img="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
          </div>

          <h3 className="menu-category-title">Cold Beverages</h3>
          <div className="grid">
            <MenuItem name="Signature Cold Brew" price={380} img="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
            <MenuItem name="Nitro Cold Brew" price={420} img="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
            <MenuItem name="Vietnamese Iced" price={390} img="https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
          </div>

          <h3 className="menu-category-title">Matcha & Mojito</h3>
          <div className="grid">
            <MenuItem name="Strawberry Matcha" price={495} img="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
            <MenuItem name="Mint Mojito" price={380} img="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=500" onAdd={addToCart} />
            <MenuItem name="Matcha Frappé" price={480} img="https://images.unsplash.com/photo-1536496070240-2a7fbda4c97f?auto=format&fit=crop&q=80&w=600" onAdd={addToCart} />
          </div>
        </section>

        <section id="blogs">
            <h2 className="section-title">Latest Blogs</h2>
            <div className="grid">
                {blogs.map(blog => (
                  <div className="blog-card" key={blog.id}>
                      <img className="blog-img" src={blog.image} alt={blog.title} />
                      <div className="blog-content">
                          <h4>{blog.title}</h4>
                          <p>{blog.summary}</p>
                          <button 
                            onClick={() => setSelectedBlog(blog)}
                            style={{color: 'var(--crema)', fontWeight: 'bold', textDecoration: 'none', border:'none', background:'none', cursor:'pointer'}}
                          >
                            Read More →
                          </button>
                      </div>
                  </div>
                ))}
            </div>
        </section>

        <section id="contact">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-container">
                <form className="contact-form" onSubmit={(e) => { e.preventDefault(); showNotification("Message Sent!"); }}>
                    <input type="text" placeholder="Full Name" className="login-input" required />
                    <input type="email" placeholder="Email Address" className="login-input" required />
                    <textarea placeholder="Your Message" rows="6" className="login-input" style={{resize: 'none'}} required></textarea>
                    <button className="btn-add" style={{width: '100%', padding: '18px'}}>Send Message</button>
                </form>
            </div>
        </section>

        <div id="storage" style={{background: '#fdfaf7', border: '2px dashed var(--crema)', borderRadius: '12px', padding: '40px', marginTop: '80px'}}>
          <h2 style={{fontFamily: 'Playfair Display', marginBottom: '30px', color: 'var(--espresso)'}}>Stored Blends Ledger</h2>
          {cart.length === 0 ? <p style={{opacity:0.5, fontStyle:'italic'}}>System memory is empty. Select a blend to begin storage.</p> : (
            <div style={{background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)'}}>
              <div className="ledger-row" style={{fontWeight: '900', color: 'var(--crema)', borderBottom: '2px solid var(--paper)'}}>
                <span>BLENDED ITEM</span>
                <span>ENTRY TIMESTAMP</span>
                <span>UNIT PRICE</span>
              </div>
              {cart.map(item => (
                <div className="ledger-row" key={item.id}>
                  <span style={{fontWeight:'700'}}>{item.name}</span>
                  <span style={{opacity: 0.6}}>{item.timestamp}</span>
                  <span style={{fontWeight: '800'}}>₹{item.price}</span>
                </div>
              ))}
              <div className="ledger-row" style={{borderTop: '2px solid var(--crema)', marginTop: '15px', fontWeight: '900', fontSize: '20px', color: 'var(--espresso)'}}>
                <span>AGGREGATE VALUE</span>
                <span></span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          )}
        </div>

        <footer style={{textAlign: 'center', padding: '100px 0 60px', borderTop: '1px solid #eee', marginTop: '80px'}}>
          <h3 style={{fontFamily: 'Playfair Display', fontSize: '32px', marginBottom:'15px'}}>The Velvet Bean Roastery</h3>
          <p style={{opacity: 0.6, fontSize: '14px', letterSpacing:'1px'}}>Sourcing • Roasting • Serving since 2024</p>
        </footer>
      </div>
    </div>
  );
};

const MenuItem = ({ name, price, img, onAdd }) => (
  <div className="tile" onClick={() => onAdd(name, price)}>
    <img src={img} alt={name} className="tile-img" />
    <h3 style={{fontSize: '22px', fontWeight: '700', marginTop: '10px'}}>{name}</h3>
    <div className="price-tag">₹{price}</div>
    <div className="btn-add">Select Blend</div>
  </div>
);

export default App;
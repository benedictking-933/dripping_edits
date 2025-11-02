import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./CartPage.css";

export function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  const updateCartItem = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteCartItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (loading) return <div className="loading">Loading cart...</div>;
  if (cartItems.length === 0) return <div className="empty-cart">Your cart is empty.</div>;

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="directory">
          <p>Home &gt; Checkout &gt; Cart</p>
        </div>

        <div className="checkout">
          <table className="order-summary-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-image-container">
                      <img className="product-image" src={item.image_url} alt={item.name} />
                      <div className="product-details">{item.name}</div>
                    </div>
                  </td>
                  <td>{Number(item.price).toFixed(2)} FCFA</td>
                  <td>
                    <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className="quantity-button">-</button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="quantity-button">+</button>
                  </td>
                  <td>{(Number(item.price) * item.quantity).toFixed(2)} FCFA</td>
                  <td>
                    <button onClick={() => deleteCartItem(item.id)} className="remove-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="payment-summary">
            <div className="summary-header">
              <h3>Cart Totals</h3>
              <div className="subtotal-row">
                <h5>Subtotal</h5>
                <p>{total.toFixed(2)} FCFA</p>
              </div>
            </div>

            <Link to="/payment">
              <button className="proceed-button">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;

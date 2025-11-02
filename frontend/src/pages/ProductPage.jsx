import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import searchIcon from "../assets/icons/magnifying-glass.png";
import viewIcon from "../assets/icons/view.png";
import cartIcon from "../assets/icons/shopping-cart.png";
import "./ProductPage.css";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goToDetails = (id) => navigate(`/products/${id}`);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from("products").select("*");

        if (category !== "All") query = query.eq("category", category);
        if (search.trim() !== "") query = query.ilike("name", `%${search}%`);

        const { data, error } = await query;
        if (error) throw error;

        const productsWithImages = await Promise.all(
          data.map(async (product) => {
            if (product.image_path) {
              const { data: imageData } = supabase.storage
                .from("product-images")
                .getPublicUrl(product.image_path);
              product.image_url = imageData.publicUrl;
            }
            return product;
          })
        );

        setProducts(productsWithImages || []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  const addToCart = (product) => {
    // You can later integrate your cart logic here
    alert(`Added ${product.name} to cart`);
  };

  return (
    <>
      <title>Shop Page</title>
      <Header />
      <div className="product-page container">

        {/* Search Section */}
        <div className="search-bar-wrapper d-flex justify-content-between align-items-center my-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select category-select"
          >
            <option value="All">All Categories</option>
            <option value="Phones">Phones</option>
            <option value="Laptops">Laptops</option>
            <option value="Desktops">Desktops</option>
            <option value="Gaming">Gaming</option>
          </select>

          <div className="search-input-wrapper d-flex flex-grow-1 mx-3">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn search-btn">
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid row">
          {loading ? (
            <div className="text-center w-100 py-5">
              <div className="loader mb-2"></div>
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center w-100 py-5">No products found.</div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="product-card shadow-sm rounded position-relative overflow-hidden">
                  <div className="product-image-container position-relative">
                    <img
                      className="product-image w-100"
                      src={product.image_url || "/placeholder.png"}
                      alt={product.name}
                    />
                    <div className="product-overlay d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => goToDetails(product.id)}
                        className="overlay-btn view-btn me-2"
                        title="View Details"
                      >
                        <img src={viewIcon} alt="View" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="overlay-btn cart-btn"
                        title="Add to Cart"
                      >
                        <img src={cartIcon} alt="Cart" />
                      </button>
                    </div>
                  </div>
                  <div className="product-info text-center p-2">
                    <div className="product-name fw-bold">{product.name}</div>
                    <div className="product-price text-primary">
                      {product.price?.toLocaleString()} FCFA
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;

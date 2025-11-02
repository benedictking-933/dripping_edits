import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./ProductDetail.css";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data: prodData, error: prodErr } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (prodErr) throw prodErr;
        if (!prodData) throw new Error("Product not found");

        setProduct(prodData);
        setMainImage(prodData.main_image_url || prodData.image_url);

        // Related products
        const { data: relData } = await supabase
          .from("products")
          .select("*")
          .eq("category", prodData.category)
          .neq("id", id)
          .limit(4);

        setRelated(relData || []);
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setProduct(null);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const changeQty = (delta) => setQty(prev => Math.max(1, prev + delta));

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = existingCart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += qty;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image_url: product.main_image_url || product.image_url
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} (qty: ${qty}) added to cart!`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="notfound">Product not found</div>;

  return (
    <>
      <Header />
      <main className="container">
        <section className="breadcrumb">
          <h5 className="category">{product.category || "Category"}</h5>
          <p>Home &gt; Shop Page &gt; {product.category}</p>
        </section>

        <section className="topRow">
          <div className="leftCol">
            <div className="imageWrap">
              <div className="mainImageBox">
                <img className="mainImage" src={mainImage} alt={product.name} />
              </div>
              <div className="thumbnailRow">
                {[product.main_image_url, product.image_url]
                  .filter(Boolean)
                  .map((u, i) => (
                    <button key={i} className="thumbBtn" onClick={() => setMainImage(u)}>
                      <img src={u} alt={`${product.name} ${i}`} />
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="rightCol">
            <h1 className="title">{product.name}</h1>

            <div className="priceRow">
              <div className="price">{Number(product.price).toFixed(2)} FCFA</div>
              <div className="rating">
                <span className="ratingStars">{product.rating || 0}</span>
                <span className="ratingCount">({product.rating_count || 0})</span>
              </div>
            </div>

            <div className="stockAdd">
              <div className="stock">
                {product.in_stock ? (
                  <span className="inStock">IN STOCK</span>
                ) : (
                  <span className="outStock">OUT OF STOCK</span>
                )}
              </div>

              <div className="qtyControl">
                <button onClick={() => changeQty(-1)} className="qtyBtn">-</button>
                <input className="qtyInput" readOnly value={qty} />
                <button onClick={() => changeQty(1)} className="qtyBtn">+</button>
              </div>

              <div className="actionButtons">
                <button onClick={addToCart} className="primaryBtn">Add To Cart</button>
              </div>

              <div className="meta">
                <div>SKU: <span className="metaValue">{product.sku}</span></div>
                <div>Category: <span className="metaValue">{product.category}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="descriptionSection">
          <h3 className="sectionTitle">Description</h3>
          <div className="descriptionText">
            <div dangerouslySetInnerHTML={{ __html: (product.description || "").replace(/\n/g, "<br/>") }} />
          </div>
        </section>

        <section className="relatedSection">
          <h3 className="sectionTitle">Related products</h3>
          <div className="relatedGrid">
            {related.map(r => (
              <Link key={r.id} to={`/products/${r.id}`} className="relatedCard">
                <img src={r.main_image_url || r.image_url} alt={r.name} />
                <div className="relatedInfo">
                  <div className="relatedName">{r.name}</div>
                  <div className="relatedPrice">{Number(r.price).toFixed(2)} FCFA</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetail;

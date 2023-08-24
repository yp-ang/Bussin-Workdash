import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductForm = () => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [price, setLoad] = useState("");
  const [quantity, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const product = { title, price, quantity };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>

      <label>Product Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Price (SGD):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={price}
        className={emptyFields.includes("price") ? "error" : ""}
      />

      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
      />

      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;

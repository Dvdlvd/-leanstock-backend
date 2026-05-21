import { useState } from "react";
import api from "../services/api";

export default function CreateProduct({ onCreated }) {

  const [name, setName] =
    useState("");

  const [sku, setSku] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const createProduct = async () => {

    try {

      await api.post(
        "/products",
        {
          name,
          sku,
          price: Number(price),
          quantity: Number(quantity)
        },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setName("");
      setSku("");
      setPrice("");
      setQuantity("");

      onCreated();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="bg-zinc-900 p-6 rounded-2xl mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Create Product
      </h2>

      <div className="grid grid-cols-4 gap-4">

        <input
          placeholder="Name"
          className="bg-zinc-800 p-3 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="SKU"
          className="bg-zinc-800 p-3 rounded"
          value={sku}
          onChange={(e) =>
            setSku(e.target.value)
          }
        />

        <input
          placeholder="Price"
          className="bg-zinc-800 p-3 rounded"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          placeholder="Quantity"
          className="bg-zinc-800 p-3 rounded"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

      </div>

      <button
        onClick={createProduct}
        className="mt-4 bg-white text-black px-6 py-3 rounded font-bold"
      >
        Create
      </button>

    </div>

  );

}
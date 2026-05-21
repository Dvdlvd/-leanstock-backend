import { useState } from "react";
import api from "../services/api";

export default function TransferInventory({
  products,
  reload,
  setReload
}) {

  const [productId, setProductId] =
    useState("");

  const [fromLocationId, setFromLocationId] =
    useState("");

  const [toLocationId, setToLocationId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const transfer = async () => {

    try {

      await api.post(
        "/inventory/transfer",
        {
          productId,
          fromLocationId,
          toLocationId,
          quantity: Number(quantity)
        },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Transfer completed");

      setReload(!reload);

    } catch (err) {

      alert(
        err.response?.data?.error
      );

    }

  };

  return (

    <div className="bg-zinc-900 p-6 rounded-2xl mb-8">

      <h2 className="text-3xl font-bold mb-6">
        Transfer Inventory
      </h2>

      <div className="grid grid-cols-4 gap-4">

        <select
          className="bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setProductId(e.target.value)
          }
        >
          <option>
            Product
          </option>

          {products.map((p) => (

            <option
              key={p.id}
              value={p.id}
            >
              {p.name}
            </option>

          ))}

        </select>

        <input
          placeholder="From Location ID"
          className="bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setFromLocationId(
              e.target.value
            )
          }
        />

        <input
          placeholder="To Location ID"
          className="bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setToLocationId(
              e.target.value
            )
          }
        />

        <input
          placeholder="Quantity"
          className="bg-zinc-800 p-3 rounded"
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

      </div>

      <button
        onClick={transfer}
        className="mt-4 bg-blue-500 px-6 py-3 rounded font-bold"
      >
        Transfer
      </button>

    </div>

  );

}
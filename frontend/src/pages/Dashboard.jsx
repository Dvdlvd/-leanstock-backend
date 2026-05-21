// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";

import api from "../services/api";

import CreateProduct
  from "../components/CreateProduct";

import TransferInventory
  from "../components/TransferInventory";

import AnalyticsChart
  from "../components/AnalyticsChart";

import AuditLogs
  from "./AuditLogs";

export default function Dashboard() {

  const [products, setProducts] =
    useState([]);

  const [reload, setReload] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const fetchProducts = async () => {

    try {

      const response =
        await api.get(
          "/products",
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

      setProducts(
        response.data.data
      );

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, [reload]);

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.reload();

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-start mb-10">

        <div>

          <h1 className="text-6xl font-bold">
            LeanStock
          </h1>

          <p className="text-zinc-400 mt-2">
            Smart Inventory Dashboard
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>


      {/* ANALYTICS */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <p className="text-zinc-400">
            Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {products.length}
          </h2>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <p className="text-zinc-400">
            Total Quantity
          </p>

          <h2 className="text-4xl font-bold mt-2">

            {
              products.reduce(
                (acc, p) =>
                  acc + p.quantity,
                0
              )
            }

          </h2>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <p className="text-zinc-400">
            Low Stock
          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-500">

            {
              products.filter(
                p => p.lowStock
              ).length
            }

          </h2>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <p className="text-zinc-400">
            Inventory Value
          </p>

          <h2 className="text-4xl font-bold mt-2">

            ₸ {
              products.reduce(
                (acc, p) =>
                  acc + (
                    p.price * p.quantity
                  ),
                0
              )
            }

          </h2>

        </div>

      </div>


      {/* SEARCH */}

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-zinc-900
          p-4
          rounded-2xl
          mb-8
        "
      />


      <CreateProduct
        reload={reload}
        setReload={setReload}
      />

      <TransferInventory
        products={products}
        reload={reload}
        setReload={setReload}
      />


      {/* CHART */}

      <AnalyticsChart
        products={products}
      />


      {/* AUDIT LOGS */}

      <AuditLogs />


      {/* PRODUCTS */}

      <div className="grid grid-cols-3 gap-6 mt-10">

        {
          products
            .filter(product =>
              product.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((product) => (

              <div
                key={product.id}
                className={`
                  p-6 rounded-2xl
                  ${
                    product.lowStock
                      ? "bg-red-950 border border-red-500"
                      : "bg-zinc-900"
                  }
                `}
              >

                <h2 className="text-4xl font-bold mb-6">
                  {product.name}
                </h2>

                <div className="space-y-3 text-zinc-400">

                  <p>
                    SKU: {product.sku}
                  </p>

                  <p>
                    Price: ₸ {product.price}
                  </p>

                  <p>
                    Quantity: {product.quantity}
                  </p>

                  <p>
                    Low Stock:
                    {" "}
                    {
                      product.lowStock
                        ? "YES"
                        : "NO"
                    }
                  </p>

                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={async () => {

                      const newPrice =
                        prompt(
                          "New price:"
                        );

                      if (!newPrice)
                        return;

                      await api.put(
                        `/products/${product.id}`,
                        {
                          ...product,
                          price: Number(newPrice)
                        },
                        {
                          headers: {
                            Authorization:
                              `Bearer ${localStorage.getItem("token")}`
                          }
                        }
                      );

                      setReload(!reload);

                    }}
                    className="bg-yellow-500 text-black px-4 py-2 rounded font-bold"
                  >
                    Edit Price
                  </button>

                  <button
                    onClick={async () => {

                      const confirmDelete =
                        confirm(
                          "Delete product?"
                        );

                      if (!confirmDelete)
                        return;

                      await api.delete(
                        `/products/${product.id}`,
                        {
                          headers: {
                            Authorization:
                              `Bearer ${localStorage.getItem("token")}`
                          }
                        }
                      );

                      setReload(!reload);

                    }}
                    className="bg-red-500 px-4 py-2 rounded font-bold"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
        }

      </div>

    </div>

  );

}
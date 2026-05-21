import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
  
  export default function AnalyticsChart({
    products
  }) {
  
    const data =
      products.map(product => ({
  
        name: product.name,
  
        quantity:
          product.quantity,
  
        price:
          product.price
  
      }));
  
    return (
  
      <div className="bg-zinc-900 p-6 rounded-2xl mb-10">
  
        <h2 className="text-3xl font-bold mb-6 text-white">
          Inventory Analytics
        </h2>
  
        <ResponsiveContainer
          width="100%"
          height={300}
        >
  
          <BarChart data={data}>
  
            <XAxis dataKey="name" />
  
            <YAxis />
  
            <Tooltip />
  
            <Bar
              dataKey="quantity"
              fill="#ef4444"
            />
  
          </BarChart>
  
        </ResponsiveContainer>
  
      </div>
  
    );
  
  }
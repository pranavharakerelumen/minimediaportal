// Reservations.jsx
import React, { useEffect, useState } from "react";

const Reservations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/customer/service/_active/status")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setLoading(false);
      });
  }, []);

  const columns = [
    "reservation_id",
    "reservation_name",
    "customer_abbr",
    "start_date",
    "end_date",
    "status_code",
    "product",
    "event_type"
  ];

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Active Reservations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-2 border-b text-left">
                  {col.replace(/_/g, " ").toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 border-b">
                    {row[col] ?? "--"}
                  </td>
                ))}
              </tr>
            ))} */}
            {data.map((row, idx) => {
                console.log("Row:", row); // 👈 This logs each row to the browser console
                return (
                <tr key={idx} className="hover:bg-gray-50">
                    {columns.map((col) => (
                    <td key={col} className="px-4 py-2 border-b">
                        {typeof row[col] === "string" ? row[col].trim() : row[col] ?? "--"}
                    </td>
                    ))}
                </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
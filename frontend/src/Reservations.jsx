// Reservations.jsx
import React, { useEffect, useState } from "react";

const customerOptions = [
  "VYVX",
  "VYVXSPTS", // what is the db name for all of these??
  "VYVXLCD"
];

const Reservations = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("VYVX");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/customer/service/_active/status?customer_abbr=${encodeURIComponent(selectedCustomer)}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setLoading(false);
      });
  }, [selectedCustomer]);

  const columns = [
    "customer_abbr",
    "reservation_id",
    "reservation_name",
    "status_code",
    "start_date",
    "end_date",
    "origin", // need to change
    "destination" // need to change
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Active Reservations</h2>
      
      {/* Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Filter by Customer Abbrev:</label>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {customerOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
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
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-2 border-b">
                      {typeof row[col] === "string" ? row[col].trim() : row[col] ?? "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reservations;

// import React, { useEffect, useState } from "react";

// const Reservations = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8000/customer/service/_active/status")
//       .then((res) => res.json())
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching reservations:", err);
//         setLoading(false);
//       });
//   }, []);

//   const columns = [ // pick the columns exactly in media portal
//     "reservation_id",
//     "reservation_name",
//     "customer_abbr",
//     "start_date",
//     "end_date",
//     "status_code",
//     "product",
//     "event_type"
//   ];

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Active Reservations</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               {columns.map((col) => (
//                 <th key={col} className="px-4 py-2 border-b text-left">
//                   {col.replace(/_/g, " ").toUpperCase()}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/* {data.map((row, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 {columns.map((col) => (
//                   <td key={col} className="px-4 py-2 border-b">
//                     {row[col] ?? "--"}
//                   </td>
//                 ))}
//               </tr>
//             ))} */}
//             {data.map((row, idx) => {
//                 console.log("Row:", row); // logging entries in browser console
//                 return (
//                 <tr key={idx} className="hover:bg-gray-50">
//                     {columns.map((col) => (
//                     <td key={col} className="px-4 py-2 border-b">
//                         {typeof row[col] === "string" ? row[col].trim() : row[col] ?? "--"}
//                     </td>
//                     ))}
//                 </tr>
//                 );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reservations;
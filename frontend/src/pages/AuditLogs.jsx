import { useEffect, useState }
  from "react";

import api from "../services/api";

export default function AuditLogs() {

  const [logs, setLogs] =
    useState([]);

  const fetchLogs = async () => {

    try {

      const response =
        await api.get(
          "/audit-logs",
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

      setLogs(response.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchLogs();

  }, []);

  return (

    <div className="bg-zinc-900 p-6 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Audit Logs
      </h2>

      <div className="space-y-4">

        {logs.map((log) => (

          <div
            key={log.id}
            className="bg-zinc-800 p-4 rounded-xl"
          >

            <p className="font-bold">
              {log.action}
            </p>

            <p className="text-zinc-400">
              {log.details}
            </p>

            <p className="text-sm text-zinc-500 mt-2">
              {
                new Date(
                  log.createdAt
                ).toLocaleString()
              }
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}
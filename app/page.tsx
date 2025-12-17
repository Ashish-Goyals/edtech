"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
}

export default function Home() {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchTasks = async (): Promise<void> => {
      try {
        const res = await axios.get<Task[]>("/api/task");

        if (mounted) {
          setData(res.data ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        if (mounted) setData([]);
      }
    };

    fetchTasks();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          EdTech Task Manager
        </h1>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2 hidden md:table-cell">
                  Description
                </th>
                <th className="px-3 py-2 hidden lg:table-cell">
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-sm text-gray-600"
                  >
                    No tasks found
                  </td>
                </tr>
              )}

              {data.map((item) => (
                <tr key={item._id} className="align-top border-t">
                  <td className="px-3 py-3 align-top">
                    <div className="font-semibold">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500 md:hidden">
                      {item.description}
                    </div>
                  </td>

                  <td className="px-3 py-3 hidden md:table-cell max-w-xs">
                    <div className="text-sm text-gray-700 truncate">
                      {item.description}
                    </div>
                  </td>

                  <td className="px-3 py-3 hidden lg:table-cell">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

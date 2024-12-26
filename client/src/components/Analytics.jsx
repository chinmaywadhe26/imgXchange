import DashboardHeader from "../components/DashboardHeader";
import { useLocation } from "react-router-dom";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import ExpenseCard from "./ExpenseCard";
import axios from "axios";
import { useEffect, useState } from "react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Analytics = () => {
  const { pathname } = useLocation();
  const [tillNow, setTillNow] = useState([]);
  const [ThisYear, setThisYear] = useState([]);
  const [ThisMonth, setThisMonth] = useState([]);
  const [ThisWeek, setThisWeek] = useState([]);
  const getPostsByDateRange = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/post/getPostsByRange",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );
      const { data } = res.data;
      console.log(data);
      setTillNow(data.tillNow);
      setThisYear(data.thisYear);
      setThisMonth(data.thisMonth);
      setThisWeek(data.thisWeek);
    } catch (error) {
      console.error("Error fetching posts by date range:", error);
    }
  };
  


  useEffect(() => {
    getPostsByDateRange();
  }, []);
  return (
    <div>
      <DashboardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8 ">Analytics</h1>
      <h2 className="text-2xl font-semibold mb-5 ml-8">
        {pathname === "/seller/profile" ? "Uploaded" : "Purchased"} This Year
      </h2>
      <div className="w-[83vw] sm:w-[80vw] ml-8 p-2 bg-white rounded-2xl shadow-md flex flex-col justify-between items-center gap-5">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            margin={{
              top: 20,
              bottom: -50,
              left: -61,
            }}
            data={data}
          >
            <XAxis dataKey="title" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amt"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <p>Total Earned 15k</p>
      </div>
      <h2 className="text-2xl font-semibold mb-5 ml-8">
        {pathname === "/seller/profile" ? "Uploaded" : "Purchased"} This Month
      </h2>
      <div className="w-[83vw] sm:w-[80vw] ml-8 p-2 bg-white rounded-2xl shadow-md flex flex-col justify-between items-center gap-5">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            margin={{
              top: 20,
              bottom: -50,
              left: -61,
            }}
            data={data}
          >
            <XAxis dataKey="title" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amt"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <p>Total Earned 15k</p>
      </div>
      <h2 className="text-2xl font-semibold mb-5 ml-8">
        {pathname === "/seller/profile" ? "Uploaded" : "Purchased"} This Week
      </h2>
      <div className="w-[83vw] sm:w-[80vw] ml-8 p-2 bg-white rounded-2xl shadow-md flex flex-col justify-between items-center gap-5">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            margin={{
              top: 20,
              bottom: -50,
              left: -61,
            }}
            data={data}
          >
            <XAxis dataKey="title" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amt"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <p>Total Earned 15k</p>
      </div>
    </div>
  );
};
export default Analytics;

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { filterData } from "../data";
const dataSet = filterData.filter((data) => data.minExp !== null);

const InfiniteScroll = () => {
  const [data, setData] = useState(dataSet.slice(0, 10));

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMoreData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMoreData = () => {
    const existingDataLength = data.length;
    const newData = dataSet.slice(existingDataLength, existingDataLength + 10);
    if (newData.length > 0) {
      setData([...data, ...newData]);
    }
  };

  return (
    <div className="jobCardContainer">
      {data.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </div>
  );
};

export default InfiniteScroll;

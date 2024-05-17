import React, { useCallback, useEffect, useRef, useState } from "react";
import JobCard from "./JobCard";
import { filterData } from "../data";
import { useSelector } from "react-redux";

const InfiniteScroll = () => {
  const { minExp, companyName, location, remote, role, minBasePay } =
    useSelector((state) => state.filter);

  const [data, setData] = useState([]);
  const observer = useRef();

  const lastJobElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && filteredData.length > data.length) {
          loadMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.length]
  );

  const filteredData = filterData.filter((job) => {
    const meetsMinExp = minExp === null || job.minExp >= minExp;
    const meetsCompanyName = companyName
      ? job.companyName.toLowerCase().includes(companyName.toLowerCase())
      : true;
    const meetsLocation = location
      ? job.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const meetsRemote =
      remote === null || (job.location.toLowerCase() === "remote") === remote;
    const meetsRole = role
      ? job.jobRole.toLowerCase().includes(role.toLowerCase())
      : true;
    const meetsMinBasePay =
      minBasePay === null || (job.minJdSalary && job.minJdSalary >= minBasePay);

    return (
      meetsMinExp &&
      meetsCompanyName &&
      meetsLocation &&
      meetsRemote &&
      meetsRole &&
      meetsMinBasePay
    );
  });

  useEffect(() => {
    setData(filteredData.slice(0, 10));
  }, [minExp, companyName, location, remote, role, minBasePay]);

  const loadMoreData = () => {
    const existingDataLength = data.length;
    const newData = filteredData.slice(
      existingDataLength,
      existingDataLength + 10
    );
    if (newData.length > 0) {
      setData([...data, ...newData]);
    }
  };

  return (
    <div className="jobCardContainer">
      {data.map((job, index) => {
        if (data.length === index + 1) {
          return (
            <div ref={lastJobElementRef} key={job.jdUid}>
              <JobCard job={job} />
            </div>
          );
        } else {
          return <JobCard key={job.jdUid} job={job} />;
        }
      })}
    </div>
  );
};

export default InfiniteScroll;

import React, { useCallback, useEffect, useRef, useState } from "react";
import JobCard from "./JobCard";
import { filterData } from "../data";
import { useSelector } from "react-redux";

const InfiniteScroll = () => {
  const { minExp, companyName, location, remote, role, minBasePay } =
    useSelector((state) => state.filter);

  const [data, setData] = useState([]);
  const observer = useRef(); // For keeping the refrence of last card component.

  /**
   * Keep track of the last job card on the screen, after that hits loadMore function
   */
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

  /**
   * Filters data having null values
   */
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

  /**
   * To render whenever the state updates upon filtering
   */
  useEffect(() => {
    setData(filteredData.slice(0, 10));
  }, [minExp, companyName, location, remote, role, minBasePay]);

  /**
   * Loads data after reaching to the bottom of the screen or last job card
   */
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

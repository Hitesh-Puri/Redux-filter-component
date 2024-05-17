import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const JobCard = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDescriptionToggle = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = `${job.jobDetailsFromCompany.substring(
    0,
    100
  )}...`;

  return (
    <Card style={{ width: "400px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <b>{job.jobRole}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.location}
        </Typography>
        <Typography variant="body2">
          {showFullDescription
            ? job.jobDetailsFromCompany
            : truncatedDescription}
          <a onClick={handleDescriptionToggle} className="showMoreButton">
            {showFullDescription ? "Show Less" : "Show More"}
          </a>
        </Typography>
        <Typography style={{ margin: "0.75rem 0" }} variant="body2">
          <strong>Experience required:</strong> {job.minExp}
        </Typography>
        <Button variant="contained" color="primary">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;

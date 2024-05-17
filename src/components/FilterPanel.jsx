import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyName,
  setLocation,
  setMinBasePay,
  setMinExp,
  setRemote,
  setRole,
} from "../redux/filterSlice";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { minExp, companyName, location, remote, role, minBasePay } =
    useSelector((state) => state.filter);

  /**
   * OnChange handlers for various input text field
   */
  const handleMinExpChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    dispatch(setMinExp(value));
  };

  const handleCompanyNameChange = (e) => {
    dispatch(setCompanyName(e.target.value));
  };

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleRemoteChange = (e) => {
    dispatch(setRemote(e.target.value === "true"));
  };

  const handleRoleChange = (e) => {
    dispatch(setRole(e.target.value));
  };

  const handleMinBasePayChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    dispatch(setMinBasePay(value));
  };

  return (
    <div className="filterPanelContainer">
      <TextField
        name="minExperience"
        label="Min Experience"
        type="number"
        onChange={handleMinExpChange}
        value={minExp !== null ? minExp : ""}
      />
      <TextField
        name="companyName"
        label="Company Name"
        type="text"
        onChange={handleCompanyNameChange}
        value={companyName || ""}
      />
      <TextField
        name="location"
        label="Location"
        type="text"
        onChange={handleLocationChange}
        value={location || ""}
      />
      <FormControl>
        <InputLabel>Remote/On-site</InputLabel>
        <Select
          name="remote"
          value={remote !== null ? remote.toString() : ""}
          onChange={handleRemoteChange}
        >
          <MenuItem value={true}>Remote</MenuItem>
          <MenuItem value={false}>On-site</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="role"
        label="Role"
        type="text"
        onChange={handleRoleChange}
        value={role || ""}
      />
      <TextField
        name="minBasePay"
        label="Min Base Pay"
        type="number"
        onChange={handleMinBasePayChange}
        value={minBasePay !== null ? minBasePay : ""}
      />
    </div>
  );
};

export default FilterPanel;

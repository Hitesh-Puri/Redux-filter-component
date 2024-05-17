import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const FilterPanel = () => {
  return (
    <div className="filterPanelContainer">
      <TextField name="minExperience" label="Min Experience" type="number" />
      <TextField name="companyName" label="Company Name" type="text" />
      <TextField name="location" label="Location" type="text" />
      <FormControl>
        <InputLabel>Remote/On-site</InputLabel>
        <Select name="remote">
          <MenuItem value={true}>Remote</MenuItem>
          <MenuItem value={false}>On-site</MenuItem>
        </Select>
      </FormControl>
      <TextField name="role" label="Role" type="text" />
      <TextField name="minBasePay" label="Min Base Pay" type="number" />
    </div>
  );
};
export default FilterPanel;

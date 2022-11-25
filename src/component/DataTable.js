import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "name", width: 300 },
  { field: "email", headerName: "email", width: 600 },
  { field: "gender", headerName: "gender", width: 200 },
  { field: "status", headerName: "status", width: 200 },
];

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);

  let maleCount = 0;
  let femaleCount = 0;

  useEffect(() => {
    fetch("https://gorest.co.in/public/v2/users")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  console.log(tableData);
  console.log(tableData.length);

  return (
    <div style={{ height: 640, width: "100%" }}>
      <h1>Table</h1>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={tableData.length}
        checkboxSelection
        onSelectionModelChange={({ selectionModel }) => {
          const rowIds = selectionModel.map((rowId) =>
            parseInt(String(rowId), 10)
          );
          const rowsToDelete = tableData.filter((row) =>
            rowIds.includes(row.id)
          );
          setDeletedRows(rowsToDelete);
          console.log(deletedRows);
        }}
      />
      {tableData.map((tableData) => {
        console.log(tableData);
        if (tableData.gender == "male") maleCount++;
        if (tableData.gender == "female") femaleCount++;
      })}
      <td>
        <th>Total Males</th>
        {maleCount}

        <th>Total Females</th>
        {femaleCount}
      </td>
    </div>
  );
};

export default DataTable;

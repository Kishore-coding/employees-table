import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Card } from "@material-ui/core";

const Table = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const columns = [
    {
      title: "Name",
      field: "name",
      align: "center",
    },
    {
      title: "Email",
      field: "email",
      align: "center",
    },
    {
      title: "Role",
      field: "role",
      align: "center",
    },
  ];

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleBulkDelete = () => {
    const updatedData = data.filter((row) => !selectedRow.includes(row));
    setData(updatedData);
  };

  return (
    <div>
      <Card style={{ margin: "2rem" }}>
        <MaterialTable
          title="Employees Data"
          columns={columns}
          data={data}
          onSelectionChange={(rows) => setSelectedRow(rows)}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [...data, newRow];
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const indexNo = selectedRow.tableData.id;
                const updatedRows = [...data];
                updatedRows.splice(indexNo, 1);
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const indexNo = oldRow.tableData.id;
                const updatedRows = [...data];
                updatedRows[indexNo] = updatedRow;
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            selection: true,
            headerStyle: {
              fontWeight: "bold",
              fontSize: "17px",
            },
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete all selected rows",
              onClick: () => handleBulkDelete(),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Table;

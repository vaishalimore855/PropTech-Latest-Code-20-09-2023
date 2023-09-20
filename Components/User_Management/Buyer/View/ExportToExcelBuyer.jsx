import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ExcelJS from "exceljs";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBuyerList } from "../../../../Redux/Slice/BuyerSlice";
import { Button } from "@mui/material";
function ExportToExcelBuyer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const BuyerList = useSelector((state) => state.buyer.Buyers);
  console.log("BuyerList", BuyerList);

  useEffect(() => {
    dispatch(getBuyerList);
  }, [dispatch]);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = [
      "Id",
      "First Name",
      "Last Name",
      "Email Id",
      "Password",
      "Phone Number",
      "Role",
      "User Role",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    BuyerList.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.firstname,
        row.lastname,
        row.email,
        row.password,
        row.phonenumber,
        row.role,
        row.userrole,
      ]); // Fixed field names
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
     
      <Button
        onClick={exportToExcel}
        enabled={!BuyerList.length}
        variant="contained"
        style={{ backgroundColor: "#3A833A", marginRight: "10px" }}
      >
        Export to Excel
      </Button>
    </div>
  );
}

export default ExportToExcelBuyer;

import React, { useState, useRef } from "react";

export default function MainBody() {
  // State to keep track of the number of rows and their values
  const [rows, setRows] = useState([{ id: 1, values: Array(6).fill(0) }]);

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, values: Array(6).fill(0) }]);
  };

  // Function to handle input change
  const handleInputChange = (rowId, axisIndex, value) => {
    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          let updatedValues = [...row.values];
          updatedValues[axisIndex] = value;
          return { ...row, values: updatedValues };
        }
        return row;
      })
    );
  };

  // Function to render a row
  const renderRow = (row) => (
    <div
      key={row.id}
      className="w-full h-14 rounded-3xl bg-white mt-5 flex justify-evenly items-center"
    >
      {row.values.map((value, index) => (
        <span key={index} className="space-x-2">
          <span className="text-black">Achse {index + 1}</span>
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(row.id, index, e.target.value)}
            className="w-8 bg-gray-400 h-8 rounded-sm"
          />
        </span>
      ))}
    </div>
  );

  // Function to generate XML code
  const generateXML = () => {
    let xml = '<?xml version="1.0" encoding="utf-8"?>\n<Program>\n';
    xml +=
      '    <Header RobotName="igus REBEL-6DOF" RobotType="REBEL-6DOF-01" GripperType="" Software="iRC V902-13-040" VelocitySetting="0" />\n';
    rows.forEach((row) => {
      xml +=
        '    <Joint AbortCondition="false" Nr="1" Source="Numerical" velPercent="50" acc="40" smooth="20"';
      row.values.forEach((value, index) => {
        xml += ` a${index + 1}="${value}"`;
      });
      xml += ' e1="0" e2="0" e3="0" Descr="" />\n';
    });
    xml += "</Program>";
    return xml;
  };

  // Ref for the text area to copy from
  const textAreaRef = useRef(null);

  // Function to copy the XML code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textAreaRef.current.innerText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => alert("Failed to copy!"));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-10/12">
        {rows.map((row) => renderRow(row))}
        <button
          onClick={addRow}
          className="bg-blue-500 text-white p-2 mt-5 rounded"
        >
          +
        </button>
        <div className="bg-black text-white p-3 rounded mt-5 overflow-auto">
          <pre ref={textAreaRef}>{generateXML()}</pre>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-green-500 text-white p-2 mt-2 rounded"
        >
          Copy Code
        </button>
      </div>
    </div>
  );
}

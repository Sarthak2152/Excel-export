import { useContext } from "react";
import { DataContext } from "../Contexts/DataProvider";
import { toast } from "react-hot-toast";
import ExcelJS from "exceljs";
import * as XLSX from "xlsx/xlsx.mjs";
const tableData = [
  "First Name",
  "Last Name",
  "Age",
  "Phone Number",
  "Email Address",
  "Street Address",
  "City",
  "State",
  "Postal Code",
];

function Table() {
  const { data, setData } = useContext(DataContext);

  // Function to handle clear user submitted data
  function handleClearData() {
    setData([]);
    localStorage.removeItem("data");
    toast.success("Data cleared");
  }

  // Function to handle export user submitted data
  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // adding width to columns
    worksheet["!cols"] = tableData.map((column) => {
      let maxWidth = column.length;
      data.forEach((element) => {
        if (element[column].length > maxWidth) {
          maxWidth = element[column].length;
        }
      });
      return { wch: maxWidth + 2 };
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "MySheet1");
    XLSX.writeFile(workbook, "UserData.xlsx");
  };

  const giveMaxWidth = (column) => {
    let maxWidth = column.length;
    data.forEach((element) => {
      if (element[column].length > maxWidth) {
        maxWidth = element[column].length;
      }
    });
    return maxWidth;
  };
  const handleExportSecond = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("MySheet1");

    // add header columns
    worksheet.columns = tableData.map((col) => {
      return { header: col, key: col, width: giveMaxWidth(col) + 2 };
    });

    // add data to file
    data.forEach((element) => {
      worksheet.addRow(element);
    });
    // adding styles
    worksheet.getRow(1).height = 40;
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCCCCC" }, // Grey background color
      };
      cell.alignment = { vertical: "center" }; // Center text
    });
    worksheet.getRow(1).alignment = { vertical: "middle" };

    // Heading
    const rowValues = [
      {
        richText: [
          { text: "Assignment : ", font: { bold: true, size: 25 } },
          {
            text: "This is demo excel file",
            font: { bold: true, size: 25 },
          },
        ],
      },
    ];
    worksheet.insertRow(1, rowValues);
    worksheet.getRow(1).height = 90;
    worksheet.mergeCells("A1:I1");
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFDDDD" },
      };
      cell.alignment = { vertical: "center", wrapText: true };
    });
    worksheet.getCell("A1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    // Generate Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create Blob object and trigger download
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "userData.xlsx";
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="mx-auto mt-10 min-h-[20vh] w-full rounded-lg border-slate-700 p-3 sm:w-10/12 sm:px-8  sm:py-8 lg:border ">
      <h1 className="mb-8 text-3xl text-slate-100">User submitted data</h1>
      {!data.length && (
        <p className="text-lg text-slate-400">User details will appear here</p>
      )}
      {data.length != 0 && (
        <div className=" w-full overflow-x-auto">
          <table className="w-full border-collapse text-nowrap text-white">
            <thead className="text-left">
              <tr>
                {tableData.map((column) => {
                  return (
                    <th className="border-b px-4 py-3" key={column}>
                      {column}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-left">
              {data.map((user, index) => {
                return (
                  <tr
                    className={index % 2 !== 0 ? "bg-slate-700" : ""}
                    key={user["First Name"]}
                  >
                    {tableData.map((column) => {
                      return (
                        <td className="px-4 py-3" key={user[column]}>
                          {user[column]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {data.length != 0 && (
        <div className="mt-10 flex flex-col items-start gap-4  sm:flex-row">
          <button
            onClick={handleExportSecond}
            className=" rounded-md border px-3 py-1 text-left text-lg text-slate-50 transition-all duration-[300] hover:scale-105"
          >
            Export data to Excel
          </button>
          <button
            onClick={handleClearData}
            className="rounded-md border px-3 py-1 text-left text-lg text-slate-50 transition-all duration-[300] hover:scale-105"
          >
            Clear data
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;

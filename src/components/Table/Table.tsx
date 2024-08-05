import React, { useState } from "react";
import { ITableProps } from "../../types";
import { Button, Image, Loading, Select, Text } from "../index";
import "./Table.css";

const Table: React.FC<ITableProps> = ({
  data,
  columns,
  loading,
  setSelectedRow = () => {},
  actions,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuVisibleRowId, setMenuVisibleRowId] = useState<string | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const toggleMenu = (rowId: string) => {
    setMenuVisibleRowId(menuVisibleRowId === rowId ? null : rowId);
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className='container-table'>
          <table>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.name + index + "header"}
                    onClick={() => requestSort(column.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {column.label}
                    {sortConfig && sortConfig.key === column.name
                      ? sortConfig.direction === "ascending"
                        ? " ↑"
                        : " ↓"
                      : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr
                  key={row.id + index + "body"}
                  onClick={() => setSelectedRow(row)}
                >
                  {columns.map((column) => (
                    <td key={column.name}>
                      {column.name === "logo" ? (
                        <Image src={row[column.name]} alt={row.name} />
                      ) : (
                        <Text
                          wrap={"normal"}
                          text={
                            <>
                              <span>{column.label}: </span>
                              {row[column.name]}
                            </>
                          }
                        />
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td>
                      <div className='menu-container'>
                        <button
                          onClick={() => toggleMenu(row.id)}
                          className='menu-button'
                        >
                          <span className='menu-text'>Acciones</span>
                          <span className='menu-icon'>&#8942;</span>
                        </button>
                        {menuVisibleRowId === row.id && (
                          <div className='menu-dropdown'>
                            {actions.map((action, index) => (
                              <button
                                key={index}
                                className='menu-item'
                                onClick={() => {
                                  action.do(row);
                                  setMenuVisibleRowId(null);
                                }}
                              >
                                {action.action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className='container-button'>
            {sortedData.length} Resultados
            <div className='center-button'>
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
            <Select
              options={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "20", label: "20" },
              ]}
              onChange={(value) => handleItemsPerPageChange(value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Table;

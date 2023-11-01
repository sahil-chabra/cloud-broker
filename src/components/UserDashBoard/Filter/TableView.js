import React, { useState, useEffect } from "react";
import classes from "./TableStyles.module.css";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
// import {CircularProgress } from '@material-ui/core';
//import CircularProgress from "material-ui/CircularProgress"
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
//import { fetchData } from '../../../api/index';
// import { Link } from "react-router-dom";
import data from "./ProvideData";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        className="mt-3 mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={"Type any requirement here..."}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search by name here`}
      style={{
        padding: ".2rem .4rem",

        border: "0px",
        borderRadius: "4px",
        color: "#3c3c3c",
        textDecoration: "none",
        outline: "none",
        textAlign: "center",
        marginRight: ".4rem",
      }}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      style={{
        padding: ".2rem .4rem",
        width: "7.5rem",
        border: "0px",
        borderRadius: "4px",
        color: "#3c3c3c",
        textDecoration: "none",
        outline: "none",
        textAlign: "center",
        marginRight: ".4rem",
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option
          key={i}
          value={option}
          style={{
            fontSize: "1.2rem",
            fontWeight: "500",
          }}
        >
          <div>{option}</div>
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
        style={{
          height: "8px",
          background: "radial-gradient(circle at center, #fff, #fafafa)",
          borderRadius: "4px",
        }}
      />
      <button onClick={() => setFilter(0)}>Off</button>
    </>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min`}
        style={{
          padding: ".2rem .4rem",
          width: "7.5rem",
          border: "0px",
          borderRadius: "4px",
          color: "#3c3c3c",
          textDecoration: "none",
          outline: "none",
          textAlign: "center",
          marginRight: ".4rem",
        }}
      />
      To
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max`}
        style={{
          padding: ".2rem .4rem",
          width: "7.5rem",
          border: "0px",
          borderRadius: "4px",
          color: "#3c3c3c",
          textDecoration: "none",
          outline: "none",
          textAlign: "center",
          marginLeft: ".3rem",
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 25);

  return (
    <div className={classes.tableContainer}>
      <div className={classes.tableH}>
        <table className={classes.table} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="" {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {/* Render the columns filter UI */}
                    <div style={{ marginTop: "1rem" }}>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th colSpan={visibleColumns.length}>
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <div>
          Showing the first {rows.length} results of {rows.length} rows
        </div>
        {/*<div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div> */}
      </div>
    </div>
  );
}
// function NavLinkButton({
//   row,
//   }) {
//     /* console.log(row.original); */

//     return (
//         <Link to={`/resource/${row.original._id}`}>{row.original.name}</Link >
//     )
//   }
// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function TableView() {
  const [newData, setnewData] = useState([]);
  const getData = async () => {
    try {
      let val = data;
      console.log(val);

      setnewData(val);
    } catch (error) {
      console.log(error);
    }
  };
  /* console.log(newData); */

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Cost (int ₹)",
            accessor: "cost",
            Filter: NumberRangeColumnFilter,
            filter: "between",
          },
          {
            Header: "Security",
            accessor: "security_management",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "BandWidth (in Mbps)",
            accessor: "network_bandwidth",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
          },
          {
            Header: "Virtual Machines",
            accessor: "available_VM",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
          },
          {
            Header: "Response Time (in ms)",
            accessor: "response_time",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
          },
          {
            Header: "Flexibility",
            accessor: "flexibility",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    getData();
  }, []);

  return <Table columns={columns} data={newData} />;
}

export default TableView;

import React, { useMemo } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Columns from "./Columns";
import Data from "./data.json";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
function ProductListPage() {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => Data, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { globalFilter, pageIndex },
  } = tableInstance;
  return (
    <>
      <NavigationBar />
      <div className="">
        <div className="mt-36 px-52 overflow-x-auto md:px-3">
          <table {...getTableProps()} className="text-left min-w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="">
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="py-3 px-2 border text-base font-medium font-roboto text-blue"
                    >
                      <span className="flex items-center justify-between">
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaAngleDown />
                          ) : (
                            <FaAngleUp />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <>
                    <tr
                      {...row.getRowProps()}
                      className="hover:bg-white_gray hover:bg-opacity-10 cursor-pointer "
                    >
                      {row.cells.map((cell, index) => (
                        <td
                          {...cell.getCellProps}
                          key={index}
                          className="border py-1 text-sm px-2  font-extralight cursor-pointer"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>check</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 justify-center mt-4">
          <span className="mr-5">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <BiChevronsLeft size={24} />
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <BiChevronLeft size={24} />
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <BiChevronRight size={24} />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiChevronsRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductListPage;

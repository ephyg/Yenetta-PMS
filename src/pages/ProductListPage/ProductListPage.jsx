import React, { useMemo, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Columns from "./Columns";
import Button from "../../components/Button/Button";
import Data from "./data.json";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { FaAngleDown, FaAngleUp, FaEdit, FaTimes } from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import EditPopUp from "../EditPopUP/EditPopUp";
function ProductListPage() {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => Data, []);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
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
  const handleEditClick = (row) => {
    console.log(row.original.id);
    setEditPopUp(true)
  };
  const handleDeleteClick = (row) => {
    setDeletePopUp(true);
    console.log(row.original);
  };
  const handlePopUpDelete = () => {
    setDeletePopUp(false);
  };
  const handlePopUpCancel = () => {
    setDeletePopUp(false);
  };
  return (
    <>
      {deletePopUp && (
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div class="w-full max-w-lg bg-white shadow-lg rounded-md px-5 py-4 relative">
            <div class="mt-4 mb-3 flex justify-between ">
              <h4 class="text-base font-semibold md:text-sm">
                Are you sure you want to delete it?
              </h4>
              <FaTimes
                size={20}
                className="cursor-pointer"
                onClick={handlePopUpCancel}
              />
            </div>
            <div className="mb-10 md:mb-5">
              <p class="text-sm text-gray-400">
                This action will remove the selected data permanently. There's
                no turning back. Make sure you won't need it again.
              </p>
            </div>
            <div class="text-right flex justify-end space-x-4 md:flex md:flex-col md:justify-center md:space-x-0 md:space-y-2">
              <Button
                onClick={handlePopUpDelete}
                text="Delete"
                className="bg-red-500 text-white hover:bg-red-600 min-w-[150px]"
              />
              <Button
                onClick={handlePopUpCancel}
                text="Cancel"
                className="bg-zinc-200  text-black hover:bg-zinc-300 min-w-[150px]"
              />
            </div>
          </div>
        </div>
      )}
      {editPopUp && <EditPopUp Edit_Pop_Up={setEditPopUp} />}
      <NavigationBar />
      <div className="">
        <div className="mt-36 px-52 overflow-auto whitespace-nowrap md:px-3">
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
                  <th className="py-3 px-2 border text-base font-medium font-roboto text-blue w-16">
                    Edit
                  </th>
                  <th className="py-3 px-2 border text-base font-medium font-roboto text-blue w-16">
                    Delete
                  </th>
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
                      className="hover:bg-opacity-10 cursor-pointer "
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
                      <td
                        onClick={() => handleEditClick(row)}
                        className="border py-1 text-sm px-2  font-extralight cursor-pointer   hover:bg-white_gray hover:bg-opacity-25"
                      >
                        <FaEdit
                          size={18}
                          className="text-center w-full text-green-700"
                        />
                      </td>
                      <td
                        onClick={() => handleDeleteClick(row)}
                        className="border py-1 text-sm px-2  font-extralight cursor-pointer  hover:bg-white_gray hover:bg-opacity-25"
                      >
                        <RiDeleteBin6Fill
                          size={20}
                          className="text-center w-full text-red-600"
                        />
                      </td>
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

import React, { useMemo, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Columns from "./Columns";
import Button from "../../components/Button/Button";
import * as api from "../../api/ProductApi";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  FaAngleDown,
  FaAngleUp,
  FaEdit,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import EditPopUp from "../EditPopUP/EditPopUp";
import { useMutation, useQueryClient } from "react-query";
function ProductListPage({ ProductData }) {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => ProductData, [ProductData]);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [editPopUp, setEditPopUp] = useState(false);
  const [editableData, setEditableData] = useState();
  // const [isChecked, setIsChecked] = useState();
  const [checkPopUp, setCheckPopUp] = useState();
  const [checkedId, setCheckedId] = useState();
  const [checkData, setCheckData] = useState([]);
  const queryClient = useQueryClient();
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 13 },
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

  // DeleteProduct mutation
  const deleteProduct = async (id) => {
    const response = await api.DeleteProducts(id);
    return response;
  };
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["ProductList"]);
      setDeletePopUp(false);
    },
  });
  //Updating Availability
  const UpadateProduct = async (Data) => {
    const response = await api.UpdateProducts(Data, checkedId);
    // console.log(Data,Id)
    return response;
  };
  const UpdateProductMutation = useMutation(UpadateProduct, {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(["ProductList"]);
      console.log("successfully updated");
      setCheckPopUp(false);
    },
  });
  // Delete and Edit PopUp
  const handleEditClick = (row) => {
    setEditPopUp(true);
    setEditableData(row.original);
  };
  const handleDeleteClick = async (row) => {
    setDeletedId(row.original.id);
    setDeletePopUp(true);
  };
  const handlePopUpDelete = () => {
    deleteProductMutation.mutate(deletedId);
  };

  // Delete popup cancel button
  const handlePopUpCancel = () => {
    setDeletePopUp(false);
  };

  // CheckBox PopUp
  const handleCheckBoxClick = (row) => {
    setCheckedId(row.original.id);
    const data = {
      product_name: row.original.product_name,
      product_description: row.original.product_description,
      price: row.original.price,
      quantity: row.original.quantity,
      availability: !row.original.availability,
    };
    setCheckData(data);
    setCheckPopUp(true);
  };
  const handlePopUpCheckBox = async (isChecked) => {
    if (isChecked) {
      console.log(checkData, checkedId);

      UpdateProductMutation.mutate(checkData);
    } else {
      setCheckPopUp(false);
    }
  };
  return (
    <>
      {checkPopUp && (
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div class="w-full max-w-lg bg-white shadow-lg rounded-md px-5 py-4 relative">
            <div class="mt-4 mb-3 flex justify-between ">
              {!checkData.availability ? (
                <h4 class="text-base font-semibold md:text-sm">
                  Is the item currently out of stock?
                </h4>
              ) : (
                <h4 class="text-base font-semibold md:text-sm">
                  Is the item currently in stock?
                </h4>
              )}

              <FaTimes
                size={20}
                className="cursor-pointer"
                onClick={() => handlePopUpCheckBox(false)}
              />
            </div>
            <div className="mb-10 md:mb-5">
              {!checkData.availability ? (
                <p class="text-sm text-gray-400">
                  This action will set the product as unavailable. You can adjust
                  it as availability changes.
                </p>
              ) : (
                <p class="text-sm text-gray-400">
                  This action will set the product as available. You can
                  adjust it as availability changes.
                </p>
              )}
            </div>
            <div class="text-right flex justify-end space-x-4 md:flex md:flex-col md:justify-center md:space-x-0 md:space-y-2">
              {UpdateProductMutation.isLoading ? (
                <Button
                  className="bg-blue text-white hover:bg-blue_hover min-w-[150px]"
                  text="Changing "
                  disabled={true}
                  iconSize={18}
                  icon={FaSpinner}
                  animation="animate-spin"
                />
              ) : (
                <Button
                  onClick={() => handlePopUpCheckBox(true)}
                  text="Yes"
                  className="bg-blue text-white hover:bg-blue_hover min-w-[150px]"
                />
              )}
              <Button
                onClick={() => handlePopUpCheckBox(false)}
                text="Cancel"
                className="bg-zinc-200  text-black hover:bg-zinc-300 min-w-[150px]"
              />
            </div>
          </div>
        </div>
      )}
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
              {deleteProductMutation.isLoading ? (
                <Button
                  className="bg-red-500 text-white hover:bg-red-600 min-w-[150px]"
                  text="Deleting "
                  disabled={true}
                  iconSize={18}
                  icon={FaSpinner}
                  animation="animate-spin"
                />
              ) : (
                <Button
                  onClick={handlePopUpDelete}
                  text="Delete"
                  className="bg-red-500 text-white hover:bg-red-600 min-w-[150px]"
                />
              )}
              <Button
                onClick={handlePopUpCancel}
                text="Cancel"
                className="bg-zinc-200  text-black hover:bg-zinc-300 min-w-[150px]"
              />
            </div>
          </div>
        </div>
      )}
      {editPopUp && (
        <EditPopUp Edit_Pop_Up={setEditPopUp} editData={editableData} />
      )}
      <NavigationBar />
      <div className="">
        <div className="mt-36 px-52 overflow-auto whitespace-nowrap md:px-3 pb-2">
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
                  <th className="py-3 px-2 border text-base font-medium font-roboto text-blue w-10">
                    Availability
                  </th>
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
                          className="border py-1 text-sm px-2  font-normal cursor-pointer"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                      <td
                        onClick={() => handleCheckBoxClick(row)}
                        className="border py-1 items-center justify-center text-sm px-2  font-extralight cursor-pointer  hover:bg-white_gray hover:bg-opacity-25"
                      >
                        <div
                          className="flex w-full justify-center items-center"
                        >
                          <input
                            type="checkbox"
                            checked={ProductData[index].availability}
                            className="text-center cursor-pointer"
                            onChange={() => handleCheckBoxClick(row)}
                          />
                        </div>
                      </td>

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

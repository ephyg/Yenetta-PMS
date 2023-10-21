import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1, // Incremental number starting from 1
    disableSortBy: true, // Disable sorting for this column
  },
  {
    Header: "Product Name",
    accessor: "product_name",
  },
  {
    Header: "Product Description",
    accessor: "product_description",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
];
export default Columns;

import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
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
  {
    Header: "Edit",
    accessor: BiChevronLeft,
  },
  { Header: "Delete", accessor: BiChevronLeft },
];
export default Columns;

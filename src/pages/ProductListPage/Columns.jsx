
const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1,
    disableSortBy: true,
    width: 20, 
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

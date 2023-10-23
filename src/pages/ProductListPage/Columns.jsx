const Columns = [
  {
    Header: "No.",
    accessor: (row, index) => index + 1,
    disableSortBy: true,
  },
  {
    Header: "Product Name",
    accessor: "product_name",
  },
  {
    Header: "Product Description",
    accessor: "product_description",
    // width: 400,
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

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as productService from "~/admin/services/productService";
import * as categoryService from "~/admin/services/categoryService";
import styles from "./ListProduct.module.scss";
import { confirm } from "react-confirm-box";
import { Image } from "cloudinary-react";
import { TablePagination } from "@mui/material";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import Swal from "sweetalert2";
const ListProduct = () => {
  const [list, setList] = useState([]);
  const [category_id, setCategory_id] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: "0",
    pageSize: "12",
  });
  const [totalTask, setTotalTask] = useState();
  const handleChangePage = (e, newPage) => {
    setPagination({ ...pagination, currentPage: newPage.toString() });
  };
  const handleChangeRowsPerPage = (e) => {
    setPagination({
      pageSize: parseInt(e.target.value, 12).toString(),
      currentPage: "1",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      const response = await productService.searchProduct(valueSearch);
      setList(response.products);
    };
    fetchApi();
  };
  const cx = classNames.bind(styles);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getListProduct(
        Number(pagination.currentPage) + 1
      );
      setList(response.products);
      setTotalTask(response.totalItem);
    };
    fetchApi();
  }, [pagination.currentPage]);
//   useEffect(() => {
//     const fetchApi = async () => {
//       const response = await categoryService.getCategory();
//       setCategory_id(response.categories);
//     };
//     fetchApi();
//   }, []);
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: `<strong>B???n c?? ch???c ch???n mu???n x??a s???n ph???m ${name} kh??ng? ????????</strong>`,
      icon: "info",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Delete',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
    if (result.isConfirmed === true) {
      const fetchApi = async () => {
        const res = await productService.removeProduct(id);

        if (res.data.success === true) {
          await Swal.fire(`B???n ???? x??a s???n ph???m ${name} th??nh c??ng????`);
            const fetchApi = async () => {
                const response = await productService.getListProduct(
                  Number(pagination.currentPage) + 1
                );
                setList(response.products);
                setTotalTask(response.totalItem);
              };
              fetchApi();
        }
    };
    fetchApi();
    }
  };

  const userColumns = [
    {
      field: "_id",
      hide: true,
    },
    {
      field: "name",
      headerName: "T??n s???n ph???m",
      type: "text",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellWithImg")} style={{ margin: "0 auto" }}>
            <Image
              className={cx("cellImg")}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={params.row.images[0]}
            />
            <span className={cx("cellname")}> {params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Ph??n lo???i",
      type: "text",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return <div>{params.row.category?.name}</div>;
      },
    },
    {
      field: "active",
      headerName: "Tr???ng th??i",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx(`active`)}>
            <div className={cx(`${params.row.active}`)}>
              {params.row.active === true ? "??ang ho???t ?????ng" : "T???m d???ng"}
            </div>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Gi?? g???c",
      type: "text",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      field: "price_sale",
      type: "text",
      headerName: "Gi?? Sale",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.price_sale?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      field: "num",
      headerName: "S??? l?????ng trong kho",
      type: "text",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    // {
    //   field: "num_buy",
    //   headerName: "S??? l?????ng ???? b??n",
    //   type: "text",
    //   width: 150,
    //   headerClassName: "super-app-theme--header",
    //   headerAlign: "center",
    // },

    {
      field: "createdAt",
      headerName: "Ng??y t???o",
      type: "date",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div style={{ margin: "0 auto" }}>
            {moment(params.row.createdAt).format("DD/MM/YYYY HH:mm")}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Ng??y ch???nh s???a",
      type: "date",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      textAlight: "center",
      renderCell: (params) => {
        return (
          <div style={{ margin: "0 auto" }}>
            {moment(params.row.updatedAt).format("DD/MM/YYYY HH:mm")}
          </div>
        );
      },
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellAction")}>
            <NavLink
              to={`${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={cx("viewButton")}>View</div>
            </NavLink>
            {/* <div
              className={cx("deleteButton")}
              onClick={() => handleDelete(params.row._id, params.row.name)}
            >
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Navbar
        disabled={false}
        setValueSearch={setValueSearch}
        valueSearch={valueSearch}
        handleSubmit={handleSubmit}
      />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
          <div className={cx("list")}>
            <div className={cx("listContainer")}>
              <div className={cx("datatable")}>
                <div className={cx("datatableTitle")}>
                  Danh s??ch s???n ph???m
                  <NavLink to="newproduct" className={cx("link")}>
                    Th??m m???i
                  </NavLink>
                </div>
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    "& .super-app-theme--header": {
                      fontFamily: "Nunito",
                      fontSize: "16px",
                      backgroundColor: "#89CFFD",
                    },
                  }}
                >
                  <DataGrid
                    getRowId={(row) => row._id}
                    className={cx("datagrid")}
                    rows={list}
                    columns={userColumns.concat(actionColumn)}
                    priceSize={9}
                    rowsPerPageOptions={[9]}
                    hideFooterPagination="true"
                  />
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { value: totalTask || 5, label: "T???t c???" },
                    ]}
                    labelRowsPerPage="S??? d??ng hi???n th???"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} tr??n t???ng s??? ${count}`
                    }
                    component="div"
                    count={totalTask}
                    rowsPerPage={Number(pagination.pageSize) ?? 12}
                    page={Number(pagination.currentPage)}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;

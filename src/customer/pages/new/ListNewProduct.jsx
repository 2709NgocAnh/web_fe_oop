import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import * as productService from "~/admin/services/productService";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Pagination from "~/customer/components/pagination/Pagination";
import Header from "~/customer/Layout/components/header/Header";
import Slider from "~/customer/Layout/components/slider/Slider";
import NoProduct from "../shop/component/noproduct/NoProduct";
import Products from "../shop/component/products/Products";
import styles from "./ListNewProduct.module.scss";

export default function ListNewProduct() {
  TabTitle("New");
  const cx = classNames.bind(styles);
  const [totalPage, setTotalPage] = useState();
  const [productList, setProductList] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  
  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getListNewProduct(numberPage);
      setProductList(response.products);
      setTotalPage(response.totalPage);
    };
    fetchApi();
  }, [numberPage]);
  
  return (
    <>
      <div className={cx("header")}>
        <Header />
        <Slider title="New" />
      </div>
      <div>
        <section className={cx("product")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              {productList?.length === 0 ? (
                <NoProduct />
              ) : (
                <Products productList={productList} />
              )}
            </div>
            <Pagination totalPage={totalPage} setNumberPage={setNumberPage} />

          </div>
        </section>
      </div>
    </>
  );
}

import { GetServerSideProps, NextPage } from "next";
import styles from "../../styles/Product.module.css";
import { ApiResponseFormat, Product } from "@/definitions/product";
import { useState } from "react";
import UpdateProductForm from "@/components/UpdateProductForm";

const ProductPage: NextPage<{ product: Product; message: string }> = ({
  product,
  message,
}) => {
  const [updateRequestResult, setUpdateRequestResult] =
    useState<ApiResponseFormat | null>(null);

  const onSubmit = async (updatedProduct: Product) => {
    // If trade_item_descriptor field exist we should assign its value to trade_item_unit_descriptor
    const FormattedUpdatedProduct ={
      ...updatedProduct,
      trade_item_unit_descriptor:updatedProduct.trade_item_descriptor ? updatedProduct.trade_item_descriptor :updatedProduct.trade_item_unit_descriptor
    }
    //Api call to /api/products to update a single product
    fetch(`/api/products/${updatedProduct.id}`, {
      body: JSON.stringify(FormattedUpdatedProduct),
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (result) => {
      const serverResponse = await result.json();
      setUpdateRequestResult(serverResponse);
    });
  };
  
  //Display a message when no product found
  if (!product?.id) return <h1>{message}</h1>;
  return (
    <div className={styles.container}>
      <h1>Product</h1>
      <UpdateProductForm product={product} onSubmit={onSubmit} />
      {updateRequestResult?.message && <div>{updateRequestResult.message}</div>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //getProduct from api/products/[id] can be called directly to fetch from external api
  const res = await fetch(
    `http://localhost:3000/api/products/${context.query.id}`
  );
  const { response, message } = await res.json();
  return {
    props: {
      product: response,
      message,
    },
  };
};

export default ProductPage;

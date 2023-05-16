import {
  ApiResponseFormat,
  Product,
  ServerResponseMessages,
} from "@/definitions/product";
import type { NextApiRequest, NextApiResponse } from "next";
export const getProduct = async (id: string) => {
  const res = await fetch(`http://localhost:3001/products?id=${id}`);
  const products: Product[] = await res.json();
  //format the returned product and returns empty object + unavailable message if no product was found
  return products[0]
    ? { message: ServerResponseMessages.SUCCESS, response: products[0] }
    : { message: ServerResponseMessages.PRODUCT_UNAVAILABLE, response: {} };
};

export const updateProduct = async (productToUpdate: Product) => {
  const res = await fetch(
    `http://localhost:3001/products/${productToUpdate.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToUpdate),
    }
  )
    .then(async (res) => res.json())
    .catch((error) => {
      error;
    });
  const UpdatedProduct = await res;

  //format the request response if successful
  return UpdatedProduct
    ? {
        message: ServerResponseMessages.UPDATE_SUCCESS,
        response: UpdatedProduct,
      }
    : {
        message: ServerResponseMessages.PRODUCT_UNAVAILABLE,
        response: {},
      };
};

//Handler is used for calling external api and formatting the result
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseFormat>
) {
  const { method, query, body } = req;
  switch (method) {
    // Retrieves a product by its id, GET Method
    case "GET":
      try {
        const getResponse = await getProduct(query?.id as string);
        res.statusCode = 200;
        res.json(getResponse);
      } catch (e) {
        res.statusCode = 500;
        //returns empty object + unavailable message if no product was found
        res.json({
          message: ServerResponseMessages.PRODUCT_UNAVAILABLE,
          response: {},
        });
      }
      break;

    // Updates a product by its id, PUT Method
    case "PUT":
      try {
        const putResponse = await updateProduct(body);
        res.statusCode = 200;
        res.json(putResponse);
      } catch (e) {
        res.statusCode = 500;
        // indicative message in case of failure
        res.json({
          message: ServerResponseMessages.SERVER_UNREACHABLE,
          response: {},
        });
      }
      break;

    //TODO: Add the POST request to add product

    // Returns 405 error if method not covered
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

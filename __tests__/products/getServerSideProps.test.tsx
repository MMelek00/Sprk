import { ServerResponseMessages } from "@/definitions/product";
import { Mock_Product } from "../../__mock__/mock_product";
import { getServerSideProps } from "@/pages/products/[id]";
import fetch from "jest-fetch-mock";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

describe("getServerSideProps for Product", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should handle errors", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        message: ServerResponseMessages.PRODUCT_UNAVAILABLE,
        response: {},
      })
    );
    const context = {
      query: { id: "fjdks" } as ParsedUrlQuery,
    };
    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    );
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          message: ServerResponseMessages.PRODUCT_UNAVAILABLE,
          product: {},
        },
      })
    );
  });

  it("should call product GET api successfully", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        message: ServerResponseMessages.SUCCESS,
        response: Mock_Product,
      })
    );
    const context = {
      query: { id: "4311527127771" } as ParsedUrlQuery,
    };
    const response = await getServerSideProps(
      context as GetServerSidePropsContext
    );
    expect(response).toEqual({
        props: {
          message: ServerResponseMessages.SUCCESS,
          product: Mock_Product,
        },
      })
  });
});

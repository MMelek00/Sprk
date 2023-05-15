import { Mock_Product } from "../../__mock__/mock_product";
import { Product, ServerResponseMessages } from "@/definitions/product";
import ProductPage from "@/pages/products/[id]";
import { render, screen } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
import { JSX } from "react";
import UpdateProductForm from "@/components/UpdateProductForm";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("Product", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("handles initial errors", async () => {
    render(
      <ProductPage
        product={{} as Product}
        message={ServerResponseMessages.PRODUCT_UNAVAILABLE}
      />
    );

    expect(
      screen.getByText(ServerResponseMessages.PRODUCT_UNAVAILABLE)
    ).toBeInTheDocument();
  });
  it("renders and fetches product data", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        message: ServerResponseMessages.SUCCESS,
        response: Mock_Product,
      })
    );

    render(
      <ProductPage
        product={Mock_Product as Product}
        message={ServerResponseMessages.SUCCESS}
      />
    );
    expect(
      screen.queryByText(ServerResponseMessages.PRODUCT_UNAVAILABLE)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product" })
    ).toBeInTheDocument();
  });
  it("renders and display all the basic fields", async () => {
    render(
      <ProductPage
        product={Mock_Product as Product}
        message={ServerResponseMessages.SUCCESS}
      />
    );
    expect(
      screen.getByRole("heading", { name: "Product" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /code/i })).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /Amount/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /brand/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Update product/i })
    ).toBeInTheDocument();
  });
  it("should update fields and submit correct form data", async () => {
    const mockSave = jest.fn();
    const { user } = setup(
      <UpdateProductForm
        product={Mock_Product as Product}
        onSubmit={mockSave}
      />
    );

    // Enter product description
    await user.type(
      screen.getByRole("textbox", { name: /description/i }),
      "good product"
    );
    // Enter product Amount
    await user.type(screen.getByRole("spinbutton", { name: /Amount/i }), "50");
    // Specify the brand
    await user.type(
      screen.getByRole("textbox", { name: /brand/i }),
      "Any brand"
    );
    // update an product
    await user.click(screen.getByRole("button", { name: /Update product/i }));
    expect(mockSave).toBeCalledTimes(1);

    //TODO: this test should fixed
    /*expect(mockSave).toBeCalledWith(
      expect.objectContaining({
        brand: "Any brand",
        description: "good product",
        amount_multiplier: '4250',
      }),
    );*/
  });
});

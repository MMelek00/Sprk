import { Product } from "@/definitions/product";
import { useForm } from "react-hook-form";
import { Field } from "@/components/Field";
import { JSXElementConstructor } from "react";

//TODO: Refactor the input field for reusability and Add further validation
//TODO: Add the missing fields of the form
interface FormProps{
    product: Product;
     onSubmit: (updatedProduct: Product)=>void 
}
const UpdateProductForm: JSXElementConstructor<FormProps> = ({product,onSubmit}) => {
  const formOptions = { defaultValues: { ...product } };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>(formOptions);
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field htmlFor="code" label="code" error={errors.code}>
          <input disabled placeholder="code" {...register("code")} id="code"/>
        </Field>

        <Field htmlFor="amount_multiplier" label="Amount" error={errors.amount_multiplier}>
          <input
            type="number"
            placeholder="Amount"
            id="amount_multiplier"
            {...register("amount_multiplier",{
              min: {
                value: 1,
                message: "Amount can't be zero",
              },
            })}
          />
        </Field>
        <Field htmlFor="brand" label="Brand" error={errors.brand}>
          <input type="text" placeholder="brand" {...register("brand")} id="brand" />
        </Field>
          <Field htmlFor="description" label="Description" error={errors.description}>
            <textarea
              {...register("description", {
                maxLength: {
                  value: 100,
                  message: "Description cannot be longer than 100 characters",
                },
              })}
              id="description"
              rows={4}
            />
          </Field>
        {product.requires_best_before_date && (
          <Field htmlFor="best_before_date" label="Best before date" error={errors.best_before_date}>
            <input
              type="date"
              placeholder="Best before date"
              {...register("best_before_date",{
                required: product.requires_best_before_date ? "Required":false,
                pattern: {
                  value: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i,
                  message: "invalid date"
                }
              })}
            />
          </Field>
        )}

        <button type="submit">Update product</button>
      </form>
  );
};


export default UpdateProductForm;

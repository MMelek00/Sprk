import React from "react";
import type {PropsWithChildren} from 'react';

import styles from "../styles/Field.module.css";
import { FieldError } from "react-hook-form";
type FieldProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
  error: FieldError | undefined;
}>;
export const Field = ({ label, children, htmlFor, error }: FieldProps) => {
  const id = htmlFor || getChildId(children);
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div className={styles.errorLabel} role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children: any) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};

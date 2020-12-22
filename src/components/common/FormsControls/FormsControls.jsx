import React from "react";
import styles from "./FormsControls.module.css";

// Скрыть кнопку когда строка пустая
export const RemoveButtonWhenEmptyLine = (className, textButton) => {
  return ({ input, meta, ...props }) => {
    return (
      <div className={styles.formControl}>
        <textarea {...input} {...props} />
        {meta.error ? <></> : <button className={className}>{textButton}</button>}
      </div>
    );
  };
};

export const Element = (Element) => {
  return ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
      <div className={styles.formControl + " " + (hasError ? styles.error : +" ")}>
        <Element {...input} {...props} />
        {hasError && <span>{meta.error}</span>}
      </div>
    );
  };
};

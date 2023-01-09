import * as React from "react";
import styles from "../sass/components/button.module.css";

interface props {
  children: any;
  onClick?: () => void;
}

export const Button: React.FC<props> = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

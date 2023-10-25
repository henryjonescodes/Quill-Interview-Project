import React from "react";
import classNames from "classnames";
import * as style from "./style.module.scss";
interface Props {
  children: React.ReactNode;
}
const DefaultButton = (props: Props) => {
  const { children } = props;
  return <button className={classNames(style.button)}>{children}</button>;
};

export { DefaultButton };

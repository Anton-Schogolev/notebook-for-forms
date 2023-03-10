import React, { PropsWithChildren, useState } from "react";
import s from "components/Input/InputCopy.module.css";

export const FloatLabel = (props: PropsWithChildren<{ label?: string, value: string }>) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value } = props;

  const labelClass = s.label +
    (focus || (value && value.length !== 0) ? " " + s["label-float"] : "");

  return (
    <div
      className={s['float-label__container']}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};
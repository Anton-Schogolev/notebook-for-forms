import { Button, Input } from "antd";
import s from "./InputCopy.module.css";
import { CopyOutlined } from "@ant-design/icons";
import React, { ChangeEvent, memo, useEffect, useState } from "react";

type PropsType = {
  value: string
  onChange: (value: string) => void
};

const InputCopyRaw = ({ value, onChange }: PropsType) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    setState(value)
  }, [value])

  let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value)
  };
  let onBlur = () => {
    onChange(state);
  }
  let onCopy = () => {
    navigator.clipboard.writeText(state)
  };

  return (
    <Input.Group compact className={s["input-copy__container"]}>
      <Input
        value={state}
        onChange={onChangeHandler}
        onBlur={onBlur}
      />
      <Button icon={<CopyOutlined/>} onClick={onCopy}/>
    </Input.Group>
  );
};

export const InputCopy = memo(InputCopyRaw)
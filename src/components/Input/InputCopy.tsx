import { Button, Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { FloatLabel } from "components/Input/FloatLabel";

type PropsType = {
  value: string
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
};

const InputCopyRaw = ({ value, onChange, label, disabled }: PropsType) => {
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
    <FloatLabel label={label} value={state}>
      <Input
        size={"large"}
        value={state}
        onChange={onChangeHandler}
        onBlur={onBlur}
        disabled={disabled}
        addonAfter={<Button
          type={"text"}
          icon={<CopyOutlined/>}
          onClick={onCopy}
        />}
      />
    </FloatLabel>
  );
};

export const InputCopy = memo(InputCopyRaw)

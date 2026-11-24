import { Button, Input } from "antd";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import s from "components/Input/InputCopy.module.css";
import { DeleteOutlined } from "@ant-design/icons";

type PropsType = {
  value: string
  onChange: (value: string) => void
  onDelete: () => void
};

const LabelInputRaw = ({ value, onChange, onDelete }: PropsType) => {
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

  return (
      <Input
        className={s.label_input}
        size={"small"}
        value={state}
        onChange={onChangeHandler}
        onBlur={onBlur}
        addonAfter={<Button
          size={"small"}
          type={"text"}
          icon={<DeleteOutlined/>}
          onClick={onDelete}
          />}
      />
  );
};

export const LabelInput = memo(LabelInputRaw)

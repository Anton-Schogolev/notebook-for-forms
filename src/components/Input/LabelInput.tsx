import { Button, Input, Space } from "antd"
import React, { ChangeEvent, memo, useEffect, useState } from "react"
import s from "components/Input/InputCopy.module.css"
import { DeleteOutlined } from "@ant-design/icons"

type PropsType = {
  value: string
  onChange: (value: string) => void
  onDelete: () => void
}

const LabelInputRaw = ({ value, onChange, onDelete }: PropsType) => {
  const [state, setState] = useState(value)

  useEffect(() => {
    setState(value)
  }, [value])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value)
  }
  const onBlur = () => {
    onChange(state)
  }

  return (
    <Space.Compact block size="small" className={s.label_input}>
      <Input value={state} onChange={onChangeHandler} onBlur={onBlur} />
      <Button icon={<DeleteOutlined />} onClick={onDelete} />
    </Space.Compact>
  )
}

export const LabelInput = memo(LabelInputRaw)

import { Button, Input, Space } from "antd"
import { CopyOutlined } from "@ant-design/icons"
import React, { ChangeEvent, memo, useEffect, useState } from "react"
import { FloatLabel } from "components/Input/FloatLabel"

type PropsType = {
  value: string
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
}

const InputCopyRaw = ({ value, onChange, label, disabled }: PropsType) => {
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
  const onCopy = () => {
    navigator.clipboard.writeText(state)
  }

  return (
    <FloatLabel label={label} value={state}>
      <Space.Compact block size="large">
        <Input
          value={state}
          onChange={onChangeHandler}
          onBlur={onBlur}
          disabled={disabled}
        />
        <Button disabled={disabled} icon={<CopyOutlined />} onClick={onCopy} />
      </Space.Compact>
    </FloatLabel>
  )
}

export const InputCopy = memo(InputCopyRaw)

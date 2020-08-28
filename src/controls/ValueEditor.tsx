import React from 'react'
import { ValueEditorProps } from '../context/ConfigContext'

const ValueEditor: React.FC<ValueEditorProps> = ({
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  values,
  label,
  disabled
}) => {
  switch (type) {
    case 'select':
      return (
        <>
          <label htmlFor={title}>{label}</label>
          <select
            id={title}
            className={className}
            onChange={e => handleOnChange(e.target.value)}
            value={value}
            disabled={disabled}
          >
            {values!.map(v => {
              return (
                <option key={`${title}-${v.value}`} value={v.value}>
                  {v.label}
                </option>
              )
            })}
          </select>
        </>
      )

    default:
      return (
        <>
          <label htmlFor={title}>{label}</label>
          <input
            id={title}
            type={inputType || 'text'}
            value={value}
            className={className}
            onChange={e => handleOnChange(e.target.value)}
          />
        </>
      )
  }
}

ValueEditor.displayName = 'ValueEditor'

export default ValueEditor

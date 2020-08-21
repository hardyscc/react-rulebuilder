import React from 'react'
import { SelectElementProps } from '../context/ConfigContext'

const SelectElement: React.FC<SelectElementProps> = ({
  className,
  handleOnChange,
  options,
  title,
  label,
  value
}) => (
  <>
    <label htmlFor={title}>{label}</label>
    <select
      id={title}
      className={className}
      value={value}
      onChange={e => handleOnChange(e.target.value)}
    >
      {options.map(option => {
        const key = `${title}-${option.value}`
        return (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        )
      })}
    </select>
  </>
)

SelectElement.displayName = 'SelectElement'

export default SelectElement

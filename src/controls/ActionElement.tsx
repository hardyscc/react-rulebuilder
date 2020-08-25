import React from 'react'
import { ActionElementProps } from '../context/ConfigContext'

const ActionElement: React.FC<ActionElementProps> = ({
  className,
  handleOnClick,
  label,
  title
}) => (
  <>
    <label htmlFor={title}>{label}</label>
    <button className={className} id={title} onClick={e => handleOnClick(e)} />
  </>
)

ActionElement.displayName = 'ActionElement'

export default ActionElement

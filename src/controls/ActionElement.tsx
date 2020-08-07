import React from 'react'
import { ActionProps } from 'react-querybuilder'

const ActionElement: React.FC<ActionProps> = ({
  className,
  handleOnClick,
  label,
  title
}) => (
  <button className={className} title={title} onClick={e => handleOnClick(e)}>
    {label}
  </button>
)

ActionElement.displayName = 'ActionElement'

export default ActionElement

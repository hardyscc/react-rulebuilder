import React from 'react'
import { ActionElementProps } from '../context/ConfigContext'

const ActionElement: React.FC<ActionElementProps> = ({
  className,
  handleOnClick,
  label,
  title
}) => (
  <>
    <button className={className} id={title} onClick={e => handleOnClick(e)}>
      {label}
    </button>
  </>
)

ActionElement.displayName = 'ActionElement'

export default ActionElement

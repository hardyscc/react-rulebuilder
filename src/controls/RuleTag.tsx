import React from 'react'
import { RuleTagProps } from '../context/ConfigContext'

const RuleTag: React.FC<RuleTagProps> = ({
  children,
  className,
  label,
  ridx
}) => (
  <div className={className}>
    <label>
      {label} {ridx}
    </label>
    <div className='child'>{children}</div>
  </div>
)

RuleTag.displayName = 'RuleTag'

export default RuleTag

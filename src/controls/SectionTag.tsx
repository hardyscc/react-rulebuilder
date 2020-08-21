import React from 'react'
import { SectionTagProps } from '../context/ConfigContext'

const SectionTag: React.FC<SectionTagProps> = ({
  children,
  className,
  label
}) => (
  <div className={className}>
    {label}
    <div className='child'>{children}</div>
  </div>
)

SectionTag.displayName = 'SectionTag'

export default SectionTag

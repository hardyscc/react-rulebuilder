import React from 'react'
import { GroupTagProps } from '../context/ConfigContext'

const GroupTag: React.FC<GroupTagProps> = ({
  children,
  label,
  className,
  gidx
}) => (
  <div className={className}>
    {label} {gidx}
    {children}
  </div>
)

GroupTag.displayName = 'GroupTag'

export default GroupTag

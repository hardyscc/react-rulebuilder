import React from 'react'
import { GroupTagProps } from '../context/ConfigContext'

const GroupTag: React.FC<GroupTagProps> = ({
  children,
  label,
  className,
  gidx
}) => (
  <div className={className}>
    <label>
      {label} {gidx}
    </label>
    <div className='child'>{children}</div>
  </div>
)

GroupTag.displayName = 'GroupTag'

export default GroupTag

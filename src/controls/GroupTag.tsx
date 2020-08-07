import React from 'react'
import { GroupTagProps } from '../context/ConfigContext'

const GroupTag: React.FC<GroupTagProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
)

GroupTag.displayName = 'GroupTag'

export default GroupTag

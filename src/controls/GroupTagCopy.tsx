import React from 'react'
import { GroupTagProps } from '../context/ConfigContext'

const GroupTagCopy: React.FC<GroupTagProps> = ({ children, className }) => (
  <div className={'hello' + className}>{children}</div>
)

GroupTagCopy.displayName = 'GroupTagCopy'

export default GroupTagCopy

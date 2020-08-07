import React, { createContext } from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { consequenceFieldType } from '../components/RuleBuilder'
import { GroupTag } from '../controls'

// type Classnames = {
//   group: string;
//   rule: string;
//   addGroup: string;
//   addRule: string;
//   removeGropu: string;
//   removeRule: string;

// }

export type GroupTagProps = { className: string }

export type Controls = {
  groupTag: React.ComponentType<GroupTagProps>
}

const defaultControlElements: Controls = {
  groupTag: GroupTag
}

const ConfigContext = createContext<{
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
  controlElements: Controls
}>({
  queryProps: {
    fields: [],
    onQueryChange: () => {}
  },
  consequenceFields: [],
  controlElements: { ...defaultControlElements }
})

const ConfigProvider: React.FC<{
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
  controlElements?: Partial<Controls>
}> = ({ queryProps, consequenceFields, controlElements, children }) => {
  return (
    <ConfigContext.Provider
      value={{
        queryProps,
        consequenceFields,
        controlElements: controlElements
          ? { ...defaultControlElements, ...controlElements }
          : defaultControlElements
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider, ConfigContext }

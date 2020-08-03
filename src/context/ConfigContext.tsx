import React, { createContext } from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { consequenceFieldType } from '../components/RuleBuilder'

const ConfigContext = createContext<{
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
}>({
  queryProps: {
    fields: [],
    onQueryChange: () => {}
  },
  consequenceFields: []
})

const ConfigProvider: React.FC<{
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
}> = ({ queryProps, consequenceFields, children }) => {
  return (
    <ConfigContext.Provider value={{ queryProps, consequenceFields }}>
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider, ConfigContext }

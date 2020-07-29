import React from 'react'
import QueryBuilder, {
  QueryBuilderProps,
  RuleGroupType
} from 'react-querybuilder'
import { Action, ActionContext, queryType } from '../context/ActionContext'

export type RuleData = {
  id: string
  query: queryType
}

export interface RuleProps {
  queryProps: QueryBuilderProps
  data: RuleData
  gidx: number
  ridx: number
}

export const Rule: React.FC<RuleProps> = ({ queryProps, data, gidx, ridx }) => {
  // const qProp: QueryBuilderProps = { ...queryProps, translations: { ...queryProps.translations, addGroup: { label: "+Query", title: "Add query" } } };

  const { dispatch } = React.useContext(ActionContext)

  return (
    <div>
      <label htmlFor={data.id}>Rule {ridx}</label>
      <input name={data.id} value={data.id} />
      <QueryBuilder
        {...{
          ...queryProps,
          translations: {
            ...queryProps.translations,
            addGroup: { label: '+Statement', title: 'Add statement' },
            addRule: { label: '+Condition', title: 'Add condition' }
          },
          onQueryChange: (ruleGroup: RuleGroupType) => {
            console.log(ruleGroup)
          }
        }}
      />
      consequence: <input></input>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteRule, gidx: gidx, ridx: ridx })
        }}
      >
        x
      </button>
    </div>
  )
}

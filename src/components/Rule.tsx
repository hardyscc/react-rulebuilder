import React from 'react'
import QueryBuilder, {
  QueryBuilderProps,
  RuleGroupType
} from 'react-querybuilder'
import { Action, ActionContext } from '../context/ActionContext'

export type RuleData = {
  id: string
  priority: number
  condition: RuleGroupType
  consequence: RuleGroupType
  function: string
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
      <label htmlFor={data.id}>
        Rule {ridx} - {data.id}
      </label>
      <label htmlFor={'priority' + ridx}> Priority: </label>
      <input
        type='number'
        name={'priority' + ridx}
        defaultValue={data.priority}
        onChange={v => {
          console.log(`${data.id} priority: ${v.target.value}`)
          dispatch({
            type: Action.UpdateRule,
            gidx: gidx,
            ridx: ridx,
            priority: parseInt(v.target.value)
          })
        }}
      />
      Condition:{' '}
      <QueryBuilder
        {...{
          ...queryProps,
          query: data.condition,
          translations: {
            ...queryProps.translations,
            addGroup: { label: '+Statement', title: 'Add statement' },
            addRule: { label: '+Condition', title: 'Add condition' }
          },
          onQueryChange: (ruleGroup: RuleGroupType) => {
            console.log(`${data.id} condition: ${JSON.stringify(ruleGroup)}`)
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              condition: ruleGroup
            })
          }
        }}
      />
      Consequence:{' '}
      <QueryBuilder
        {...{
          ...queryProps,
          query: data.consequence,
          translations: {
            ...queryProps.translations,
            addGroup: { label: '+Statement', title: 'Add statement' },
            addRule: { label: '+Condition', title: 'Add condition' }
          },
          onQueryChange: (ruleGroup: RuleGroupType) => {
            console.log(`${data.id} consequence: ${JSON.stringify(ruleGroup)}`)
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequence: ruleGroup
            })
          }
        }}
      />
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteRule, gidx: gidx, ridx: ridx })
        }}
      >
        x
      </button>
      <label htmlFor={'function' + ridx}> Function: </label>
      <input
        name={'function' + ridx}
        defaultValue={data.function}
        onChange={v => {
          console.log(`${data.id} function: ${v.target.value}`)
          dispatch({
            type: Action.UpdateRule,
            gidx: gidx,
            ridx: ridx,
            function: v.target.value
          })
        }}
      />
    </div>
  )
}

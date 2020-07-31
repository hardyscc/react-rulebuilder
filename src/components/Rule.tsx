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
  consequence: {
    field: string
    value: string
  }
  function: string
}

export interface RuleProps {
  queryProps: QueryBuilderProps
  data: RuleData
  gidx: number
  ridx: number
}

export const Rule: React.FC<RuleProps> = ({ queryProps, data, gidx, ridx }) => {
  const { dispatch } = React.useContext(ActionContext)

  return (
    <div>
      <label> Rule {ridx} </label>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteRule, gidx: gidx, ridx: ridx })
        }}
      >
        x
      </button>
      <div style={{ display: 'block' }}>
        <label htmlFor={'priority' + ridx}> Priority: </label>
        <input
          type='number'
          id={'priority' + ridx}
          defaultValue={data.priority}
          onChange={v => {
            // console.log(`${data.id} priority: ${v.target.value}`)
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              priority: parseInt(v.target.value)
            })
          }}
        />
      </div>
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
            // console.log(`${data.id} condition: ${JSON.stringify(ruleGroup)}`)
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
      <div style={{ display: 'block' }}>
        <label htmlFor={'consequence-field' + ridx}> Field: </label>
        <select
          id={'consequence-field' + ridx}
          defaultValue={data.consequence.field}
          onChange={v => {
            console.log(`${data.id} function: ${v.target.value}`)
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequenceField: data.consequence.field
            })
          }}
        >
          <option
            key={'scoreType' + ridx}
            value='scoreType'
            label='Score Type'
          />
          <option
            key={'implementation' + ridx}
            value='scoreType'
            label='Implementation'
          />
        </select>
        <label htmlFor={'consequence-value' + ridx}> Value: </label>
        <input
          id={'consequence-value' + ridx}
          defaultValue={data.consequence.value}
          onChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequenceValue: v.target.value
            })
          }}
        />
      </div>
      <div style={{ display: 'block' }}>
        <label htmlFor={'function' + ridx}> Function: </label>
        <select
          id={'function' + ridx}
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
        >
          <option key={'next' + ridx} value='R.next()' label='R.next()' />
          <option key={'stop' + ridx} value='R.stop()' label='R.stop()' />
        </select>
      </div>
    </div>
  )
}

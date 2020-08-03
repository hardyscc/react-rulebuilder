import React from 'react'
import QueryBuilder, { RuleGroupType } from 'react-querybuilder'
import { Action, ActionContext } from '../context/ActionContext'
import { ConfigContext } from '../context/ConfigContext'

export type RuleData = {
  priority: number
  condition: RuleGroupType
  consequence: {
    field: string
    value: string
  }
  function: string
}

export interface RuleProps {
  data: RuleData
  gidx: number
  ridx: number
}

export const Rule: React.FC<RuleProps> = ({ data, gidx, ridx }) => {
  const { dispatch } = React.useContext(ActionContext)
  const { queryProps, consequenceFields } = React.useContext(ConfigContext)

  return (
    <div
      style={{
        display: 'block',
        border: '1px solid blue',
        margin: '3px 6px',
        padding: 6
      }}
    >
      <label> Rule {ridx} </label>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteRule, gidx: gidx, ridx: ridx })
        }}
      >
        x
      </button>
      <div style={{ display: 'block' }}>
        Condition:{' '}
        <div style={{ border: '1px solid black', padding: 3 }}>
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
                dispatch({
                  type: Action.UpdateRule,
                  gidx: gidx,
                  ridx: ridx,
                  condition: ruleGroup
                })
              }
            }}
          />
        </div>
      </div>
      Consequence:{' '}
      <div style={{ display: 'block' }}>
        <label htmlFor={'consequence-field' + ridx}> Field: </label>
        <select
          id={'consequence-field' + ridx}
          defaultValue={data.consequence.field}
          onChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequenceField: v.target.value
            })
          }}
        >
          {consequenceFields.map(field => {
            return (
              <option
                key={field.value + ridx}
                value={field.value}
                label={field.label}
              />
            )
          })}
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

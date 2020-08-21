import React from 'react'
import QueryBuilder, { RuleGroupType } from 'react-querybuilder'
import { Action, ActionContext } from '../context/ActionContext'
import { ConfigContext } from '../context/ConfigContext'
import { GroupData } from './Group'

export type RuleData = {
  priority: number
  condition: RuleGroupType
  consequence: {
    field: string
    value: string
  }
  flow: string
}

export interface RuleProps {
  data: RuleData
  parent: GroupData
  gidx: number
  ridx: number
}

export const Rule: React.FC<RuleProps> = ({ data, gidx, ridx }) => {
  const { dispatch } = React.useContext(ActionContext)
  const {
    controlElements,
    controlClassnames,
    queryProps,
    consequenceFields
  } = React.useContext(ConfigContext)

  return (
    <controlElements.ruleTag
      className={controlClassnames.rule}
      label='Rule'
      gidx={gidx}
      ridx={ridx}
    >
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteRule, gidx: gidx, ridx: ridx })
        }}
      >
        x
      </button>

      <controlElements.conditionTag
        className={controlClassnames.condition}
        label='Condition'
      >
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
      </controlElements.conditionTag>

      <controlElements.consequenceTag
        className={controlClassnames.consequence}
        label='Consequence'
      >
        <label htmlFor={`consequence-field-${gidx}-${ridx}`}> Field: </label>
        <select
          id={`consequence-field-${gidx}-${ridx}`}
          value={data.consequence.field}
          onChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequenceField: v.target.value
            })
          }}
          disabled
        >
          <option key='consequence-field-undefined' label='' />
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
        <label htmlFor={`consequence-value-${gidx}-${ridx}`}> Value: </label>
        <input
          id={`consequence-value-${gidx}-${ridx}`}
          value={data.consequence.value}
          onChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequenceValue: v.target.value
            })
          }}
        />
      </controlElements.consequenceTag>

      <controlElements.flowTag
        className={controlClassnames.flow}
        label='Flow Control'
      >
        <label htmlFor={`flow-${gidx}-${ridx}`}> Going: </label>
        <select
          id={`flow-${gidx}-${ridx}`}
          value={data.flow}
          onChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              flow: v.target.value
            })
          }}
        >
          <option key={'next' + ridx} value='R.next()' label='Next' />
          <option key={'stop' + ridx} value='R.stop()' label='Stop' />
        </select>
      </controlElements.flowTag>
    </controlElements.ruleTag>
  )
}

import { nanoid } from 'nanoid'
import React from 'react'
import { Action, ActionContext } from '../context/ActionContext'
import { ConfigContext } from '../context/ConfigContext'
import { Rule, RuleData } from './Rule'

export type GroupData = {
  rules: RuleData[]
  groupDefination?: string
}

export interface GroupProps {
  data: GroupData
  gidx: number
}

export const Group: React.FC<GroupProps> = ({ data, gidx }) => {
  const { dispatch } = React.useContext(ActionContext)
  const { controlElements, controlClassnames, getGroupIndex, consequenceFields } = React.useContext(ConfigContext)

  getGroupIndex ? getGroupIndex(gidx) : null;

  return (
    <controlElements.groupTag
      className={controlClassnames.group}
      label="Group"
      gidx={gidx}
    >
      <select
        id={`group-defination-${gidx}`}
        title={`group-defination-${gidx}`}
        value={data.groupDefination}
        onChange={v => {
          dispatch({
            type: Action.UpdateGroup,
            gidx: gidx,
            groupDefination: v.target.value
          })
        }}
      >
        <option
          key="group-defination-undefined"
          label="Please select"
        />
        {consequenceFields.map(field => {
          return (
            <option
              key={field.value + gidx}
              value={field.value}
              label={field.label}
            />
          )
        })}
      </select>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteGroup, gidx: gidx })
        }}
      >
        x
      </button>
      {data.rules.map((rule, ridx) => (
        <Rule key={'rule' + ridx} data={rule} parent={data} gidx={gidx} ridx={ridx} />
      ))}
      <button
        onClick={() => {
          dispatch({
            type: Action.AddRule,
            gidx: gidx,
            priority: 100,
            condition: {
              id: nanoid(),
              rules: [],
              combinator: 'and',
              not: false
            },
            consequence: {
              id: nanoid(),
              rules: [],
              combinator: 'and',
              not: false
            },
            flow: 'R.next()'
          })
        }}
      >
        Add Rule
      </button>
    </controlElements.groupTag>
  )
}

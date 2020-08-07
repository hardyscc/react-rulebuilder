import { nanoid } from 'nanoid'
import React from 'react'
import { Action, ActionContext } from '../context/ActionContext'
import { ConfigContext } from '../context/ConfigContext'
import { Rule, RuleData } from './Rule'

export type GroupData = {
  rules: RuleData[]
}

export interface GroupProps {
  data: GroupData
  gidx: number
}

export const Group: React.FC<GroupProps> = ({ data, gidx }) => {
  const { dispatch } = React.useContext(ActionContext)
  const { controlElements } = React.useContext(ConfigContext)

  return (
    <controlElements.groupTag
      className="group"
    >
      <label>Group {gidx}</label>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteGroup, gidx: gidx })
        }}
      >
        x
      </button>
      {data.rules.map((rule, ridx) => (
        <Rule key={'rule' + ridx} data={rule} gidx={gidx} ridx={ridx} />
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
            function: 'R.next()'
          })
        }}
      >
        Add Rule
      </button>
    </controlElements.groupTag>
  )
}

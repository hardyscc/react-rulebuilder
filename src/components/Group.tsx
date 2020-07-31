import { nanoid } from 'nanoid'
import React from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { Action, ActionContext } from '../context/ActionContext'
import { Rule, RuleData } from './Rule'

export type GroupData = {
  id: string
  rules: RuleData[]
}

export interface GroupProps {
  queryProps: QueryBuilderProps
  data: GroupData
  gidx: number
}

export const Group: React.FC<GroupProps> = ({ queryProps, data, gidx }) => {
  const { dispatch } = React.useContext(ActionContext)

  return (
    <div>
      <label>Group {gidx}</label>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteGroup, gidx: gidx })
        }}
      >
        x
      </button>
      {data.rules.map((rule, ridx) => (
        <Rule key={"rule" + ridx} queryProps={queryProps} data={rule} gidx={gidx} ridx={ridx} />
      ))}
      <button
        onClick={() => {
          dispatch({
            type: Action.AddRule,
            gidx: gidx,
            priority: 100,
            condition: { id: nanoid(), rules: [], combinator: 'and', not: false },
            consequence: { id: nanoid(), rules: [], combinator: 'and', not: false },
            function: "R.next()"
          })
        }}
      >
        Add Rule
      </button>
    </div>
  )
}

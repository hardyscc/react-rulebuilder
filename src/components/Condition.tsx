import React from 'react'
import QueryBuilder, { QueryBuilderProps } from 'react-querybuilder'
import { Action, Actions, queryType } from './RuleBuilder'

export type ConditionData = {
  id: string
  query: queryType
}

export interface ConditionProps {
  queryProps: QueryBuilderProps
  data: ConditionData
  ridx: number
  cidx: number
  dispatch: React.Dispatch<Actions>
}

export const Condition: React.FC<ConditionProps> = ({
  queryProps,
  data,
  ridx,
  cidx,
  dispatch
}) => {
  return (
    <div>
      <label htmlFor={data.id}>Condition {cidx}</label>
      <input name={data.id} value={data.id} />
      <QueryBuilder {...queryProps} />
      consequence: <input></input>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteCondition, ridx: ridx, cidx: cidx })
        }}
      >
        x
      </button>
    </div>
  )
}

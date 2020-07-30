import * as React from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { Action, ActionContext, ActionProvider } from '../context/ActionContext'
import { Group, GroupData } from './Group'

export type RuleBuilderData = {
  groups: GroupData[]
}

export type RuleBuilderProps = {
  queryProps: QueryBuilderProps
  inputData?: RuleBuilderData
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  queryProps,
  inputData
}) => {
  // const [root, dispatch] = useReducer(reducer, inputData ?? initData)
  console.log(queryProps)
  console.log(inputData)

  return (
    <ActionProvider inputData={inputData}>
      <RuleComponent queryProps={queryProps} />
    </ActionProvider>
  )
}

const RuleComponent: React.FC<RuleBuilderProps> = ({ queryProps }) => {
  const { root, dispatch } = React.useContext(ActionContext)

  return (
    <div>
      {root.groups.map((group, gidx) => (
        <Group queryProps={queryProps} data={group} gidx={gidx} />
      ))}
      <button
        onClick={() => {
          dispatch({ type: Action.AddGroup })
        }}
      >
        Add Group
      </button>
      <button
        onClick={() => {
          console.log(`view the draft: ${JSON.stringify(root)}`)
        }}
      >
        View
      </button>
    </div>
  )
}

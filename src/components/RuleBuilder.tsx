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
  // console.log(queryProps)
  // console.log(inputData)

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
        <Group
          key={'group' + gidx}
          queryProps={queryProps}
          data={group}
          gidx={gidx}
        />
      ))}
      <button
        onClick={() => {
          dispatch({ type: Action.AddGroup })
        }}
      >
        Add Group
      </button>
      <div style={{ display: 'block' }}>
        <button
          onClick={() => {
            console.log(root)
          }}
        >
          View
        </button>
      </div>
    </div>
  )
}

import * as React from 'react'
import { useEffect } from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { Action, ActionContext, ActionProvider } from '../context/ActionContext'
import { ConfigProvider } from '../context/ConfigContext'
import { Group, GroupData } from './Group'

export type RuleBuilderData = {
  groups: GroupData[]
}

export type consequenceFieldType = {
  label: string
  value: string
}

export type RuleBuilderProps = {
  queryProps: QueryBuilderProps
  inputData?: RuleBuilderData
  consequenceFields: consequenceFieldType[]
  getRuleJson: (getRuleJson: RuleBuilderData) => void
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  queryProps,
  inputData,
  consequenceFields,
  getRuleJson
}) => {
  return (
    <ConfigProvider
      queryProps={queryProps}
      consequenceFields={consequenceFields}
    >
      <ActionProvider inputData={inputData}>
        <RuleComponent getRuleJson={getRuleJson} />
      </ActionProvider>
    </ConfigProvider>
  )
}

const RuleComponent: React.FC<{
  getRuleJson: (getRuleJson: RuleBuilderData) => void
}> = ({ getRuleJson }) => {
  const { root, dispatch } = React.useContext(ActionContext)

  useEffect(() => {
    getRuleJson(root)
  }, [root])

  return (
    <div>
      {root.groups.map((group, gidx) => (
        <Group key={'group' + gidx} data={group} gidx={gidx} />
      ))}
      <button
        onClick={() => {
          dispatch({ type: Action.AddGroup })
        }}
      >
        Add Group
      </button>
    </div>
  )
}

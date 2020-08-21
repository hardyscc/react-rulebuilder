import * as React from 'react'
import { useEffect } from 'react'
import { Action, ActionContext, ActionProvider } from '../context/ActionContext'
import { ConfigConextProps, ConfigProvider } from '../context/ConfigContext'
import { Group, GroupData } from './Group'
import './RuleBuilder.css'

export type RuleBuilderData = {
  groups: GroupData[]
}

export type consequenceFieldType = {
  label: string
  value: string
}

export type RuleBuilderProps = {
  inputData?: RuleBuilderData
  onRulesChange: (onRulesChange: RuleBuilderData) => void
} & ConfigConextProps

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  queryProps,
  inputData,
  consequenceFields,
  controlElements,
  controlClassnames,
  onRulesChange,
  getGroupIndex
}) => {
  return (
    <ConfigProvider
      queryProps={queryProps}
      consequenceFields={consequenceFields}
      controlElements={controlElements}
      controlClassnames={controlClassnames}
      getGroupIndex={getGroupIndex}
    >
      <ActionProvider inputData={inputData}>
        <RuleComponent onRulesChange={onRulesChange} />
      </ActionProvider>
    </ConfigProvider>
  )
}

const RuleComponent: React.FC<{
  onRulesChange: (onRulesChange: RuleBuilderData) => void
}> = ({ onRulesChange }) => {
  const { root, dispatch } = React.useContext(ActionContext)

  useEffect(() => {
    onRulesChange(root)
  }, [root])

  return (
    <>
      <div style={{ display: 'inline' }}>
        <button
          onClick={() => {
            dispatch({ type: Action.AddGroup })
          }}
        >
          Add Group
        </button>
        <div>
          {root.groups.map((group, gidx) => (
            <Group key={'group' + gidx} data={group} gidx={gidx} />
          ))}
        </div>
      </div>
    </>
  )
}

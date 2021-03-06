import * as React from 'react'
import { useContext, useEffect } from 'react'
import { Action, ActionContext, ActionProvider } from '../context/ActionContext'
import {
  ConfigConextProps,
  ConfigContext,
  ConfigProvider
} from '../context/ConfigContext'
import { Group, GroupData } from './Group'
// import './RuleBuilder.css'

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
  translations,
  controlClassnames,
  displayAddRuleTop,
  displayAddGroupTop,
  displayConditionFirst,
  onRulesChange
}) => {
  return (
    <ConfigProvider
      queryProps={queryProps}
      consequenceFields={consequenceFields}
      controlElements={controlElements}
      translations={translations}
      controlClassnames={controlClassnames}
      displayAddRuleTop={displayAddRuleTop}
      displayAddGroupTop={displayAddGroupTop}
      displayConditionFirst={displayConditionFirst}
    >
      <ActionProvider inputData={inputData}>
        <RuleComponent onRulesChange={onRulesChange} />
      </ActionProvider>
    </ConfigProvider>
  )
}

function addGroupEl () {
  const { dispatch } = useContext(ActionContext)
  const { controlElements, translations, controlClassnames } = useContext(
    ConfigContext
  )

  return (
    <controlElements.addGroup
      className={controlClassnames.addGroup}
      handleOnClick={() => {
        dispatch({ type: Action.AddGroup })
      }}
      label={translations.addGroup.label}
      title={translations.addGroup.title}
    />
  )
}

const RuleComponent: React.FC<{
  onRulesChange: (onRulesChange: RuleBuilderData) => void
}> = ({ onRulesChange }) => {
  const { root } = useContext(ActionContext)
  const { displayAddGroupTop } = useContext(ConfigContext)

  useEffect(() => {
    onRulesChange(root)
  }, [root])

  return (
    <>
      {displayAddGroupTop && addGroupEl()}
      {root.groups.map((group, gidx) => (
        <Group key={'group' + gidx} data={group} gidx={gidx} />
      ))}
      {!displayAddGroupTop && addGroupEl()}
    </>
  )
}

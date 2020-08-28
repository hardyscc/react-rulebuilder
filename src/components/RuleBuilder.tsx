import * as React from 'react'
import { useEffect } from 'react'
import { Action, ActionContext, ActionProvider } from '../context/ActionContext'
import {
  ConfigConextProps,
  ConfigContext,
  ConfigProvider
} from '../context/ConfigContext'
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
  translations,
  controlClassnames,
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
      displayConditionFirst={displayConditionFirst}
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
  const { controlElements, translations, controlClassnames } = React.useContext(
    ConfigContext
  )

  useEffect(() => {
    onRulesChange(root)
  }, [root])

  return (
    <>
      <controlElements.addGroup
        className={controlClassnames.addGroup}
        handleOnClick={() => {
          dispatch({ type: Action.AddGroup })
        }}
        label={translations.addGroup.label}
        title={translations.addGroup.title}
      />
      {root.groups.map((group, gidx) => (
        <Group key={'group' + gidx} data={group} gidx={gidx} />
      ))}
    </>
  )
}

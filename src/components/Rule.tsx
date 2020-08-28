import React from 'react'
import QueryBuilder, { RuleGroupType } from 'react-querybuilder'
import { Action, ActionContext } from '../context/ActionContext'
import { ConfigContext } from '../context/ConfigContext'
import { GroupData } from './Group'

export type RuleData = {
  priority: number
  condition: RuleGroupType
  consequence: {
    field: string
    value: string
  }
  flow: string
}

export interface RuleProps {
  data: RuleData
  parent: GroupData
  gidx: number
  ridx: number
}

export const Rule: React.FC<RuleProps> = ({ data, gidx, ridx }) => {
  const { dispatch } = React.useContext(ActionContext)
  const {
    controlElements,
    translations,
    controlClassnames,
    queryProps,
    consequenceFields,
    displayConditionFirst
  } = React.useContext(ConfigContext)

  return (
    <controlElements.ruleTag
      className={controlClassnames.rule}
      label={translations.ruleTag.label}
      gidx={gidx}
      ridx={ridx}
    >
      <controlElements.removeRule
        className={controlClassnames.removeRule}
        handleOnClick={() => {
          dispatch({ type: Action.DeleteRule, gidx: gidx, ridx: ridx })
        }}
        label={translations.removeRule.label}
        title={translations.removeRule.title + `-${gidx}-${ridx}`}
      />

      {displayConditionFirst && (
        <controlElements.conditionTag
          className={controlClassnames.condition}
          label='Condition'
        >
          <QueryBuilder
            {...{
              ...queryProps,
              query: data.condition,
              translations: {
                ...queryProps.translations,
                addGroup: { label: '+Statement', title: 'Add statement' },
                addRule: { label: '+Condition', title: 'Add condition' }
              },
              onQueryChange: (ruleGroup: RuleGroupType) => {
                dispatch({
                  type: Action.UpdateRule,
                  gidx: gidx,
                  ridx: ridx,
                  condition: ruleGroup
                })
              }
            }}
          />
        </controlElements.conditionTag>
      )}

      <controlElements.consequenceTag
        className={controlClassnames.consequence}
        label='Consequence'
      >
        <controlElements.consequenceFieldInput
          value={data.consequence.field}
          handleOnChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequenceField: v
            })
          }}
          title={translations.consequenceField.title + `-${gidx}-${ridx}`}
          className={controlClassnames.consequenceField}
          type='select'
          values={consequenceFields}
          label={translations.consequenceField.label}
          disabled={true}
        />

        <controlElements.consequenceValueInput
          value={data.consequence.value}
          handleOnChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              consequenceValue: v
            })
          }}
          title={translations.consequenceValue.title + `-${gidx}-${ridx}`}
          className={controlClassnames.consequenceValue}
          type='input'
          label={translations.consequenceValue.label}
        />
      </controlElements.consequenceTag>

      {!displayConditionFirst && (
        <controlElements.conditionTag
          className={controlClassnames.condition}
          label='Condition'
        >
          <QueryBuilder
            {...{
              ...queryProps,
              query: data.condition,
              translations: {
                ...queryProps.translations,
                addGroup: { label: '+Statement', title: 'Add statement' },
                addRule: { label: '+Condition', title: 'Add condition' }
              },
              onQueryChange: (ruleGroup: RuleGroupType) => {
                dispatch({
                  type: Action.UpdateRule,
                  gidx: gidx,
                  ridx: ridx,
                  condition: ruleGroup
                })
              }
            }}
          />
        </controlElements.conditionTag>
      )}

      <controlElements.flowTag
        className={controlClassnames.flow}
        label={translations.flowTag.label}
      >
        <controlElements.flowInput
          value={data.flow}
          handleOnChange={v => {
            dispatch({
              type: Action.UpdateRule,
              gidx: gidx,
              ridx: ridx,
              flow: v
            })
          }}
          title={translations.flowValue.title + `-${gidx}-${ridx}`}
          className={controlClassnames.flowValue}
          type='select'
          values={[
            { value: 'R.next()', label: 'Next' },
            { value: 'R.stop()', label: 'Stop' }
          ]}
          label={translations.flowValue.label}
        />
      </controlElements.flowTag>
    </controlElements.ruleTag>
  )
}

import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import { Action, ActionContext } from '../context/ActionContext'
import { ConfigContext } from '../context/ConfigContext'
import { Rule, RuleData } from './Rule'

export type GroupData = {
  rules: RuleData[]
  groupDefination?: string
}

export interface GroupProps {
  data: GroupData
  gidx: number
}

function addRuleEl(gidx: number) {
  const { dispatch } = useContext(ActionContext)
  const {
    controlElements,
    translations,
    controlClassnames,
  } = useContext(ConfigContext)

  return (
    <controlElements.addRule
      className={controlClassnames.addRule}
      handleOnClick={() => {
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
          flow: 'R.next()'
        })
      }}
      label={translations.addRule.label}
      title={translations.addRule.title + `-${gidx}`}
    />
  )
}

export const Group: React.FC<GroupProps> = ({ data, gidx }) => {
  const { dispatch } = useContext(ActionContext)
  const { controlElements, translations, controlClassnames, consequenceFields, displayAddRuleTop } = useContext(ConfigContext)

  return (
    <controlElements.groupTag
      className={controlClassnames.group}
      label={translations.groupTag.label}
      gidx={gidx}
    >
      <controlElements.groupDefinationInput
        value={data.groupDefination}
        handleOnChange={v => {
          dispatch({
            type: Action.UpdateGroup,
            gidx: gidx,
            groupDefination: v
          })
        }}
        title={translations.groupDefination.title + `-${gidx}`}
        className={controlClassnames.groupDefination}
        type="select"
        values={[{ value: undefined, label: '' }, ...consequenceFields]}
        label={translations.groupDefination.label}
      />
      <controlElements.removeGroup
        className={controlClassnames.removeGroup}
        handleOnClick={() => {
          dispatch({ type: Action.DeleteGroup, gidx: gidx })
        }}
        label={translations.removeGroup.label}
        title={translations.removeGroup.title + `-${gidx}`}
      />

      {displayAddRuleTop && addRuleEl(gidx)}
      {data.rules.map((rule, ridx) => (
        <Rule key={'rule' + ridx} data={rule} parent={data} gidx={gidx} ridx={ridx} />
      ))}
      {!displayAddRuleTop && addRuleEl(gidx)}

    </controlElements.groupTag>
  )
}

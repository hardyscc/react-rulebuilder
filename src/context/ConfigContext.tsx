import React, { createContext } from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { consequenceFieldType } from '../components/RuleBuilder'
import { ActionElement, GroupTag, SectionTag, ValueEditor } from '../controls'
import RuleTag from '../controls/RuleTag'

export type GroupTagProps = { className: string; label: string; gidx: number }
export type RuleTagProps = {
  className: string
  label: string
  gidx: number
  ridx: number
}
export type SectionTagProps = { className: string; label: string }

export type ActionElementProps = {
  className: string
  handleOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  title: string
  label: string
}

export type ValueEditorProps = {
  value?: string
  handleOnChange: (event: string) => void
  title: string
  className: string
  type: string
  inputType?: string
  values?: any[]
  label: string
  disabled?: boolean
}

export type Classnames = {
  ruleBuilder: string
  group: string
  groupDefination: string
  rule: string
  condition: string
  consequence: string
  consequenceField: string
  consequenceValue: string
  flow: string
  flowValue: string
  addGroup: string
  addRule: string
  removeGroup: string
  removeRule: string
}

export type Translations = {
  groupTag: {
    label: string
  }
  groupDefination: {
    label: string
    title: string
  }
  ruleTag: { label: string }
  conditionTag: { label: string }
  consequenceTag: {
    label: string
  }
  consequenceField: {
    label: string
    title: string
  }
  consequenceValue: {
    label: string
    title: string
  }
  flowTag: {
    label: string
  }
  flowValue: {
    label: string
    title: string
  }
  addGroup: {
    label: string
    title: string
  }
  addRule: {
    label: string
    title: string
  }
  removeGroup: {
    label: string
    title: string
  }
  removeRule: {
    label: string
    title: string
  }
}

export type Controls = {
  groupTag: React.ComponentType<GroupTagProps>
  ruleTag: React.ComponentType<RuleTagProps>
  groupDefinationInput: React.ComponentType<ValueEditorProps>
  conditionTag: React.ComponentType<SectionTagProps>
  consequenceTag: React.ComponentType<SectionTagProps>
  consequenceFieldInput: React.ComponentType<ValueEditorProps>
  consequenceValueInput: React.ComponentType<ValueEditorProps>
  flowTag: React.ComponentType<SectionTagProps>
  flowInput: React.ComponentType<ValueEditorProps>
  addGroup: React.ComponentType<ActionElementProps>
  addRule: React.ComponentType<ActionElementProps>
  removeGroup: React.ComponentType<ActionElementProps>
  removeRule: React.ComponentType<ActionElementProps>
}

const defaultTranslations: Translations = {
  groupTag: {
    label: 'Group'
  },
  groupDefination: {
    label: '',
    title: 'group-defination'
  },
  ruleTag: { label: 'Rule' },
  conditionTag: { label: 'Condition' },
  consequenceTag: {
    label: 'Consequence'
  },
  consequenceField: {
    label: 'Field',
    title: 'consequence-field'
  },
  consequenceValue: {
    label: 'Value',
    title: 'consequence-value'
  },
  flowTag: {
    label: 'Flow Control'
  },
  flowValue: {
    label: 'Flow',
    title: 'flow-value'
  },
  addGroup: {
    label: 'Add Group',
    title: 'add-group'
  },
  addRule: {
    label: 'Add Rule',
    title: 'add-rule'
  },
  removeGroup: {
    label: 'x',
    title: 'remove-group'
  },
  removeRule: {
    label: 'x',
    title: 'remove-rule'
  }
}

const defaultControlClassnames: Classnames = {
  ruleBuilder: 'ruleBuilder',
  group: 'group',
  groupDefination: 'groupDefination',
  rule: 'groupRule',
  condition: 'section',
  consequence: 'section',
  consequenceField: 'consequenceField',
  consequenceValue: 'consequenceValue',
  flow: 'section',
  flowValue: 'flowValue',
  addGroup: 'addGroup',
  addRule: 'addRule',
  removeGroup: 'removeGroup',
  removeRule: 'removeRule'
}

const defaultControlElements: Controls = {
  groupTag: GroupTag,
  ruleTag: RuleTag,
  groupDefinationInput: ValueEditor,
  conditionTag: SectionTag,
  consequenceTag: SectionTag,
  consequenceFieldInput: ValueEditor,
  consequenceValueInput: ValueEditor,
  flowTag: SectionTag,
  flowInput: ValueEditor,
  addGroup: ActionElement,
  addRule: ActionElement,
  removeGroup: ActionElement,
  removeRule: ActionElement
}

export type ConfigType = {
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
  controlElements: Controls
  translations: Translations
  controlClassnames: Classnames
  displayAddRuleTop: boolean
  displayAddGroupTop: boolean
  displayConditionFirst: boolean
}

export type ConfigConextProps = {
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
  controlElements?: Partial<Controls>
  translations?: Partial<Translations>
  controlClassnames?: Partial<Classnames>
  displayAddRuleTop?: boolean
  displayAddGroupTop?: boolean
  displayConditionFirst?: boolean
}

const ConfigContext = createContext<ConfigType>({
  queryProps: {
    fields: [],
    onQueryChange: () => {}
  },
  consequenceFields: [],
  controlElements: { ...defaultControlElements },
  translations: { ...defaultTranslations },
  controlClassnames: { ...defaultControlClassnames },
  displayAddRuleTop: true,
  displayAddGroupTop: true,
  displayConditionFirst: true
})

const ConfigProvider: React.FC<ConfigConextProps> = ({
  queryProps,
  consequenceFields,
  controlElements,
  translations,
  controlClassnames,
  children,
  displayAddRuleTop,
  displayAddGroupTop,
  displayConditionFirst
}) => {
  return (
    <ConfigContext.Provider
      value={{
        queryProps,
        consequenceFields,
        controlElements: controlElements
          ? { ...defaultControlElements, ...controlElements }
          : defaultControlElements,
        translations: translations
          ? { ...defaultTranslations, ...translations }
          : defaultTranslations,
        controlClassnames: controlClassnames
          ? { ...defaultControlClassnames, ...controlClassnames }
          : defaultControlClassnames,
        displayAddRuleTop: displayAddRuleTop ?? true,
        displayAddGroupTop: displayAddGroupTop ?? true,
        displayConditionFirst: displayConditionFirst ?? true
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider, ConfigContext }

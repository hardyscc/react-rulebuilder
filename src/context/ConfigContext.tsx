import React, { createContext } from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { consequenceFieldType } from '../components/RuleBuilder'
import { GroupTag, SectionTag } from '../controls'
import RuleTag from '../controls/RuleTag'

export type GroupTagProps = { className: string, label: string, gidx: number }
export type RuleTagProps = { className: string, label: string, gidx: number, ridx: number }
export type SectionTagProps = { className: string, label: string }

export type ActionElementProps = {
  className: string,
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  title: string,
  label: string,
  value: string
}

export type SelectElementProps = {
  className: string,
  handleOnChange: (event: string) => void,
  options: { label: string, value: string }[],
  title: string,
  label: string,
  value: string
}


export type Classnames = {
  group: string;
  rule: string;
  condition: string;
  consequence: string;
  flow: string;
  addGroup: string;
  addRule: string;
  removeGroup: string;
  removeRule: string;
}

export type Translations = {
  groupTag: {
    label: string
    title: string;
  };
  ruleTag: { label: string };
  conditionTag: { label: string };
  consequenceTag: {
    label: string
    title: string;
  };
  flowTag: {
    label: string
    title: string;
  };
  addGroup: {
    label: string;
    title: string;
  };
  addRule: {
    label: string;
    title: string;
  };
  removeGroup: {
    label: string;
    title: string;
  };
  removeRule: {
    label: string;
    title: string;
  };
}

export type Controls = {
  groupTag: React.ComponentType<GroupTagProps>
  ruleTag: React.ComponentType<RuleTagProps>
  conditionTag: React.ComponentType<SectionTagProps>
  consequenceTag: React.ComponentType<SectionTagProps>
  flowTag: React.ComponentType<SectionTagProps>
}

const defaultTranslations: Translations = {
  groupTag: {
    label: 'Group',
    title: 'group-defination'
  },
  ruleTag: { label: 'Rule' },
  conditionTag: { label: 'Condition' },
  consequenceTag: {
    label: 'Consequence',
    title: 'consequence'
  },
  flowTag: {
    label: 'Flow',
    title: 'flow'
  },
  addGroup: {
    label: '+Group',
    title: 'Add group'
  },
  addRule: {
    label: '+Rule',
    title: 'Add rule'
  },
  removeGroup: {
    label: 'x',
    title: 'Remove group'
  },
  removeRule: {
    label: 'x',
    title: 'Remove rule'
  },
};

const defaultControlClassnames: Classnames = {
  group: "group",
  rule: "groupRule",
  condition: "section",
  consequence: "section",
  flow: "section",
  addGroup: "addGroup",
  addRule: "addRule",
  removeGroup: "removeGroup",
  removeRule: "removeRule",
}

const defaultControlElements: Controls = {
  groupTag: GroupTag,
  ruleTag: RuleTag,
  conditionTag: SectionTag,
  consequenceTag: SectionTag,
  flowTag: SectionTag,
}

export type ConfigType = {
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
  controlElements: Controls
  controlClassnames: Classnames
  getGroupIndex?: (gidx: number) => number
}

export type ConfigConextProps = {
  queryProps: QueryBuilderProps
  consequenceFields: consequenceFieldType[]
  controlElements?: Partial<Controls>
  controlClassnames?: Partial<Classnames>
  getGroupIndex?: (gidx: number) => number
}

const ConfigContext = createContext<ConfigType>({
  queryProps: {
    fields: [],
    onQueryChange: () => { }
  },
  consequenceFields: [],
  controlElements: { ...defaultControlElements },
  controlClassnames: { ...defaultControlClassnames },
  getGroupIndex: (gidx: 0) => gidx
})

const ConfigProvider: React.FC<ConfigConextProps> = ({ queryProps, consequenceFields, controlElements, controlClassnames, getGroupIndex, children }) => {
  return (
    <ConfigContext.Provider
      value={{
        queryProps,
        consequenceFields,
        controlElements: controlElements
          ? { ...defaultControlElements, ...controlElements }
          : defaultControlElements,
        controlClassnames: controlClassnames
          ? { ...defaultControlClassnames, ...controlClassnames }
          : defaultControlClassnames,
        getGroupIndex
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider, ConfigContext }


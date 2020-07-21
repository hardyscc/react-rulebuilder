import * as React from 'react'
import QueryBuilder, { QueryBuilderProps } from 'react-querybuilder'

interface RuleBuilderProps extends QueryBuilderProps {}

export const RuleBuilder: React.FC<RuleBuilderProps> = props => (
  <div role='heading' aria-level={1}>
    <QueryBuilder {...props} />
  </div>
)

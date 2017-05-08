
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import DefaultListGroupItem from '../components/DefaultListGroupItem'
import DefaultListGroup from '../components/DefaultListGroup'
import FieldTypeButton from '../components/FieldTypeButton'
import FieldButton from '../components/FieldButton'
import { Panel } from 'react-bootstrap'

storiesOf('DefaultListGroupItem', module)
  .add('', () => (
    <DefaultListGroupItem itemProps={{'className': 'myclass-active', 'label': 'some column or type'}} />
  ))
storiesOf('DefaultListGroup', module)
  .add('type filter list items', () => (
    <Panel collapsible defaultExpanded header='Narrow By'>
      <DefaultListGroup
        itemComponent={FieldTypeButton}
        className={'ColumnSelector-list-group'}
        items={
          [{'count': 10, 'label': 'text', 'isSelected': true, 'actionFxn': action('clicked')},
          {'label': 'number', 'isSelected': false, 'count': 3}, {'label': 'boolean', 'isSelected': true, 'count': 10},
          {'label': 'date', 'count': 5, 'isSelected': false} ]} />
    </Panel>
  ))
  .add('field items', () => (
    <Panel collapsible defaultExpanded header='Narrow By'>
      <DefaultListGroup
        itemComponent={FieldButton}
        className={'ColumnSelector-list-group'}
        items={
          [{'label': 'col1', 'isSelected': false, 'actionFxn': action('clicked'), 'type': 'text'},
          {'type': 'number', 'isSelected': false, 'label': 'col2', 'actionFxn': action('clicked')},
          {'type': 'boolean', 'isSelected': false, 'label': 'col3', 'actionFxn': action('clicked')},
          {'type': 'date', label: 'col4', 'isSelected': false, 'actionFxn': action('clicked')}]} />
    </Panel>
  ))
  .add('field items initialized', () => (
    <Panel collapsible defaultExpanded header='Narrow By'>
      <DefaultListGroup
        itemComponent={FieldButton}
        className={'ColumnSelector-list-group'}
        items={
          [{'label': 'col1', 'actionFxn': action('clicked'), 'type': 'text'},
          {'type': 'number', 'label': 'col2', 'actionFxn': action('clicked')},
          {'type': 'boolean', 'label': 'col3', 'actionFxn': action('clicked')},
          {'type': 'date', label: 'col4', 'actionFxn': action('clicked')}]} />
    </Panel>
  ))


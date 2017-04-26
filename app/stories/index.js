
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import DefaultListGroupItem from '../components/DefaultListGroupItem'
import DefaultListGroup from '../components/DefaultListGroup'
import FieldTypeButton from '../components/FieldTypeButton'
import FieldButton from '../components/FieldButton'
import HideShowButton from '../components/HideShowButton'
import Icon from '../components/Icon'
import { Panel, Col } from 'react-bootstrap'

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
        items={[ { 'value': 10, 'label': 'text', 'isSelected': true, 'actionFxn': action('clicked') }, {'label': 'number', 'isSelected': false, 'value': 3}, {'label': 'boolean', 'isSelected': true, 'value': 10}, {'label': 'date', 'value': 5, 'isSelected': false} ]} />
    </Panel>
  ))
  .add('Selected Column', () => (
   <Col md={3}>
    <Panel collapsible defaultExpanded header='Selected Column'>
      <DefaultListGroup
        onClick={action('clicked')}
        iconClick={action('clicked')}
        itemComponent={FieldButton}
        className={'ColumnSelector-list-group'}
        items={[{'label': 'col1', 'isSelected': true, 'type': 'text', otherComponents:(  <Icon label={'glyphicon glyphicon-remove'} className={'remove-field-icon'} onClickFxn={action()} actionFxnParams={'x'} />)}]} />
    <HideShowButton itemProps={{'value': 10, 'actionFxn': action('clicked')}} />
    </Panel>
    </Col>
  ))
  .add('field items initialized', () => (
    <Col md={3}>
      <Panel collapsible defaultExpanded header='Select a Column'>
        <DefaultListGroup
          iconClick={action('clicked')}
          itemComponent={FieldButton}
          onClick={action('clicked')}
          className={'ColumnSelector-list-group'}
          items={[{'label': 'col1', 'type': 'text'}, {'type': 'number', 'label': 'col2'}, {'type': 'boolean', 'label': 'col3'}, {'type': 'date', label: 'col4'}]} />
        <HideShowButton itemProps={{'value': 10, 'actionFxn': action('clicked')}} />
      </Panel>
    </Col>
  ))
  .add('field items show all non selected', () => (
    <Col md={3}>
      <Panel collapsible defaultExpanded header='Select a Column'>
        <DefaultListGroup
          iconClick={action('clicked')}
          itemComponent={FieldButton}
          action={action('clicked')}
          className={'ColumnSelector-list-group'}
          items={[{'label': 'col1', 'type': 'text'}, {'type': 'number', 'label': 'col2'}, {'type': 'boolean', 'label': 'col3'}, {'type': 'date', label: 'col4'}]} />
        <HideShowButton itemProps={{'isSelected': true, 'actionFxn': action('clicked')}} />
      </Panel>
    </Col>
  ))
storiesOf('Icon', module)
  .add('x icon', () => (
    <Icon label={'glyphicon glyphicon-remove'} className={'remove'} onClickFxn={action()} actionFxnParams={'click'} />
  ))

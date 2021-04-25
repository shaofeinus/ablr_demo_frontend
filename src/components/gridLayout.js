import React from 'react'
import {Row, Col} from 'antd'

class GridLayout extends React.Component {
  /**
   * A layout that has a label column at the left and multiple value columns flushed to the right.
   */

  renderRow(key, value, right) {
    return (
      <div
        key={key}
        style={{
          paddingBottom: '12px',
          textAlign: right ? 'right' : 'left'
        }}
      >
        {value}
      </div>
    )
  }

  render() {
    const {
      labels,
      // A 2D array of values where each inner array is a column of values
      valuesList,
    } = this.props
    return (
      <Row
        gutter={48}
        style={{flexWrap:'nowrap'}}
      >
        {/* Labels column */}
        <Col flex={'auto'}>
          {
            labels.map((label, i) => this.renderRow(i, label))
          }
        </Col>
        {/* Values columns */}
        {
          valuesList.map((values) =>
            <Col>
              {
                values.map((value, i) => this.renderRow(i, value, true))
              }
            </Col>
          )
        }
      </Row>
    )
  }
}

export default GridLayout
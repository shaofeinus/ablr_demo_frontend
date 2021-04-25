import React from 'react'
import {Link} from 'react-router-dom'
import {Space} from 'antd'
import {FrownOutlined} from '@ant-design/icons'
import {Title, Content} from '../../components/typography'


class Error extends React.Component {
  render() {
    const {message} = this.props
    return (
      <div style={{
        paddingTop: '64px',
        textAlign: 'center'
      }}>
        <p>
          <Space align={'baseline'}>
            <Title>
              Oops...
            </Title>
            <FrownOutlined/>
          </Space>
        </p>
        <p>
          <Content>
            {message || 'we faced an unknown error'}
          </Content>
        </p>
        <p>
          <Link to={'/'}>
            Back to home
          </Link>
        </p>
      </div>
    )
  }
}

export default Error
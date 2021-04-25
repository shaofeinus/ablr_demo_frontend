import React from 'react'
import {Space} from 'antd'
import {SmileOutlined} from '@ant-design/icons'
import {Title} from '../../components/typography'
import {Link} from 'react-router-dom'

class Success extends React.Component {
  render() {
    return (
      <div style={{
        paddingTop: '64px',
        textAlign: 'center'
      }}>
        <p>
          <Space align={'baseline'}>
            <Title>
              You are all set!
            </Title>
            <SmileOutlined/>
          </Space>
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

export default Success
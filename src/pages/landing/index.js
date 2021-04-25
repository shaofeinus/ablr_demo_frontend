import React from 'react'
import {withRouter} from 'react-router'
import {Button} from 'antd'
import {Title} from '../../components/typography'
import {getMyInfoAuthoriseUrl} from '../../api'
import {saveState} from '../../storage'
import {randomKey} from '../../utils'

class Landing extends React.Component {

  retrieveMyInfo() {
    const {
      setErrorMessage,
      history
    } = this.props
    const state = randomKey()
    saveState(state)
    getMyInfoAuthoriseUrl(state)
      .then((authoriseUrl) => window.location.replace(authoriseUrl))
      .catch((error) => setErrorMessage(
        typeof error === 'string' ? error : '',
        () => history.push('/error')
      ))
  }

  render() {
    return (
      <div style={{
        paddingTop: '64px',
        textAlign: 'center'
      }}>
        <Title>
          ablr
        </Title>
        <Button onClick={() => this.retrieveMyInfo()}>
          Retrieve MyInfo with Singpass
        </Button>
      </div>
    )
  }
}

export default withRouter(Landing)
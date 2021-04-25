import React from 'react'
import {withRouter} from 'react-router'
import {Button, Space, Tabs} from 'antd'
import {ArrowRightOutlined, ArrowLeftOutlined, CheckOutlined} from '@ant-design/icons'
import ContactSection from './contactSection'
import IncomeSection from './incomeSection'
import PersonalSection from './personalSection'
import OtherInfoSection from './otherInfoSection'

const TAB_KEYS = {
  CONTACT: 'CONTACT',
  PERSONAL: 'PERSONAL',
  INCOME: 'INCOME',
  OTHERS: 'OTHERS'
}

class MyInfoSignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tabKey: TAB_KEYS.CONTACT,
      // Form data structure, initialized here for reference
      contactData: {
        mobile: '',
        email: '',  // Editable
        block: '',
        street: '',
        building: '',
        floorUnit: '',
        postalCode: '',
        housingType: '',
        // Editing data
        mobileErrorMessage: '',
        emailErrorMessage: '',
        isValid: false
      },
      personalData: {
        nric: '',
        name: '',
        sex: '',
        dateOfBirth: null,
        countryOfBirth: '',
        residentialStatus: '',
        nationality: '',
        race: '',
        isValid: false
      },
      incomeData: {
        // Up to 2 years
        noaHistory: [{
          year: '',
          employment: 0,
          trade: 0,
          interest: 0,
          rent: 0,
          total: 0,
          taxClearance: '',
        }],
        ownsPrivateProperty: false,
        cpfBalance: {
          oa: 0,
          sa: 0,
          ma: 0
        },
        // Up to 3 years
        cpfContributionHistory: [{
          month: null,
          paidOn: null,
          amount: 0,
          employer: ''
        }],
        isValid: false
      },
      othersData: {
        maritalStatus: '',
        marriedName: '',
        educationLevel: '',
        employmentSector: '',
        isValid: false
      }
    }
  }

  componentDidMount() {
    const {
      data,
      history
    } = this.props
    if (data) {
      this.updateStateFromProps()
    } else {
      // Redirect to home if there is no data
      history.push('/')
    }
  }

  updateStateFromProps() {
    const {data} = this.props
    const {
      contactData,
      personalData,
      incomeData
    } = this.state
    const {
      mobile,
      email,
      block,
      street,
      building,
      floorUnit,
      postalCode,
      housingType,
      nric,
      name,
      sex,
      dateOfBirth,
      countryOfBirth,
      residentialStatus,
      nationality,
      race,
      noaHistory,
      ownsPrivateProperty,
      cpfBalance,
      cpfContributionHistory,
      maritalStatus,
      marriedName,
      educationLevel,
      employmentSector
    } = data
    const newContactData = this.validateContactData({
      ...contactData,
      mobile,
      email,
      block,
      street,
      building,
      floorUnit,
      postalCode,
      housingType
    })
    const newPersonalData = this.validatePersonalData({
      ...personalData,
      nric,
      name,
      sex,
      dateOfBirth,
      countryOfBirth,
      residentialStatus,
      nationality,
      race
    })
    const newIncomeData = this.validateIncomeData({
      ...incomeData,
      noaHistory,
      ownsPrivateProperty,
      cpfBalance,
      cpfContributionHistory
    })
    const newOthersData = this.validateOthersData({
      ...incomeData,
      maritalStatus,
      marriedName,
      educationLevel,
      employmentSector
    })
    this.setState({
      contactData: newContactData,
      personalData: newPersonalData,
      incomeData: newIncomeData,
      othersData: newOthersData
    })
  }

  validateMobile(mobile) {
    const re = /^\d{8}$/
    return  re.test(String(mobile))
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,:\s@']+(\.[^<>()[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  validateContactData(contactData) {
    const {
      mobile,
      email
    } = contactData
    contactData.mobileErrorMessage = !this.validateMobile(mobile) ? 'Oops, mobile number seems to be invalid, please enter a valid mobile number.' : ''
    contactData.emailErrorMessage = !this.validateEmail(email) ? 'Oops, email seems to be invalid, please enter a valid email.' : ''
    const {
      mobileErrorMessage,
      emailErrorMessage
    } = contactData
    contactData.isValid = !emailErrorMessage && !mobileErrorMessage
    return contactData
  }

  validatePersonalData(personalData) {
    return {
      ...personalData,
      isValid: true
    }
  }

  validateIncomeData(incomeData) {
    return {
      ...incomeData,
      isValid: true
    }
  }

  validateOthersData(othersData) {
    return {
      ...othersData,
      isValid: true
    }
  }

  goToNextTab(currTabKey, prev = false) {
    const getNextTabKey = () => {
      switch (currTabKey) {
        case TAB_KEYS.CONTACT:
          return prev ? TAB_KEYS.CONTACT : TAB_KEYS.PERSONAL
        case TAB_KEYS.PERSONAL:
          return prev ? TAB_KEYS.CONTACT : TAB_KEYS.INCOME
        case TAB_KEYS.INCOME:
          return prev ? TAB_KEYS.PERSONAL : TAB_KEYS.OTHERS
        case TAB_KEYS.OTHERS:
          return prev ? TAB_KEYS.INCOME : TAB_KEYS.OTHERS
        default:
          return prev ? TAB_KEYS.CONTACT : TAB_KEYS.CONTACT
      }
    }
    this.setState({
      tabKey: getNextTabKey()
    })
  }

  setContactData(newContactData) {
    const {contactData} = this.state
    this.setState({
      contactData: this.validateContactData({
        ...contactData,
        ...newContactData
      })
    })
  }

  isFormValid(tabKey) {
    const {
      contactData,
      personalData,
      incomeData,
      othersData
    } = this.state
    switch (tabKey) {
      case TAB_KEYS.CONTACT:
        return contactData.isValid
      case TAB_KEYS.PERSONAL:
        return personalData.isValid
      case TAB_KEYS.INCOME:
        return incomeData.isValid
      case TAB_KEYS.OTHERS:
        return othersData.isValid
      default:
        return false
    }
  }

  isAllValid() {
    return !Object.entries(TAB_KEYS)
      .map(([key, value]) => this.isFormValid(value))
      .find((isFormValid) => !isFormValid)
  }

  renderTabs() {
    const {
      tabKey,
      contactData,
      personalData,
      incomeData,
      othersData
    } = this.state
    return (
      <Tabs
        centered
        size={'large'}
        activeKey={tabKey}
        defaultActiveKey={TAB_KEYS.CONTACT}
      >
        <Tabs.TabPane
          tab={'Contact Info'}
          key={TAB_KEYS.CONTACT}
        >
          <ContactSection
            data={contactData}
            onChangeMobile={(mobile) => this.setContactData({mobile: mobile})}
            onChangeEmail={(email) => this.setContactData({email: email})}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={'Personal Info'}
          key={TAB_KEYS.PERSONAL}
        >
          <PersonalSection data={personalData}/>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={'Income Info'}
          key={TAB_KEYS.INCOME}
        >
          <IncomeSection data={incomeData}/>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={'Other Info'}
          key={TAB_KEYS.OTHERS}
        >
          <OtherInfoSection data={othersData}/>
        </Tabs.TabPane>
      </Tabs>
    )
  }

  renderButtons() {
    const {
      history
    } = this.props
    const {
      tabKey
    } = this.state
    return (
      <Space>
        {
          // Back
          tabKey !== TAB_KEYS.CONTACT &&
          <Button onClick={() => this.goToNextTab(tabKey, true)}>
            <Space>
              <ArrowLeftOutlined/>
              <span>Back</span>
            </Space>
          </Button>
        }
        {
          tabKey === TAB_KEYS.OTHERS ?
            // Submit
            <Button
              disabled={!this.isAllValid()}
              onClick={() => history.push('/success')}
            >
              <Space>
                <span>Submit</span>
                <CheckOutlined/>
              </Space>
            </Button> :
            // Next
            <Button
              disabled={!this.isFormValid(tabKey)}
              onClick={() => this.goToNextTab(tabKey)}
            >
              <Space>
                <span>Continue</span>
                <ArrowRightOutlined/>
              </Space>
            </Button>
        }
      </Space>

    )
  }

  render() {
    return (
      <div>
        {
          this.renderTabs()
        }
        <div style={{
          textAlign: 'center'
        }}>
          {
            this.renderButtons()
          }
        </div>

      </div>
    )
  }
}

export default withRouter(MyInfoSignUp)
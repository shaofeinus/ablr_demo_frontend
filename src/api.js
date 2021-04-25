import axios from 'axios'
import moment from 'moment'

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT || 'http://localhost:8000'
axios.interceptors.response.use(
  (response) => response,
  ({response}) => {
    let message = 'unexpected error'
    if (response) {
      if (response.status === 500) {
        message = response.data.message
      }
    }
    return Promise.reject(message)
  }
)

function getMyInfoAuthoriseUrl(state) {
  return axios
    .get(
      '/api/myinfo/authorise-url',
      {params: {state: state}}
    )
    .then(({data}) => data.authorise_url)
}

function fetchPersonalData(code) {
  const v = (dataItem, fieldName = 'value', defaultValue = '') =>
    dataItem.unavailable || (!dataItem[fieldName] && dataItem[fieldName] !== 0) ?
      defaultValue :
      dataItem[fieldName]

  const nestedV = (dataItem, nestedFieldName, fieldName = 'value', defaultValue = '') =>
    Array.isArray(dataItem[nestedFieldName]) ?
      dataItem[nestedFieldName] :
      dataItem.unavailable || (!dataItem[nestedFieldName] && dataItem[nestedFieldName] !== 0) ?
        defaultValue :
        v(dataItem[nestedFieldName], fieldName, defaultValue)


  return axios
    .get(
      '/api/myinfo/personal-data',
      {params: {code: code}}
    )
    // Convert to string data
    .then(({data}) => ({
      mobile: nestedV(data.mobileno, 'nbr'),
      email: v(data.email),
      block: nestedV(data.regadd, 'block'),
      street: nestedV(data.regadd, 'street'),
      building: nestedV(data.regadd, 'building'),
      floorUnit: `#${nestedV(data.regadd, 'floor')}-${nestedV(data.regadd, 'unit')}`,
      postalCode: nestedV(data.regadd, 'postal'),
      housingType: v(
        data.housingtype,
        'desc',
        // Use HDB type if housing type is not available
        v(data.hdbtype, 'desc'),
      ),
      nric: v(data.uinfin),
      name: v(data.name),
      sex: v(data.sex, 'desc'),
      dateOfBirth: v(data.dob),
      countryOfBirth: v(data.birthcountry, 'desc'),
      residentialStatus: v(data.residentialstatus, 'desc'),
      nationality: v(data.nationality, 'desc'),
      race: v(data.race, 'desc'),
      noaHistory: nestedV(data.noahistory, 'noas', 'value', [])
        .map((noa) => ({
          year: v(noa.yearofassessment),
          employment: v(noa.employment),
          trade: v(noa.trade),
          interest: v(noa.interest),
          rent: v(noa.rent),
          total: v(noa.amount),
          taxClearance: v(noa.taxclearance),
        })),
      ownsPrivateProperty: v(data.ownerprivate),
      cpfBalance: {
        oa: nestedV(data.cpfbalances, 'oa'),
        sa: nestedV(data.cpfbalances, 'sa'),
        ma: nestedV(data.cpfbalances, 'ma')
      },
      cpfContributionHistory: nestedV(data.cpfcontributions, 'history', 'value', [])
        .map((history) => ({
          month: v(history.month),
          paidOn: v(history.date),
          amount: v(history.amount),
          employer: v(history.employer)
        })),
      maritalStatus: v(data.marital, 'desc'),
      marriedName: v(data.marriedname),
      educationLevel: v(data.edulevel, 'desc'),
      employmentSector: v(data.employmentsector)
    }))
    // Further process data if needed
    .then((data) => ({
      ...data,
      floorUnit: data.floorUnit === '#-' ? '' : data.floorUnit,
      dateOfBirth: data.dateOfBirth ? moment(data.dateOfBirth, 'YYYY-MM-DD') : null,
      cpfContributionHistory: data.cpfContributionHistory
        .map((history) => ({
          ...history,
          month: history.month ? moment(history.month, 'YYYY-MM') : null,
          paidOn: history.paidOn ? moment(history.paidOn, 'YYYY-MM-DD') : null,
        }))
    }))
}

export {getMyInfoAuthoriseUrl, fetchPersonalData}

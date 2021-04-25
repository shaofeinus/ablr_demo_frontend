import React from 'react'
import {Content, Title} from '../../components/typography'
import SectionLayout from '../../components/sectionLayout'
import GridLayout from '../../components/gridLayout'
import {Table} from 'antd'
import BlockField from '../../components/blockField'
import {formatNumber} from '../../utils'

class IncomeSection extends React.Component {

  renderNOAHistoryData(noaHistory) {
    // Show last 2 years
    noaHistory = noaHistory.slice(0, 2)
    return (
      noaHistory.length === 0 ?
        <Content>
          No data
        </Content> :
        <GridLayout
          labels={[
            <Content bold>
              Year of Assessment
            </Content>,
            <Content>
              Employment
            </Content>,
            <Content>
              Trade
            </Content>,
            <Content>
              Interest
            </Content>,
            <Content>
              Rent
            </Content>,
            <Content bold>
              Total Income
            </Content>,
            <Content bold>
              Tax Clearance
            </Content>,
          ]}
          valuesList={noaHistory.map((noa) => ([
            <Content bold>
              {noa.year}
            </Content>,
            <Content>
              {formatNumber(noa.employment)}
            </Content>,
            <Content>
              {formatNumber(noa.trade)}
            </Content>,
            <Content>
              {formatNumber(noa.interest)}
            </Content>,
            <Content>
              {formatNumber(noa.rent)}
            </Content>,
            <Content bold>
              {formatNumber(noa.total)}
            </Content>,
            <Content bold>
              {noa.taxClearance}
            </Content>
          ]))}
        />
    )
  }

  renderCPFBalanceData(cpfBalance) {
    return (
      <GridLayout
        labels={[
          <Content>
            Ordinary Account (OA) (S$)
          </Content>,
          <Content>
            Special Account (SA) (S$)
          </Content>,
          <Content>
            Medisave Account (MA) (S$)
          </Content>
        ]}
        valuesList={[[
          <Content bold>
            {formatNumber(cpfBalance.oa)}
          </Content>,
          <Content bold>
            {formatNumber(cpfBalance.sa)}
          </Content>,
          <Content bold>
            {formatNumber(cpfBalance.ma)}
          </Content>,
        ]]}
      />
    )
  }

  renderCPFContributionHistoryData(cpfContributionHistory) {
    // Show last 3 contributions
    cpfContributionHistory = cpfContributionHistory.slice(cpfContributionHistory.length - 3)
    return (
      <Table
        bordered={false}
        pagination={false}
        size={'small'}
        columns={[
          {
            align: 'right',
            title: 'For Month',
            dataIndex: 'forMonth',
            key: 'forMonth',
          },
          {
            align: 'right',
            title: 'Paid On',
            dataIndex: 'paidOn',
            key: 'paidOn',
          },
          {
            align: 'right',
            title: 'Amount (S$)',
            dataIndex: 'amount',
            key: 'amount',
          },
          {
            align: 'right',
            title: 'Employer',
            dataIndex: 'employer',
            key: 'employer',
          },
        ]}
        dataSource={cpfContributionHistory.map((history, i) => ({
          key: i,
          forMonth: history.month ? history.month.format('MMM YYYY') : '',
          paidOn: history.paidOn ? history.paidOn.format('DD MMM YYYY') : '',
          amount: formatNumber(history.amount),
          employer: history.employer
        }))}
      />
    )
  }

  render() {
    const {data} = this.props
    const {
      noaHistory,
      ownsPrivateProperty,
      cpfBalance,
      cpfContributionHistory
    } = data
    return (
      <div>
        <Title>
          Notice of Assessment (History)
        </Title>
        <SectionLayout>
          {
            this.renderNOAHistoryData(noaHistory)
          }
        </SectionLayout>
        <Title>
          Other Income Information
        </Title>
        <SectionLayout>
          <BlockField
            label={'Ownership of Private Residential Property'}
            value={ownsPrivateProperty ? 'Yes' : 'No'}
            isValid
          />
        </SectionLayout>
        <Title>
          CPF Account Balance
        </Title>
        <SectionLayout>
          {
            this.renderCPFBalanceData(cpfBalance)
          }
        </SectionLayout>
        <Title>
          CPF Contribution History
        </Title>
        <SectionLayout>
          {
            this.renderCPFContributionHistoryData(cpfContributionHistory)
          }
        </SectionLayout>
      </div>
    )
  }
}

export default IncomeSection
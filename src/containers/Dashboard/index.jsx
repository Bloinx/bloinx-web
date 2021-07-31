import React, { useState } from 'react';
import { Table, Button, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Title } = Typography;

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const [contract, setContract] = useState(null);

  const dataSource = [
    {
      key: '2',
      name: 'John',
      address: '0x1234...rtfd',
      startDate: '01/01/2020',
      participants: '8',
      liquidity: '5,000.00 MXN',
      status: 'Pendiente',
    },
    {
      key: 0,
      name: 'Tanda de la chamba',
      address: '0x1234...rtfd',
      startDate: '01/06/2021',
      participants: '6',
      liquidity: '5,000.00 MXN',
      status: 'Terminada',
    },
    {
      key: 0,
      name: 'Tanda de la chamba',
      address: '0x1234...rtfd',
      startDate: '01/06/2021',
      participants: '6',
      liquidity: '5,000.00 MXN',
      status: <Link to="/BatchDetails/key"><Button>Activa</Button></Link>,
    },
  ];

  const columns = [
    {
      title: <FormattedMessage id="dashboardPage.table.name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.address" />,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.startDate" />,
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.participants" />,
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.liquidity" />,
      dataIndex: 'liquidity',
      key: 'liquidity',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.status" />,
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <>
      <Title level={4}><FormattedMessage id="dashboardPage.title" /></Title>
      <Table dataSource={dataSource} columns={columns} size="small" pagination={{ simple: true }} />
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('><><><', state);
  return state;
};
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

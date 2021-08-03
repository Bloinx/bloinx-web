/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RoundCard from './RoundCard';
import RoundCardNew from './RoundCardNew';
import styles from './index.module.scss';

const { Title } = Typography;

function Dashboard({ methods, currentAddress }) {
  const handleRegisterMe = async () => {
    await methods.registerUser(currentAddress).send();
  };

  // const dataSource = [
  //   {
  //     key: '2',
  //     name: 'John',
  //     address: '0x1234...rtfd',
  //     startDate: '01/01/2020',
  //     participants: '8',
  //     liquidity: '5,000.00 MXN',
  //     status: 'Pendiente',
  //   },
  //   {
  //     key: 0,
  //     name: 'Tanda de la chamba',
  //     address: '0x1234...rtfd',
  //     startDate: '01/06/2021',
  //     participants: '6',
  //     liquidity: '5,000.00 MXN',
  //     status: 'Terminada',
  //   },
  //   {
  //     key: 0,
  //     name: 'Tanda de la chamba',
  //     address: '0x1234...rtfd',
  //     startDate: '01/06/2021',
  //     participants: '6',
  //     liquidity: '5,000.00 MXN',
  //     status: <Link to="/BatchDetails/key"><Button>Activa</Button></Link>,
  //   },
  // ];

  // const columns = [
  //   {
  //     title: <FormattedMessage id="dashboardPage.table.name" />,
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: <FormattedMessage id="dashboardPage.table.address" />,
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  //   {
  //     title: <FormattedMessage id="dashboardPage.table.startDate" />,
  //     dataIndex: 'startDate',
  //     key: 'startDate',
  //   },
  //   {
  //     title: <FormattedMessage id="dashboardPage.table.participants" />,
  //     dataIndex: 'participants',
  //     key: 'participants',
  //   },
  //   {
  //     title: <FormattedMessage id="dashboardPage.table.liquidity" />,
  //     dataIndex: 'liquidity',
  //     key: 'liquidity',
  //   },
  //   {
  //     title: <FormattedMessage id="dashboardPage.table.status" />,
  //     dataIndex: 'status',
  //     key: 'status',
  //   },
  // ];

  return (
    <>
      <Title level={4} className={styles.dashboardTitle}><FormattedMessage id="dashboardPage.title" /></Title>
      <div className={styles.RoundCards}>
        <RoundCard />
        <RoundCardNew onClick={handleRegisterMe} />
      </div>
      {/* <Table dataSource={dataSource} columns={columns} size="small" pagination={{ simple: true }} /> */}
    </>
  );
}

Dashboard.propTypes = {
  methods: PropTypes.instanceOf(Object).isRequired,
  currentAddress: PropTypes.string,
};

Dashboard.defaultProps = {
  currentAddress: null,
};

const mapStateToProps = (state) => {
  const methods = state?.main?.contract?.methods;
  const currentAddress = state?.main?.currentAddress;
  return {
    methods,
    currentAddress,
  };
};
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

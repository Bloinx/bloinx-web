/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Typography,
  Row,
  Col,
  Button,
  notification,
  Table,
  PageHeader,
} from 'antd';
import { RightOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Title } = Typography;

function BatchDetails({ main }) {
  const [api, contextHolder] = notification.useNotification();
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [adminAccount, setAdminAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { contract, currentAddress } = main;
  const isAdmin = adminAccount === currentAddress;

  const getUsersList = (times) => new Promise((resolve) => {
    const tempUserList = [];
    for (let index = 1; index <= times; index += 1) {
      tempUserList.push(contract.methods.addressOrderList(index - 1));
    }
    Promise.all(
      tempUserList.map(async (userBatch) => {
        let user;
        try {
          const userKey = await userBatch.call();
          user = {
            key: userKey,
            status: true,
          };
        } catch (err) {
          user = {
            key: 'Disponible',
            status: false,
          };
        }
        return user;
      }),
    ).then((users) => {
      resolve(users);
    });
  });

  useEffect(() => {
    if (contract) {
      (async () => {
        setLoading(true);
        const admon = await contract.methods.admin().call();
        const groupSize = await contract.methods.groupSize().call();
        getUsersList(groupSize).then((userList) => {
          setAdminAccount(admon);
          setRegisteredUsers(userList);
          setLoading(false);
        });
      })();
    }
  }, [main]);

  const handleStartRound = async () => {
    if (!isAdmin) {
      await contract.methods.startRound().send({ from: currentAddress, to: contract._address })
        .once('receipt', async (receipt) => {
          console.log('seccess... ', receipt);
          api.success({
            message: 'Tanda incializada',
            description: 'La tanda a sido inicializada',
            placement: 'topLeft',
          });
        })
        .on('error', async () => {
          api.error({
            message: 'Error al inicalizar',
            description: 'No es posible realizar esta accion',
            placement: 'topLeft',
          });
        });
    }
  };

  const removeUser = async () => {
    if (!isAdmin) {
      await contract.methods.removeUser(1).send({ from: currentAddress, to: contract._address })
        .once('receipt', async (receipt) => {
          console.log('seccess... ', receipt);
          api.success({
            message: 'Error al eliminar',
            description: 'No es posible realizar esta accion',
            placement: 'topRight',
          });
        })
        .on('error', async () => {
          api.error({
            message: 'Error al eliminar',
            description: 'No es posible realizar esta accion',
            placement: 'topRight',
          });
        });
    }
  };

  const columns = [
    {
      title: 'Contrato',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Opciones',
      dataIndex: 'status',
      key: 'status',
      render: (key, status) => isAdmin && status && (
        <Button onClick={() => removeUser(key)}>Eliminar</Button>
      ),
    },
  ];

  return (
    <div className={styles.BranchDetails}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Tanda de la chamba"
        extra={[
          <Button key="3">Operation</Button>,
        ]}
      />
      <div className={styles.BranchDetailsContent}>
        <Row>
          <Col span={24}>
            asdasdasdaas d asd as d as d asd as d as d asd asd asd asdas dasdasd d sf adsvs
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            Round 2
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={handleStartRound}>Iniciar Tanda</Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            Payed
          </Col>
          <Col span={10}>
            asd
          </Col>
          <Col span={2}>
            <RightOutlined />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            Payed
          </Col>
          <Col span={10}>
            asd
          </Col>
          <Col span={2}>
            <RightOutlined />
          </Col>
        </Row>
      </div>
      {contextHolder}

      {/* {registeredUsers.length > 0 && (
        <Button onClick={handleStartRound}>Iniciar Tanda</Button>
      )} */}
      <Table
        dataSource={registeredUsers}
        columns={columns}
        size="small"
        loading={loading}
        pagination={null}
      />
    </div>
  );
}

const mapStateToProps = (state) => state;

BatchDetails.propTypes = {
  main: PropTypes.objectOf({
    contract: PropTypes.instanceOf(Object),
    currentAddress: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(memo(BatchDetails));

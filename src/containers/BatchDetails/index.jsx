/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import { RightOutlined, EllipsisOutlined } from '@ant-design/icons';

import APIGetContractDetail from '../../api/getContractDetail';
import Instance from '../../utils/contractInstance';
import ParticipantList from './ParticipantList';
import ParticipantDates from './PaymentsDates';

import styles from './index.module.scss';

const { Title } = Typography;

function BatchDetails({ main }) {
  const history = useHistory();
  const { contract: { methods } } = Instance();

  const [detail, setDetail] = useState({});
  const [openParticipantModal, setOpenParticipantModal] = useState(false);
  const [openPaymentsDates, setOpenPaymentsDates] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [adminAccount, setAdminAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { contract, currentAddress } = main;
  const isAdmin = adminAccount === currentAddress;

  const getUsersList = (times) => new Promise((resolve) => {
    // const tempUserList = [];
    // for (let index = 1; index <= times; index += 1) {
    //   tempUserList.push(contract.methods.addressOrderList(index - 1));
    // }
    // Promise.all(
    //   tempUserList.map(async (userBatch) => {
    //     let user;
    //     try {
    //       const userKey = await userBatch.call();
    //       user = {
    //         key: userKey,
    //         status: true,
    //       };
    //     } catch (err) {
    //       user = {
    //         key: 'Disponible',
    //         status: false,
    //       };
    //     }
    //     return user;
    //   }),
    // ).then((users) => {
    //   resolve(users);
    // });
  });

  useEffect(() => {
    // if (contract) {
    //   (async () => {
    //     setLoading(true);
    //     const admon = await contract.methods.admin().call();
    //     const groupSize = await contract.methods.groupSize().call();
    //     getUsersList(groupSize).then((userList) => {
    //       setAdminAccount(admon);
    //       setRegisteredUsers(userList);
    //       setLoading(false);
    //     });
    //   })();
    // }
  }, [main]);

  const handleStartRound = async () => {
    // if (!isAdmin) {
    //   await contract.methods.startRound().send({ from: currentAddress, to: contract._address })
    //     .once('receipt', async (receipt) => {
    //       console.log('seccess... ', receipt);
    //       api.success({
    //         message: 'Tanda incializada',
    //         description: 'La tanda a sido inicializada',
    //         placement: 'topLeft',
    //       });
    //     })
    //     .on('error', async () => {
    //       api.error({
    //         message: 'Error al inicalizar',
    //         description: 'No es posible realizar esta accion',
    //         placement: 'topLeft',
    //       });
    //     });
    // }
  };

  const removeUser = async () => {
    // if (!isAdmin) {
    //   await contract.methods.removeUser(1).send({ from: currentAddress, to: contract._address })
    //     .once('receipt', async (receipt) => {
    //       console.log('seccess... ', receipt);
    //       api.success({
    //         message: 'Error al eliminar',
    //         description: 'No es posible realizar esta accion',
    //         placement: 'topRight',
    //       });
    //     })
    //     .on('error', async () => {
    //       api.error({
    //         message: 'Error al eliminar',
    //         description: 'No es posible realizar esta accion',
    //         placement: 'topRight',
    //       });
    //     });
    // }
  };

  const columns = [
    // {
    //   title: 'Contrato',
    //   dataIndex: 'key',
    //   key: 'key',
    // },
    // {
    //   title: 'Opciones',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (key, status) => isAdmin && status && (
    //     <Button onClick={() => removeUser(key)}>Eliminar</Button>
    //   ),
    // },
  ];
  const handleToggleParticipantsModal = () => setOpenParticipantModal(!openParticipantModal);
  const handleTogglePaymentsModal = () => setOpenPaymentsDates(!openPaymentsDates);

  const getContractDetail = async () => {
    const contractDetail = await APIGetContractDetail(methods);
    setDetail(contractDetail);
  };

  useEffect(() => {
    getContractDetail();
  }, []);

  console.log(detail);
  console.log(methods);

  return (
    <div className={styles.BranchDetails}>
      <PageHeader
        className={styles.BranchDetailsTitle}
        onBack={() => history.push('/dashboard')}
        title="Tanda de la chamba"
        extra={[
          <EllipsisOutlined style={{ color: '#FFF', fontSize: '30px' }} />,
        ]}
      />
      <div className={styles.BranchDetailsContent}>
        <div className={styles.BranchDetailsContentLine}>
          <Title level={4}>
            Round
            {' '}
            {detail.turn}
          </Title>
          {/* <Button type="primary" onClick={handleStartRound}>Iniciar Tanda</Button> */}
        </div>
        <div className={styles.BranchDetailsContentLine}>
          <div>Pagado</div>
          <div>
            {`${detail.totalSaveAmount} de ${detail.groupSize} participantes`}
            <RightOutlined
              onClick={handleToggleParticipantsModal}
              style={{
                color: '#FFF',
                fontSize: '15px',
                marginLeft: '10px',
              }}
            />
          </div>
        </div>
        <div className={styles.BranchDetailsContentLine}>
          <div>Pagos atrasados</div>
          <div>
            {detail.groupSize}
            <RightOutlined
              onClick={handleTogglePaymentsModal}
              style={{
                color: '#FFF',
                fontSize: '15px',
                marginLeft: '10px',
              }}
            />
          </div>
        </div>
      </div>
      <ParticipantList
        isOpen={openParticipantModal}
        onAccept={handleToggleParticipantsModal}
      />
      <ParticipantDates
        isOpen={openPaymentsDates}
        onCancel={handleTogglePaymentsModal}
      />
      {contextHolder}

      {/* {registeredUsers.length > 0 && (
        <Button onClick={handleStartRound}>Iniciar Tanda</Button>
      )} */}
      {/* <Table
        dataSource={registeredUsers}
        columns={columns}
        size="small"
        loading={loading}
        pagination={null}
      /> */}
    </div>
  );
}

const mapStateToProps = (state) => state;

BatchDetails.propTypes = {
  main: PropTypes.objectOf({
    currentAddress: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(memo(BatchDetails));

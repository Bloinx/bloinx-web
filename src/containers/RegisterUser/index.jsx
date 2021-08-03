/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import web3 from 'web3';
import PropTypes from 'prop-types';
import {
  Typography,
  Row,
  Col,
  Button,
  Space,
  PageHeader,
} from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getWeb3 } from '../../utils/web3';
import InputSelect from '../../components/InputSelect';
import InputLabel from '../../components/InputLabel';

import styles from './index.module.scss';

const { Title } = Typography;

const turns = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
];

function RegisterUser({ methods, currentAddress }) {
  console.log(methods);
  const [turnSelected, setTurnSelected] = useState('1');
  // const [userAccount, setUserAccount] = useState('1');
  // const [pagotardio, setPagoTardio] = useState({
  //   checkedA: true,
  // });
  // const [status, setStatus] = useState(0);

  useEffect(() => {
    if (methods) {
      (async () => {
        const stage = await methods.stage().call();
        console.log('-->>> ', stage);
        // setStatus(stage);
      })();
    }
  }, []);

  const handleSelectTurn = ({ target }) => {
    setTurnSelected(target.value);
  };

  const registerUser = async () => {
    await methods
      .registerUser(turnSelected)
      .send({
        from: currentAddress,
        value: getWeb3().utils.toWei('1', 'ether'),
      })
      .once('receipt', async (receipt) => console.log('success', receipt))
      .on('error', async (error) => console.log('Error: ', error));
  };

  return (
    <div className={styles.RegisterUser}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Registarme"
      />
      <div className={styles.RegisterUserContent}>
        <InputLabel
          label="Mi dirección"
          value={currentAddress}
        />
        <InputSelect
          label="Selecciona un turno disponible"
          options={turns}
          value={turnSelected}
          onChange={handleSelectTurn}
        />
        <Button
          type="primary"
          onClick={registerUser}
          disabled={!currentAddress || !turnSelected}
        >
          Registrar
        </Button>
      </div>
    </div>
  );
}

RegisterUser.propTypes = {
  methods: PropTypes.instanceOf(Object).isRequired,
  currentAddress: PropTypes.string,
};

RegisterUser.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);

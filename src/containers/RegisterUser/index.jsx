/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
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
import BigNumber from 'bignumber.js';

import InputSelect from '../../components/InputSelect';
import InputLabel from '../../components/InputLabel';
import SavingGroups from '../../abis/SavingGroups.json';

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
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  // const [userAccount, setUserAccount] = useState('1');
  // const [pagotardio, setPagoTardio] = useState({
  //   checkedA: true,
  // });
  // const [status, setStatus] = useState(0);

  useEffect(() => {
    if (window.web3) {
      const web3Provider = new Web3(window.web3.currentProvider);
      setWeb3(web3Provider);
      const instance = new web3Provider.eth.Contract(SavingGroups, '0xd5a1F01498c4f528E74232Fc530D67F83C05cc99');
      setContract(instance);
    }
    if (methods) {
      (async () => {
        const stage = await methods.stage().call();
        console.log('-->>> stage: ', stage);
        // setStatus(stage);
      })();
    }
  }, []);

  const handleSelectTurn = ({ target }) => {
    setTurnSelected(target.value);
  };

  const register = async () => {
    // console.log(turnSelected);
    const amount = '1';
    if (contract) {
      await contract.methods
        .registerUser(2)
        .send({
          from: currentAddress,
          value: web3.utils.toWei(amount, 'ether'), // new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
        })
        .once('receipt', async (receipt) => console.log('success', receipt))
        .on('error', async (error) => console.log('Error: ', error));
    }
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
          onClick={register}
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
  console.log('state ', state);
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

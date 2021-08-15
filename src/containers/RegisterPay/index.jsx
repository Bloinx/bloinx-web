/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Row,
  Col,
  Button,
  Space,
} from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getWeb3 } from '../../utils/web3';
import InputSelect from '../../components/InputSelect';
import InputSwitch from '../../components/InputSwitch';

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
    label: '5',
  },
];

function RegisterPay({ main }) {
  const { contract, currentAddress } = main;
  // eslint-disable-next-line no-unused-vars
  const [turn, setTurn] = useState('1');
  // eslint-disable-next-line no-unused-vars
  const [userAccount, setUserAccount] = useState('1');
  // eslint-disable-next-line no-unused-vars
  const [pagotardio, setPagoTardio] = useState({
    checkedA: true,
  });
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (contract) {
      (async () => {
        const stage = await contract.methods.stage().call();
        setStatus(stage);
      })();
    }
  }, []);

  const registerUser = async (userTurn) => {
    await contract.methods
      .registerUser(userTurn)
      .send({
        from: currentAddress,
        value: getWeb3().utils.toWei('1', 'ether'),
      })
      .once('receipt', async (receipt) => receipt)
      .on('error', async (error) => error);
  };

  const payTurn = async () => {
    await contract.methods.payTurn().send({
      from: currentAddress,
      value: getWeb3().utils.toWei('1', 'ether'),
    })
      .once('receipt', async (receipt) => receipt)
      .on('error', async (error) => error);
  };

  const payLateTurn = async () => {
    await contract.methods.payLateTurn().send({
      from: currentAddress,
      value: getWeb3().utils.toWei('1', 'ether'),
    })
      .once('receipt', async (receipt) => receipt)
      .on('error', async (error) => error);
  };

  // eslint-disable-next-line no-unused-vars
  const handlePass = (event) => {
    // setTurn(event.target.value);
  };
  // eslint-disable-next-line no-unused-vars
  const handleSwitch = (event) => {
    // setPagoTardio({ ...pagotardio, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Space direction="vertical" size={40}>
        <Row>
          <Col span={12}>
            <Title level={4}>
              <FormattedMessage id="payments.wallet.title" />
            </Title>
            <Title level={5}>Tanda del trabajo</Title>
            <Title level={5}>Lucy Herrera</Title>
            {currentAddress && currentAddress.startsWith('0x') ? (
              <h4 className="mr-2">{currentAddress}</h4>
            ) : (
              <h5 className="GeneralData-subtitle">
                <FormattedMessage id="payments.wallet.description" />
              </h5>
            )}
            <Title level={5}>Registrar</Title>
            <InputSelect options={turns} value={turn} />
            <Button onClick={registerUser} disabled={!currentAddress || !turn}>
              Registrar
            </Button>
          </Col>

          <Col span={12}>
            <Title level={4}>
              <FormattedMessage id="payments.round.title" />
            </Title>

            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.guaranteePayment" />
              </Col>
              <Col span={12}>$500.00 MXN</Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.roundPayment" />
              </Col>
              <Col span={12}>$500.00 MXN</Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.networkCommission" />
              </Col>
              <Col span={12}>$5.00 MXN</Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.totalReceivable" />
              </Col>
              <Col span={12}>
                {pagotardio.checkedA ? '$2,005.00MXN' : '$1,005.00MXN'}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Title level={4}>
              <h3>Pagar Tanda</h3>
            </Title>
            <Title level={5}>Tanda del trabajo</Title>
            <Button disabled={!currentAddress} onClick={payTurn}>
              Pagar
            </Button>
            <Button disabled={!currentAddress} onClick={payLateTurn}>
              Pago tardio
            </Button>
          </Col>

          <Col span={12}>
            <Title level={4}>
              <FormattedMessage id="payments.round.title" />
            </Title>
            <InputSwitch
              checked={setPagoTardio.checkedA}
              onChange={handleSwitch}
              name="checkedA"
              label="¿Pago Atrasado?"
            />
            {pagotardio.checkedA && (
              <Row>
                <Col span={12}>
                  <FormattedMessage id="payments.round.labels.latePayment" />
                </Col>
                <Col span={12}>$1000.00 MXN</Col>
              </Row>
            )}
            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.guaranteePayment" />
              </Col>
              <Col span={12}>$500.00 MXN</Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.roundPayment" />
              </Col>
              <Col span={12}>$500.00 MXN</Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.networkCommission" />
              </Col>
              <Col span={12}>$5.00 MXN</Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormattedMessage id="payments.round.labels.totalReceivable" />
              </Col>
              <Col span={12}>
                {pagotardio.checkedA ? '$2,005.00MXN' : '$1,005.00MXN'}
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>
    </>
  );
}

const mapStateToProps = (state) => state;
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPay);

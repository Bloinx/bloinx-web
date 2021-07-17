import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { connect } from "react-redux"

import { FormattedMessage } from 'react-intl';

import InputSelect from '../../components/InputSelect';
import InputSwitch from '../../components/InputSwitch';

const { Title } = Typography;

const turns = [{
  value: '1',
  label: '1',
}, {
  value: '2',
  label: '2',
}, {
  value: '3',
  label: '3',
}, {
  value: '4',
  label: '5',
}];

function RegisterPay(props) {
  // eslint-disable-next-line no-unused-vars
  const [turn, setTurn] = useState('1');
  // eslint-disable-next-line no-unused-vars
  const [account, setAccount] = useState('1');
  const [pagotardio, setPagoTardio] = React.useState({
    checkedA: true,
  });

  useEffect(async () => {
    // const provider = await detectEthereumProvider();
    // const accounts = await provider.request({ method: 'eth_accounts' });
    // setAccount(accounts[0]);
  }, [props.account]);
  // const handleChange = (event) => {
  //   setData({ ...data, [event.name]: event.value });
  // };

  // const handleStep = (step) => {
  //   setStep(step);
  // };

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
      <Row>
        <Col span={12}>
          <Title level={4}>
            <FormattedMessage id="payments.wallet.title" />
          </Title>
          <Title level={5}>Tanda del trabajo</Title>
          <Title level={5}>Lucy Herrera</Title>
          {
            account && account.startsWith('0x') ? (
              <h4 className="mr-2">
                {account}
              </h4>
            ) : (
              <h5 className="GeneralData-subtitle">
                <FormattedMessage id="payments.wallet.description" />
              </h5>
            )
          }
          <Title level={5}>Registrar</Title>
          <InputSelect
            options={turns}
          />
          <Button disabled={!account || !turn}>
            Registrar
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
          {
            pagotardio.checkedA && (
              <Row>
                <Col span={12}>
                  <FormattedMessage id="payments.round.labels.latePayment" />
                </Col>
                <Col span={12}>$1000.00 MXN</Col>
              </Row>
            )
          }
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
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('><><><',state);
  return state;
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPay);

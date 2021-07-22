/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Typography,
  Row,
  Col,
  Button,
  // Card
} from 'antd';

const { Title } = Typography;

function BatchDetails({ main }) {
  const { contract, currentAddress } = main;
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [adminAccount, setAdminAccount] = useState(null);

  useEffect(() => {
    if (contract) {
      (async () => {
        const groupSize = await contract.methods.groupSize().call();
        const admon = await contract.methods.admin().call();
        setAdminAccount(admon);
        if (groupSize > 0) {
          for (let i = 0; i < groupSize; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userBatch = await contract.methods.addressOrderList(i).call();
            setRegisteredUsers([userBatch]);
          }
        }
      })();
    }
  }, [main]);

  const handleStartRound = async () => {
    if (adminAccount === currentAddress) {
      console.log('Inicio la tanda');
      await contract.methods.startRound().send({ from: currentAddress, to: contract._address })
        .once('receipt', async (receipt) => {
          console.log('seccess... ', receipt);
        })
        .on('error', async (error) => {
          console.log('Error: ', error);
        });
    }
  };

  const removeUser = async (turn) => {
    console.log(turn);
    if (adminAccount === currentAddress) {
      console.log('Remover usuario');
      await contract.methods.removeUser(1).send({ from: currentAddress, to: contract._address })
        .once('receipt', async (receipt) => {
          console.log('seccess... ', receipt);
        })
        .on('error', async (error) => {
          console.log('Error: ', error);
        });
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Title>Tanda de la chamba</Title>
          <h5 className="GeneralData-subtitle">
            Preiodicidad:
            <span>Quincenal</span>
          </h5>
          <p>
            Monto:
            <span>300 MXN</span>
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <h2 className="GeneralData-subtitle">Usuarios Registrados</h2>
          {
            registeredUsers.length > 0 && (
              registeredUsers.map((user, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <ul key={idx}>
                  <li>{ user }</li>
                </ul>
              ))
            )
          }
          <Button onClick={handleStartRound}>Iniciar Tanda</Button>
          {/* por default elimina al usuario 2 */}
          <Button onClick={removeUser}>Remover usuario de la Tanda</Button>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('>> ', state);
  return state;
};

export default connect(mapStateToProps)(BatchDetails);

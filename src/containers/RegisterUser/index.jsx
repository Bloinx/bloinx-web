/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, PageHeader, notification, Spin } from "antd";
import { connect } from "react-redux";
import { LeftOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import { formatAddress } from "../../utils/format";
import InputSelect from "../../components/InputSelect";
import InputLabel from "../../components/InputLabel";

import styles from "./index.module.scss";
import ContractInstance from "../../utils/contractInstance";
import APIGetAvailablePlaces from "../../api/getAvailablePlaces";
import APISetRegisterUser from "../../api/setRegisterUser";

function RegisterUser({ currentAddress }) {
  const history = useHistory();
  const {
    contract: { methods },
    currentSaving,
  } = ContractInstance();

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [turnSelected, setTurnSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectTurn = ({ target }) => {
    setTurnSelected(target.value);
  };

  const getAvailablePlaces = async () => {
    const availablePlacesData = await APIGetAvailablePlaces(methods);
    setAvailablePlaces(availablePlacesData);
  };

  const handleOptionsPlaces = () => {
    if (availablePlaces && availablePlaces.availablePlaces) {
      return availablePlaces.availablePlaces.map((place) => ({
        value: place.position,
        label: place.position,
      }));
    }
    return [];
  };

  const registerUser = async () => {
    setLoading(true);
    const { status, error } = await APISetRegisterUser(methods, {
      turnSelected,
      currentAddress,
    });

    if (status === "success") {
      notification.success({
        message: "Registro correcto",
        description: "Ahora eres parte de la tanda",
      });
      history.push(`/batch-details/${currentSaving}`);
    } else if (status === "error") {
      notification.error({
        message: "Registro fallido",
        description: "Error al realizar el registro",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getAvailablePlaces();
  }, []);

  return (
    <div className={styles.RegisterUser}>
      <PageHeader
        className={styles.RegisterUserHeader}
        onBack={history.goBack}
        backIcon={<LeftOutlined />}
        title="Registarme"
        extra={[
          <span>{loading && <Spin size="large" tip="Espere..." />}</span>,
        ]}
      />
      <div className={styles.RegisterUserContent}>
        <InputLabel
          label="Tanda"
          value={formatAddress(availablePlaces.contract)}
        />
        <InputLabel
          label="Mi dirección"
          value={formatAddress(currentAddress)}
        />
        <InputSelect
          label="Selecciona un turno disponible"
          placeholder="Seleccione un turno"
          options={handleOptionsPlaces()}
          value={turnSelected}
          name="Turn"
          onChange={handleSelectTurn}
          disabled={loading}
        />
        <div className={styles.RegisterUserContentAction}>
          <Button
            type="primary"
            onClick={registerUser}
            disabled={!currentAddress || !turnSelected || loading}
          >
            Registrarme
          </Button>
        </div>
      </div>
    </div>
  );
}

RegisterUser.propTypes = {
  currentAddress: PropTypes.string,
};

RegisterUser.defaultProps = {
  currentAddress: null,
};

const mapStateToProps = (state) => {
  const currentAddress = state?.main?.currentAddress;
  return { currentAddress };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);

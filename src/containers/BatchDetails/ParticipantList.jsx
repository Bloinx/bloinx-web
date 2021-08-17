/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import APIGetUsersList from "../../api/getUsersList";
import Instance from "../../utils/contractInstance";
import styles from "./ParticipantList.module.scss";

export default function ParticipantList({ isOpen, onAccept, onCancel }) {
  const {
    contract: { methods },
  } = Instance();

  const [usersData, setUsersData] = useState([]);

  const getAvailablePlaces = async () => {
    const users = await APIGetUsersList(methods);
    setUsersData(users);
  };

  useEffect(() => {
    getAvailablePlaces();
  }, []);

  return (
    <Modal visible={isOpen} onOk={onAccept} onCancel={onCancel}>
      <div className={styles.UsersModal}>
        {usersData &&
          usersData.users &&
          usersData.users.map((item) => (
            <div className={styles.UsersModalItem}>
              <div className={styles.UsersModalItemNumber}>{item.position}</div>
              <div>{item.address}</div>
            </div>
          ))}
      </div>
    </Modal>
  );
}

ParticipantList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

import { useState } from 'react';
import { Table, Button, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import savingGroups from '../../abis/SavingGroups.json';
import { getSavingGroupsAddress } from '../../utils/addressHelpers';

const { Title } = Typography;

const Dashboard = ({ drizzle }) => {
  // console.log({ props });
  // const [contract, setContract] = useState(null);
  // const [admin, setAdmin] = useState('');

  // useEffect(() => {
  //   getContracts();
  // }, [contract]);

  // const getAdmin = async () => {
  //   try {
  //     const admon = await contract.methods.admin().call();
  //     setAdmin(admon);
  //     return admin;
  //   } catch (error) {
  //     console.log(error);
  //     return 'Ocurrio un error inesperado';
  //   }
  // };

  const [contract, setContract] = useState(null);

  async function useContract(abi, address) {
    const { web3 } = drizzle;
    const { eth } = web3;
    const { Contract } = eth;

    setContract(await new Contract(abi, address));
    return contract;
  }

  function getContracts() {
    const savingGroupsAbi = savingGroups;
    return useContract(savingGroupsAbi, getSavingGroupsAddress());
  }

  const dataSource = [
    {
      key: '2',
      name: 'John',
      address: '0x1234...rtfd',
      startDate: '01/01/2020',
      participants: '8',
      liquidity: '5,000.00 MXN',
      status: 'Pendiente',
    },
    {
      key: 0,
      name: 'Tanda de la chamba',
      address: '0x1234...rtfd',
      startDate: '01/06/2021',
      participants: '6',
      liquidity: '5,000.00 MXN',
      status: 'Terminada',
    },
  ];

  const columns = [
    {
      title: <FormattedMessage id="dashboardPage.table.name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.address" />,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.startDate" />,
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.participants" />,
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.liquidity" />,
      dataIndex: 'liquidity',
      key: 'liquidity',
    },
    {
      title: <FormattedMessage id="dashboardPage.table.status" />,
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <>
      <Button onClick={getContracts}>
        GetContract
      </Button>
      <Title level={4}><FormattedMessage id="dashboardPage.title" /></Title>
      <Table dataSource={dataSource} columns={columns} size="small" pagination={{ simple: true }} />
    </>
  );
};

export default Dashboard;

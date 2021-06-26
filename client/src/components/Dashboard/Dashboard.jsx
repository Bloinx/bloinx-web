import React from 'react';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Button,
} from '@material-ui/core';

const columns = [
  { id: 'tandaName', label: 'Nombre de la Tanda', minWidth: 170 },
  { id: 'contractAddres', label: 'Dirección del Contrato', minWidth: 170 },
  { id: 'startDate', label: 'Fecha de Inicio', minWidth: 170 },
  {
    id: 'numOfParticipants',
    label: 'Número de Participantes',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'totalLiquidity',
    label: 'Total de Liquidez',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'right',
  },
];

const rows = [
  {
    name: 'Tanda de la chamba',
    address: '0x1234...rtfd',
    startDate: '01/06/21',
    participants: '6',
    liquidity: '5,000.00 MXN',
    status: 'Terminada',
  },
  {
    name: 'Tanda con la family',
    address: '0x12999...tbc',
    startDate: '21/06/21',
    participants: '8',
    liquidity: '15,000.00 MXN',
    status: 'Activa',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  header: {
    color: 'primary',
  },
});

const Dashboard = (props) => {
  const { getContracts } = props;
  // const [contract, setContract] = useState(null);
  // const [admin, setAdmin] = useState('');
  const classes = useStyles();

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

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Button
          variant="contained"
          id="getContract"
          name="type"
          onClick={getContracts}
        >
          GetContract
        </Button>
        <TableContainer className={classes.container}>
          <Table className={classes.header}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow hover>
                  <TableCell>
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.address}
                  </TableCell>
                  <TableCell align="center">
                    {row.startDate}
                  </TableCell>
                  <TableCell align="center">
                    {row.participants}
                  </TableCell>
                  <TableCell align="right">
                    {row.liquidity}
                  </TableCell>
                  <TableCell align="right">
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

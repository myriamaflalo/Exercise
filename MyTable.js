import React, { useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import Button from '@mui/material-next/Button';
import Button from '@mui/material/Button';


import Modal from './Modal';


const MyTable = ({ employees }) => {
    const [columnFilters, setColumnFilters] = useState({
        name: "",
        email: "",
        company:""
      });
      const [loading, setLoading] = useState(true);
      const [isModalOpen, setModalOpen] = useState(false);
      const [workerId, setWorkerId] = useState();
        

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

        const close =()=>{
            setModalOpen(false);
        }

      const handleRowClick =  (item)=> {
            setWorkerId(item.id);
            setModalOpen(true);
            setLoading(false);
        }          


      const handleFilterInputChange = (e, column) => {
        const { value } = e.target;
        setColumnFilters((prevFilters) => ({
          ...prevFilters,
          [column]: value,
        }));
      };
      const filteredData = employees.filter((item) => {
        return (
          item.name.toLowerCase().includes(columnFilters.name.toLowerCase()) &&
          item.email.toLowerCase().includes(columnFilters.email.toLowerCase())
        );
      });
   

  return (
 <div>
       { isModalOpen && <Modal onClose={close} workerId={workerId}/>}
    <div>
    <input
      type="text"
      placeholder="Filter by Name"
      value={columnFilters.name}
      onChange={(e) => handleFilterInputChange(e, "name")}
    />
    <input
      type="text"
      placeholder="Filter by Email"
      value={columnFilters.email}
      onChange={(e) => handleFilterInputChange(e, "email")}
    />

</div>
<TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Company name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item) => (
            <StyledTableRow key={item.id}>
               {/* <StyledTableCell component="th" scope="row"></StyledTableCell>  */}
               
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{item.email}</StyledTableCell>
              <StyledTableCell>{item.company.name}</StyledTableCell>
              <Button onClick={() => handleRowClick(item)}>Posts</Button>
             
            </StyledTableRow>
          ))}
        
        </TableBody>
        {/* <button onClick={() => handleRowClick(item)} >
                Posts
              </button >  */}
      </Table>
    </TableContainer>
    {/* <table>
        <tbody>
  <thead> 
        <tr> */}
          {/* Replace with your column headers */}
          {/* <th>Name </th>
          <th>Email </th>
          <th>Company name </th>
        </tr>
      </thead> 
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.company.name}</td>
            //   <td> */}
              {/* <button onClick={() => handleRowClick(item)} >
                Click Me
              </button > */}
            {/* </td>
            </tr> */}
          {/* ))} */}
       
       {/* </tbody>  
    </table> */}
    </div>
  );
};


export default MyTable;

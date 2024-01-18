import React, { useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EastIcon from '@mui/icons-material/East';
import './Table.css'
import TextField from '@mui/material/TextField';
import EmployeePosts from '../EmployeePosts/EmployeePosts';

const headers = ['Name', 'Email', 'Company Name', 'See Posts'];

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
    <div className='container'>
       { isModalOpen && <EmployeePosts onClose={close} workerId={workerId}/>}
      <div className='filters'>
          <TextField 
            className='search' 
            id="outlined-basic" 
            label="Filter by Name" 
            variant="outlined" 
            onChange={(e) => handleFilterInputChange(e, "name")}
          />
          <TextField 
            className='search' 
            id="outlined-basic" 
            label="Filter by Email" 
            variant="outlined"
            onChange={(e) => handleFilterInputChange(e, "email")} 
          />
      </div>

      <TableContainer  className='employee-table' component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {headers.map(item => <StyledTableCell>{item}</StyledTableCell>)}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell>{item.company.name}</StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => handleRowClick(item)}><EastIcon/></button>
              </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
    </div>
  );
};


export default MyTable;

//  import react or axios for run api function
import React from 'react'
import axios from 'axios';

//import Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow from flowbite-react for fast to work or use prewritten code
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

// import  toast, ToastContainer from react-toastify for giving pop up
import { toast, ToastContainer } from 'react-toastify';

//table section
const EnquiryList = ({ data, getAllEnquiry, Swal, setFormData }) => {
  //delete api function
  let deleteRow = (delid) => {
    // swalfire function for pop up notification
    Swal.fire({
      title: "Do you want to delete the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        //delete api for function
        axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            toast.success("Enquiry Deleted Successfully")
            getAllEnquiry() // for show all remain data
          })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  //edit data api or url
  let editRow = (editid) => {
    axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
      .then((res) => {
        let data = res.data // api data store in data
        setFormData(data.editEnquiry) // editEnquiry from  fetch data strore in setformdata 
      })
  }

  return (
    <div>
       {/* table section  */}
      <div className='bg-gray-200 p-4' >
        <h2 className='text-[20px] font-bold mb-4'>Enquiry List</h2>

        <div className="overflow-x-auto">

          <Table>
            <TableHead>
              <TableRow className='text-white'>
                <TableHeadCell>Sr No</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Message</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
                <TableHeadCell>Edit</TableHeadCell>
              </TableRow>
            </TableHead>
            {/* auto entry section */}
            <TableBody className="divide-y">
              {
                data.length >= 1 ?
                  data.map((item, index) => {
                    return (
                      // pick data and enter in tabel form by using index or item
                      <TableRow key={index} className="bg-white  text-black">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.message}</TableCell>
                        {/* delete button with  onClick function for pick id */}
                        <TableCell>
                          <button onClick={() => deleteRow(item._id)}
                            className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md'>
                            Delete
                          </button>
                        </TableCell>
                          {/* edit button with onClick function for pick id */}
                        <TableCell>
                          <button onClick={() => editRow(item._id)} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                            Edit
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                  :
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No Data Found
                    </TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>

        </div>
      </div>
    </div>
  )
}
// export enquirylist
export default EnquiryList;

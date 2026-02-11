import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EnquiryList from './enquiry/EnquiryList';
import { toast, ToastContainer } from 'react-toastify';   // ← FIX (added ToastContainer)

export default function Enquiry() {
  let [enquirylist, setEnquiryList] = useState([])
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  let saveEnquiry = (e) => {
    e.preventDefault()
     
    if(formData._id){
      axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`,formData)
      .then((res)=>{
        toast.success("Enquiry Updated Successfully")
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _id:''
        })
        getAllEnquiry()

      })

    }else{
      axios.post("http://localhost:8020/api/website/enquiry/insert", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Enquiry Submitted Successfully")

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _id:''
        })
        getAllEnquiry()
      })

    }

    
  }


  let getAllEnquiry = () => {
    axios.get("http://localhost:8020/api/website/enquiry/view")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList)
        }
      })
  }

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  }

  useEffect(() => {
    getAllEnquiry()
  }, [])

  return (
    // form section with style
    <div>
      <ToastContainer />{/*use for popup notification */}
      
      <h1 className='text-[40px] text-center py-6 font-bold'>User Enquiry</h1>

      <div className='grid grid-cols-[30%_auto] gap-10'>
        {/* form section */}
        <div className='bg-gray-200 p-4'>
          <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry} >
            {/* use get value or name or value for pick the data  from form input section */}
            <div className='py-3 '>
              <Label htmlFor="name" style={{ color: "black" }}>Your Name</Label>
              <TextInput type="text" value={formData.name} onChange={getValue} name='name' placeholder="Enter Your Name" required />
            </div>

            <div className='py-3'>
              <Label htmlFor="email" style={{ color: "black" }}>Your Email</Label>
              <TextInput type="text" value={formData.email} onChange={getValue} name='email' placeholder="Enter Your Email" required />
            </div>

            <div className='py-3'>
              <Label htmlFor="phone" style={{ color: "black" }}>Your Phone</Label>
              <TextInput type="text" value={formData.phone} onChange={getValue} name='phone' placeholder="Enter your Phone" required />
            </div>

            <div className='py-3'>
              <Label htmlFor="name" style={{ color: "black" }}>Your Message</Label>
              <Textarea name='message' value={formData.message} onChange={getValue} placeholder="Enter Your message " required rows={4} />
            </div>

            <div className='py-3'>
              <Button type="submit" className='w-[100%] cursor-pointer'>
               {formData._id ?'Update':'Save'}  {/*  cheack if data has id then show update button otherwise show save button */}
                </Button>
            </div>

          </form>
        </div>

        {/* info section or tabel section */}
        <EnquiryList data={enquirylist} getAllEnquiry={getAllEnquiry} Swal={Swal} setFormData={setFormData}/>
      </div>
    </div>
  )
}
// export enquiry
export { Enquiry }

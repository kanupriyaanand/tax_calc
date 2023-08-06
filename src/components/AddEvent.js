import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { set, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    bgcolor: "grey",
    borderRadius: "10px",
    boxShadow: 24,
    maxWidth: 700,
    p: 4,
  };


const AddEvent = ({ open, handleClose, data, docId }) => {
    const { register, handleSubmit, reset } = useForm();
  const user = useSelector(selectUser);

  const onSubmit = async (dataForm) => {
   
    try {
      console.log("clicked")
      const CollectionRef = doc(db, `Income_Streams/${dataForm.source}`);
      await setDoc(CollectionRef, dataForm);
      toast.success("Updated Successfully");
      reset();

      const collectionRef = collection(db, dataForm.Email);
     
        
    //    await addDoc(collectionRef, { ...data, dataForm });
    
        
      
      handleClose();
    } catch (e) {
 
    }
  };

  return (
    <>
      <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Income Stream
          </Typography>
          <div className="mt-2">
            <form
              className="flex flex-col justify-center space-y-5 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              

              <input
                className="px-3 py-2 rounded-md"
                type="text"
                {...register("Email")}
                placeholder="Confirm your email address"
                required
              />

              <input
                className="px-3 py-2 rounded-md"
                type="text"
                {...register("source")}
                placeholder="Enter new source of income"
                required
              />

              
            
              <button
                className="px-3 py-2 rounded-md bg-blue-900 text-white"
                type="submit"
              >
                Submit
                
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
};
export default AddEvent;

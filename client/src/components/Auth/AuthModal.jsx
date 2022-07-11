import { Modal, Box, Typography, Tabs, Tab } from '@mui/material'
import  { useState, useContext } from 'react';
import { AppContext } from "../../contexts/AppContext";
import Signin from './Signin';
import Signup from './Signup';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 640,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 3
};



function AuthModal() {
  const {openSignIn, setOpenSignIn} = useContext(AppContext);
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = () => {
    setCurrentTab(prevTab => prevTab === 0 ? 1 : 0);
  }

  const handleCloseSignIn = () => setOpenSignIn(false)

  return (
    <Modal
      open={openSignIn}
      onClose={handleCloseSignIn}
      aria-label="authentication modal"
    >

      <Box sx={modalStyle}>
      <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="authentication modal tabs"
          sx={{bgcolor: '#DCDCDC', borderTopLeftRadius: 12, borderTopRightRadius: 12}}
        >
          <Tab label="SIGN IN" />
          <Tab label="SIGN UP"/>
        </Tabs>
        {currentTab === 0 ? <Signin changeTab={handleTabChange} closeModal={handleCloseSignIn}/> : <Signup changeTab={handleTabChange}/>}
      </Box>
    </Modal>
  )
}

export default AuthModal
import css from "./UserLogoutModal.module.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { logOut } from "../../redux/auth/operations"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/auth/slice';
import CloseIcon from '@mui/icons-material/Close';

export default function UserLogoutModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.isModalOpen);

  const navigate = useNavigate();
  // console.log()
  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate('/login');
      console.log(localStorage.getItem('user'));

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={css.modalBox}>
        <button 
          className={css.closeBtn} 
          onClick={() => dispatch(closeModal())}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <h2 className={css.modalTitle}>Log out</h2>
        <p className={css.modalDescr}>Do you really want to leave?</p>
        <div className={css.buttonContainer}>
          <button className={css.backBtn} onClick={() => dispatch(closeModal())} color="secondary">
            Cancel
          </button>
          <button className={css.deleteBtn} color="primary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </Box>
    </Modal>
  );
}
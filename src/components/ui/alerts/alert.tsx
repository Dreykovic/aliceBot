import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';

import { closeAlert } from './alert-slice';

const CustomAlert = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { message, title, success, show } = useSelector(
    (state: RootState) => state.alert,
  );

  return (
    <>
      <Modal
        show={show}
        onHide={() => dispatch(closeAlert())}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <h5 className="modal-title  fw-bold">{title}</h5>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className="modal-body justify-content-center flex-column d-flex">
            <i
              className={`icofont-${success ? 'simple-smile' : 'sad'} text-${success ? 'success' : 'danger'} display-2 text-center mt-2`}
            ></i>
            <p className="mt-4 fs-5 text-center">{message}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomAlert;

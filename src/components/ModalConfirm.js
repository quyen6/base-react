import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
    props;

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataUserDelete.id); // data:  {}
    if (Object.keys(res.data).length === 0) {
      handleClose(false);
      toast.success("Delete user success!!!");
      handleDeleteUserFromModal(dataUserDelete);
    } else {
      toast.error("Error delete");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <strong> This action can't be undone! </strong>
            <br />
            <br />
            Do you want to delete this user :{" "}
            <strong>
              {dataUserDelete.name} - {dataUserDelete.email} ?
            </strong>{" "}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => confirmDeleteUser()}
            style={{ padding: "6px 20px" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;

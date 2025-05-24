import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { putUpdateUser } from "../services/UserService";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, email, dataUserEdit.id);
    let data = res.data;
    if (data && data.id) {
      // success
      handleEditUserFromModal({
        name: name,
        email: email,
        id: dataUserEdit.id,
      });
      handleClose();
      setName("");
      setEmail("");
      toast.success("Update user success!!!");
    } else {
      toast.error("An error...");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.name);
      setEmail(dataUserEdit.email);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => handleEditUser()}
            style={{ padding: "6px 20px" }}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;

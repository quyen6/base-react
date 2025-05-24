import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { postCreateUser } from "../services/UserService";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = async () => {
    let res = await postCreateUser(name, email);
    let data = res.data;
    if (data && data.id) {
      //success
      handleClose();
      setName("");
      setEmail("");
      toast.success("Added user success!!!");
      handleUpdateTable({ name: name, id: data.id, email: email });
    } else {
      toast.error("An error...");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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
            onClick={() => handleAddUser()}
            style={{ padding: "6px 20px" }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;

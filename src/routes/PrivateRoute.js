import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";

function PrivateRoute(props) {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <h1>
        {" "}
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You don't have permisson to access this route</p>
        </Alert>
      </h1>
    );
  }
  return <>{props.children}</>;
}

export default PrivateRoute;

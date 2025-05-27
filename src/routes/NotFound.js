import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="not-found mt-3 d-flex flex-column justify-content-center align-items-center">
        <img
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
        />
        <Link
          to="/"
          className="link-home mt-4 text-decoration-none text-secondary"
        >
          <i className="fa-solid fa-house"></i> &nbsp; Go Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;

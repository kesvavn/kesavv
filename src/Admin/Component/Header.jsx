import {
  FaBell,
  FaBars,
} from "react-icons/fa";

function Header() {
  return (
    <div className="admin-header">

      <div className="d-flex align-items-center gap-3">

        <FaBars />

        <h4 className="page-title mb-0">
          Pricing Requests
        </h4>

      </div>

      <div className="d-flex align-items-center gap-4">

        <FaBell size={20} />

        <div>
          <h6 className="mb-0">
            Admin
          </h6>

          <small>
            Super Admin
          </small>
        </div>

      </div>

    </div>
  );
}

export default Header;
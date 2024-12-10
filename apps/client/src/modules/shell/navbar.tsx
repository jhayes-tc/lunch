import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Lunch
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Dead Link</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;

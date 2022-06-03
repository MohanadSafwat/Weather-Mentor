import { Link } from "react-router-dom";
import { Icons } from "../../svg";
import '../../css/dashboard/menu.css'

const Menu = () => {
  return (
    <div className="menu">
      <div className="back">
        <Link to="/">
          <Icons.Back />
        </Link>
      </div>
      <div className="appIcon">
        <Icons.AppIcon />
      </div>
      <h1>Weather App</h1>
    </div>
  );
};
export default Menu;

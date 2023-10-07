import { Link } from "react-router-dom";
import logo2 from "../../assets/logo2sinfond0.png";

const Nav = () => {
  return (
    <nav className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-10 w-auto" src={logo2} alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Contenedor de botones del componente Scroll */}
                <div className="flex items-center space-x-4 ml-auto ">
                  {/* Botones del componente Scroll */}
                </div>

                <div className="flex items-center">
                  <Link to="/home">
                    <a
                      href="#"
                      className="text-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 text-sm font-medium">
                      BACK
                    </a>
                  </Link>

                  <Link to="/home">
                    <a
                      href="#"
                      className="text-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-4 py-2 text-sm font-medium">
                      HENRY VENDEHUMO
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

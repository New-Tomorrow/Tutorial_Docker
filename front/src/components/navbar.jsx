const Navbar = () => {
  const nav = [
    { titulo: "Cadastrar Funcionário", link: "/" },
    { titulo: "Listar Funcionário", link: "/listar" }];


  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-50 w-full z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/listar" className="flex items-center">
          <img
            src="https://cdn.bitrix24.com.br/b13772517/sender/be6/be612427cf98746b2aabd3989116d1a8/c73ac8c47757f6a2ac317088ba524040.png"
            className="h-8 mr-3"
            alt="Uc Technology Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        <div className="flex items-center space-x-4 sm:hidden">
          <button
            type="button"
            className="text-gray-900 dark:text-gray-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className="flex space-x-8">
          {nav.map((item) => (
            <li key={item.titulo}>
              <a
                href={item.link}
                className="py-2 px-4 font-bold text-gray-900 dark:text-gray-900"
                aria-current="page"
              >
                {item.titulo}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>

  );
};

export default Navbar;

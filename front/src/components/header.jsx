const Header = ({titulo}) => {
    return (
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:gray-900">
            {titulo}
        </h1>
    );
}

export default Header;
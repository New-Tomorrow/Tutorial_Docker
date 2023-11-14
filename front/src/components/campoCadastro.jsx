const CampoCadastro = ({ titulo, para, name, type, id, placeholder,value,setValue }) => {
    return (

        <div>
            <label htmlFor={para} className="block  mb-2 text-sm font-bold text-gray-900 dark:gray-900">{titulo}</label>
            <input type={type} name={name} id={id} placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        </div>);
}

export default CampoCadastro;
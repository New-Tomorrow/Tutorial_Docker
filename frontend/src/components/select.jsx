const SelectCargo = ({listaCargos,setCargo,cargo}) => {
    return ( 
    <div>
        <label htmlFor="cargo" className="block mb-2 text-sm font-bold text-gray-900 ">Selecione um cargo</label>
        <select id="cargo" defaultValue="" value={cargo} onChange={(e)=> setCargo(e.target.value)} className="bg-gray-50 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-900 dark:gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option disabled value="">Escolha um cargo</option>
          {listaCargos.map((cargo)=>(
            <option value={cargo} key={cargo}>{cargo}</option>
          ))}
        </select>
        </div>
         );
}
 
export default SelectCargo;
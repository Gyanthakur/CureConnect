import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
	const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const value = {
		aToken,setAToken,
		backendUrl
	};

	// console.log("token" , aToken)
	// console.log("backend url " , backendUrl)
	// console.log("setToken" , setAToken)
	return (
		<AdminContext.Provider value={value}>
			{props.children}
		</AdminContext.Provider>
	);
};

export default AdminContextProvider;

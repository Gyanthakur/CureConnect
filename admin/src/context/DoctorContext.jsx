import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'




export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	// dToken = doctor token
	const [dToken, setDToken]  = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '') 
	const [appointments, setAppointments] = useState([])
	const [dashData, setDashData] = useState(false)
	const [profileData, setProfileData] = useState(false)

	const getAppointments = async()=>{
		try {
			
			const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {headers: {dToken}})
					

			if(data.success){
				setAppointments(data.appointments)
				console.log(data.appointments);
				
			}
			else{
				console.log(error.message)
				toast.error(error.message)
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message)
			
		}
	}

	const completeAppointments = async(appointmentId) =>{
		try {
			const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointments', {appointmentId}, {headers:{dToken}})
			if(data.success){
				toast.success(data.message)
				getAppointments()
			}
			else{
				toast.error(data.message)
			}
			
		} catch (error) {
			console.log(error.message);
			toast.error(error.message)
		}
	}

	const cancelAppointments = async(appointmentId) =>{
		try {
			const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointments', {appointmentId}, {headers:{dToken}})
			if(data.success){
				toast.success(data.message)
				getAppointments()
			}
			else{
				toast.error(data.message)
			}
			
		} catch (error) {
			console.log(error.message);
			toast.error(error.message)
		}
	}
	
	const getDashData = async()=>{
		try {
			const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers:{dToken}})
			if(data.success)
			{
				setDashData(data.dashData)
			}
			else{
				toast.error(data.message)
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message)
		}
	}


	const getProfileData = async()=>{
		try {
			const {data} = await axios.get(backendUrl + '/api/doctor/profile', {headers:{dToken}})
			if(data.success){
				setProfileData(data.profileData)
				console.log(data.profileData)
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message)
		}
	}

	
	


	const value = {
		dToken,
		setDToken,
		backendUrl,
		appointments,
		setAppointments,
		getAppointments,
		completeAppointments,
		cancelAppointments,
		dashData,setDashData,getDashData,
		profileData,setProfileData,getProfileData,
	};
	return (
		<DoctorContext.Provider value={value}>
			{props.children}
		</DoctorContext.Provider>
	);
};

export default DoctorContextProvider;

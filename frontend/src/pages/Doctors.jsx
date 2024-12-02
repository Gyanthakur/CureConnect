import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CaretLeft, CaretRight } from "phosphor-react"; // Import icons

const Doctors = () => {
	const { speciality } = useParams();
	const [filterDoc, setFilterDoc] = useState([]);
	const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
	const itemsPerPage = 4; // Number of doctors per page
	const { doctors } = useContext(AppContext);
	const navigate = useNavigate();
	const [showFilter, setShowFilter] = useState(false);

	// Apply filters based on speciality
	const applyFilter = () => {
		if (speciality) {
			setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
		} else {
			setFilterDoc(doctors);
		}
	};

	// Reset to the first page when speciality changes
	useEffect(() => {
		setCurrentPage(1); // Reset pagination to the first page
		applyFilter();
	}, [speciality, doctors]);

	// Calculate paginated doctors
	const paginatedDocs = filterDoc.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Handle page navigation
	const handleNext = () => {
		if (currentPage < Math.ceil(filterDoc.length / itemsPerPage)) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	return (
		<div>
			<p className="text-gray-600">Browse through the doctors specialist.</p>
			<button
				className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
					showFilter ? "bg-primary text-white" : ""
				}`}
				onClick={() => setShowFilter((prev) => !prev)}
			>
				Filters
			</button>
			<div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
				<div
					className={`flex flex-col gap-4 text-sm text-gray-600 ${
						showFilter ? "flex" : "hidden sm:flex"
					}`}
				>
					{/* Filters */}
					{[
						"General physician",
						"Gynecologist",
						"Dermatologist",
						"Pediatricians",
						"Neurologist",
						"Gastroenterologist",
					].map((spec) => (
						<p
							key={spec}
							onClick={() =>
								speciality === spec
									? navigate("/doctors")
									: navigate(`/doctors/${spec}`)
							}
							className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
								speciality === spec ? "bg-indigo-100 text-black" : ""
							} `}
						>
							{spec}
						</p>
					))}
				</div>
				<div className="w-full grid grid-cols-auto gap-4 gap-y-6">
					{/* Display paginated doctors */}
					{paginatedDocs.map((item, index) => (
						<div
							onClick={() => navigate(`/appointment/${item._id}`)}
							className="border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500"
							key={index}
						>
							<img className="bg-blue-50" src={item.image} alt="" />
							<div className="p-4">
								<div
									className={`flex items-center gap-2 text-sm text-center ${
										item.available ? "text-green-500" : "text-red-500"
									} `}
								>
									<p
										className={`w-2 h-2 ${
											item.available ? "bg-green-500" : "bg-red-500"
										}  rounded-full`}
									></p>
									<p>{item.available ? "Available" : "Not Available"}</p>
								</div>
								<p className="text-gray-900 text-lg font-medium">{item.name}</p>
								<p className="text-gray-900 text-sm">{item.speciality}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-between items-center mt-6">
				<button
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className={`flex items-center gap-2 py-2 px-4 border rounded ${
						currentPage === 1
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-bg-accent text-white"
					}`}
				>
					<CaretLeft size={20} />
					Previous
				</button>
				<span className="text-sm text-gray-600">
					Page {currentPage} of {Math.ceil(filterDoc.length / itemsPerPage)}
				</span>
				<button
					onClick={handleNext}
					disabled={currentPage === Math.ceil(filterDoc.length / itemsPerPage)}
					className={`flex items-center gap-2 py-2 px-4 border rounded ${
						currentPage === Math.ceil(filterDoc.length / itemsPerPage)
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-bg-accent text-white"
					}`}
				>
					Next
					<CaretRight size={20} />
				</button>
			</div>
		</div>
	);
};

export default Doctors;

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Doctors = () => {
// 	const { speciality } = useParams();
//   const [filterDoc,setFilterDoc] = useState([]);
// 	const { doctors } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [showFilter, setShowFilter] = useState(false)

//   const applyFilter = () =>{
//     if(speciality){
//       setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
//     }else{
//       setFilterDoc(doctors)
//     }
//   }

//   useEffect(()=>{
//     applyFilter();
//   },[doctors,speciality])

// 	return (
// 		<div>
// 			<p className="text-gray-600">Browse through the doctors specialist.</p>
//       <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden  ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
// 			<div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
// 				<div className={`flex flex-col gap-4 text-sm text-gray-600  ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
// 					<p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : "" } `}>General physician</p>
// 					<p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : "" } `}>Gynecologist</p>
// 					<p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : "" } `}>Dermatologist</p>
// 					<p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : "" } `}>Pediatricians</p>
// 					<p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : "" } `}>Neurologist</p>
// 					<p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : "" } `}>Gastroenterologist</p>
// 				</div>
//         <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
//           {
//             filterDoc.map((item,index)=>(
//               <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 ' key={index}>
//                   <img className='bg-blue-50' src={item.image} alt="" />
//                   <div className='p-4'>
//                   <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'} `}>
//                         <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'}  rounded-full`}></p><p>{item.available ? "Available" : "Not Available"}</p>

//                     </div>
//                       <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                       <p className='text-gray-900 text-sm'>{item.speciality}</p>
//                   </div>
//               </div>
//           ))
//           }
//         </div>
// 			</div>
// 		</div>
// 	);
// };

// export default Doctors;

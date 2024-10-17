// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";

// const Appointments = () => {
// 	const { docId } = useParams();
// 	const { doctors, currencySymbol } = useContext(AppContext);

// 	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// 	const [docInfo, setDocInfo] = useState(null);
// 	const [docSlots, setDocSlots] = useState([]);
// 	const [slotIndex, setSlotIndex] = useState(0);
// 	const [slotTime, setSlotTime] = useState("");

// 	const getAvailableSlots = async () => {
// 		setDocSlots([]);
// 		// get curr date
// 		let today = new Date();

// 		for (let i = 0; i < 7; i++) {
// 			// getting date with index
// 			let currDate = new Date(today);

// 			currDate.setDate(today.getDate() + i);

// 			// setting end time of the date with index
// 			let endTime = new Date();
// 			endTime.setDate(today.getDate() + i);
// 			endTime.setHours(21, 0, 0, 0);

// 			// setting hours

// 			if (today.getDate() === currDate.getDate()) {
// 				currDate.setHours(
// 					currDate.getHours() > 10 ? currDate.getHours() + 1 : 10
// 				);
// 				currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
// 			} else {
// 				currDate.setHours(10);
// 				currDate.setMinutes(0);
// 			}
// 			let timeSlots = [];
// 			while (currDate < endTime) {
// 				let formattedTime = currDate.toLocaleTimeString([], {
// 					hour: "2-digit",
// 					minute: "2-digit",
// 				});

// 				// add slots to the array
// 				timeSlots.push({
// 					datetime: new Date(currDate),
// 					time: formattedTime,
// 				});

// 				// increement time by 30 minuts
// 				currDate.setMinutes(currDate.getMinutes() + 30);
// 			}

// 			setDocSlots((prev) => [...prev, timeSlots]);
// 		}
// 	};

// 	const fetchDocInfo = async () => {
// 		const docInfo = doctors.find((doc) => doc._id === docId);
// 		setDocInfo(docInfo);
// 		// console.log(docInfo);
// 	};

// 	useEffect(() => {
// 		fetchDocInfo();
// 	}, [doctors, docId]);

// 	useEffect(() => {
// 		getAvailableSlots();
// 	}, [docInfo]);

// 	useEffect(() => {
// 		console.log(docSlots);
// 	}, [docSlots]);

// 	return (
// 		docInfo && (
// 			<div>
// 				{/* ----------------- doctors details ------------------- */}
// 				<div className="flex flex-col gap-4 sm:flex-row">
// 					<div>
// 						<img
// 							className="bg-primary w-full sm:max-w-72 rounded-lg"
// 							src={docInfo.image}
// 							alt=""
// 						/>
// 					</div>
// 					<div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0 ">
// 						{/* ----------Doc info : name, degree , experience ------- */}
// 						<p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
// 							{docInfo.name}
// 							<img className="w-5" src={assets.verified_icon} alt="" />
// 						</p>
// 						<div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
// 							<p>
// 								{docInfo.degree} - {docInfo.speciality}
// 							</p>
// 							<button className="py-0.5 px-2 border text-xs rounded-full">
// 								{docInfo.experience}
// 							</button>
// 						</div>

// 						{/* --------  doctor about  ---------- */}
// 						<div>
// 							<p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
// 								About <img src={assets.info_icon} alt="" />
// 							</p>
// 							<p className="text-sm text-gray-500 max-w-[700px] mt-1">
// 								{docInfo.about}
// 							</p>
// 						</div>

// 						<p className="text-gray-500 font-medium mt-4">
// 							Appointment fee:{" "}
// 							<span className="text-gray-600">
// 								{currencySymbol}
// 								{docInfo.fees}
// 							</span>
// 						</p>
// 					</div>
// 				</div>
// 				{/* booking slots */}
// 				<div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//         <p>Booking Slots</p>
//         <div>
//           {
//             docSlots.length && docSlots.map((item,index)=>(
//               <div key={index}>
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()] }</p>
//                 <p>{item[0] && item[0].getDate() }</p>
//                 <p></p>
//               </div>
//             ))
//           }
//         </div>
//         </div>
// 			</div>
// 		)
// 	);
// };

// export default Appointments;


import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);

  const [slotIndex, setSlotIndex] = useState(0);
	const [slotTime, setSlotTime] = useState("");
  
  // const getAvailableSlots = async () => {
  //   setDocSlots([]);
  //   let today = new Date();

  //   for (let i = 0; i < 7; i++) {
  //     let currDate = new Date(today);
  //     currDate.setDate(today.getDate() + i);
  //     let endTime = new Date(currDate);
  //     endTime.setHours(21, 0, 0, 0);

  //     if (today.getDate() === currDate.getDate()) {
  //       currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
  //       currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
  //     } else {
  //       currDate.setHours(10);
  //       currDate.setMinutes(0);
  //     }

  //     let timeSlots = [];
  //     while (currDate < endTime) {
  //       let formattedTime = currDate.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });

  //       timeSlots.push({
  //         datetime: new Date(currDate),
  //         time: formattedTime,
  //       });

  //       currDate.setMinutes(currDate.getMinutes() + 30);
  //     }

  //     setDocSlots((prev) => [...prev, timeSlots]);
  //   }
  // };


  const getAvailableSlots = async () => {
    // Reset the slots at the beginning
    setDocSlots([]);

    // Get current date
    let today = new Date();

    // Create an array to hold all slots for the week
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
        // Create a new date object for each day
        let currDate = new Date(today);
        currDate.setDate(today.getDate() + i);

        // Set end time for the current day
        let endTime = new Date(currDate);
        endTime.setHours(21, 0, 0, 0); // End time set to 21:00

        // Set start time for the current day
        if (i === 0) { // If it's today
            currDate.setHours(today.getHours() >= 21 ? 21 : today.getHours() + 1);
        } else {
            currDate.setHours(10); // For other days, start at 10:00 AM
        }
        currDate.setMinutes(0); // Reset minutes to 0

        let timeSlots = [];
        while (currDate < endTime) {
            let formattedTime = currDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            // Add slots to the array
            timeSlots.push({
                datetime: new Date(currDate), // Store the full date object
                time: formattedTime, // Store the formatted time
            });

            // Increment time by 30 minutes
            currDate.setMinutes(currDate.getMinutes() + 30);
        }

        // Push the slots for the day into the allSlots array
        allSlots.push(timeSlots);
    }

    // Update the docSlots state with all the generated slots
    setDocSlots(allSlots);
};

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo || null);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);
  useEffect(() => {
    if (docInfo) {
      console.log(docSlots);
      
    }
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* ----------------- doctors details ------------------- */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name} // Ensure alt is meaningful
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0 ">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        
        {/* booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {
              docSlots.length > 0 ? (
                docSlots.map((item, index) => (
                  <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'} `} key={index}>
                    <p>{item.length > 0 && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item.length > 0 && item[0].datetime.getDate()}</p>
                  </div>
                ))
              ) : (
                <p>No available slots</p>
              )
            }
            {/* {docSlots.length > 0 && docSlots.map((item, index) => (
							<div className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'} `} key={index} >
								<p className="font-semibold">{daysOfWeek[index]}</p>
								<p>{item.length > 0 && item[0].datetime.getDate()}</p>
							</div>
						))} */}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
        </div>
        {/* -----------listing related doctoes------------ */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;









// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";

// const Appointments = () => {
// 	const { docId } = useParams();
// 	const { doctors, currencySymbol } = useContext(AppContext);

// 	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// 	const [docInfo, setDocInfo] = useState(null);
// 	const [docSlots, setDocSlots] = useState([]);
// 	const [slotIndex, setSlotIndex] = useState(0);
// 	const [slotTime, setSlotTime] = useState("");

// 	const getAvailableSlots = async () => {
// 		setDocSlots([]);
// 		// get curr date
// 		let today = new Date();

// 		for (let i = 0; i < 7; i++) {
// 			// getting date with index
// 			let currDate = new Date(today);
// 			currDate.setDate(today.getDate() + i);

// 			// setting end time of the date with index
// 			let endTime = new Date();
// 			endTime.setDate(today.getDate() + i);
// 			endTime.setHours(21, 0, 0, 0);

// 			// setting hours
// 			if (i === 0) {
// 				// If it's today, set start time based on current hour
// 				currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
// 				currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
// 			} else {
// 				// For future days, start at 10:00 AM
// 				currDate.setHours(10);
// 				currDate.setMinutes(0);
// 			}

// 			let timeSlots = [];
// 			while (currDate < endTime) {
// 				let formattedTime = currDate.toLocaleTimeString([], {
// 					hour: "2-digit",
// 					minute: "2-digit",
// 				});

// 				// add slots to the array
// 				timeSlots.push({
// 					datetime: new Date(currDate),
// 					time: formattedTime,
// 				});

// 				// increment time by 30 minutes
// 				currDate.setMinutes(currDate.getMinutes() + 30);
// 			}

// 			// Use functional state update to accumulate slots for each day
// 			setDocSlots((prev) => [...prev, timeSlots]);
// 		}
// 	};

// 	const fetchDocInfo = async () => {
// 		const docInfo = doctors.find((doc) => doc._id === docId);
// 		setDocInfo(docInfo);
// 	};

// 	useEffect(() => {
// 		fetchDocInfo();
// 	}, [doctors, docId]);

// 	useEffect(() => {
// 		getAvailableSlots();
// 	}, [docInfo]);

// 	useEffect(() => {
// 		console.log(docSlots);
// 	}, [docSlots]);

// 	return (
// 		docInfo && (
// 			<div>
// 				{/* ----------------- doctors details ------------------- */}
// 				<div className="flex flex-col gap-4 sm:flex-row">
// 					<div>
// 						<img
// 							className="bg-primary w-full sm:max-w-72 rounded-lg"
// 							src={docInfo.image}
// 							alt=""
// 						/>
// 					</div>
// 					<div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0 ">
// 						{/* ----------Doc info : name, degree , experience ------- */}
// 						<p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
// 							{docInfo.name}
// 							<img className="w-5" src={assets.verified_icon} alt="" />
// 						</p>
// 						<div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
// 							<p>
// 								{docInfo.degree} - {docInfo.speciality}
// 							</p>
// 							<button className="py-0.5 px-2 border text-xs rounded-full">
// 								{docInfo.experience}
// 							</button>
// 						</div>

// 						{/* --------  doctor about  ---------- */}
// 						<div>
// 							<p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
// 								About <img src={assets.info_icon} alt="" />
// 							</p>
// 							<p className="text-sm text-gray-500 max-w-[700px] mt-1">
// 								{docInfo.about}
// 							</p>
// 						</div>

// 						<p className="text-gray-500 font-medium mt-4">
// 							Appointment fee:{" "}
// 							<span className="text-gray-600">
// 								{currencySymbol}
// 								{docInfo.fees}
// 							</span>
// 						</p>
// 					</div>
// 				</div>
// 				{/* booking slots */}
// 				<div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
// 					<p>Booking Slots</p>
// 					<div>
// 						{docSlots.length > 0 && docSlots.map((item, index) => (
// 							<div key={index} className="mt-2">
// 								<p className="font-semibold">{daysOfWeek[index]}</p>
// 								{item.length > 0 ? (
// 									item.map(slot => (
// 										<p key={slot.datetime} className="text-gray-500">{slot.time}</p>
// 									))
// 								) : (
// 									<p className="text-gray-500">No available slots</p>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	);
// };

// export default Appointments;

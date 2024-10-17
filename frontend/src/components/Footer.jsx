import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
	const navigate = useNavigate();
	return (
		<div className="md:mx-10">
			<div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm ">
				{/* -------------      left side     -------------------- */}
				<div>
					<img onClick={()=> navigate('/')} className="w-16 h-16 mb-10 cursor-pointer" src={assets.logo_cure_connect_red} alt="" />
					<p className="w-full md:w-2/3 text-gray-600 leading-6">
						CureConnect simplifies your healthcare journey by offering easy
						access to trusted doctors, seamless appointment booking, and
						personalized care, ensuring your health is always a priority.
					</p>
				</div>

				{/* -------------      center side     -------------------- */}
				<div>
					<p className="text-xl font-medium mb-5">COMPANY</p>
					<ul className="flex flex-col gap-2 text-gray-600 ">
						<li>Home</li>
						<li>About us</li>
						<li>Contact us</li>
						<li>Privacy Policy</li>
					</ul>
				</div>

				{/* -------------      right side     -------------------- */}
				<div>
					<p className="text-xl font-medium mb-5">GET IN TOUCH</p>
					<ul className="flex flex-col gap-2 text-gray-600 ">
						<li>+91 895 781 8597</li>
						<li>gps.96169@gmail.com</li>
					</ul>
				</div>
			</div>
				{/* copy right text */}
				<div>
					<hr />
					<p className="py-5 text-sm text-center"> Copyright &copy; 2024 CureConnect. All rights reserved.</p>
				</div>
		</div>
	);
};

export default Footer;

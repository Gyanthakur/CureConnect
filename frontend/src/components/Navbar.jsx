import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "./Loader";
const Navbar = () => {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const { token, setToken, userData } = useContext(AppContext);

	const logout = (event) => {

		setToken(false)
		localStorage.removeItem('token')
	}
	return (
		<div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
			{/* <Loader/> */}
			<img
				onClick={() => navigate("/")}
				className="w-10 h-10 cursor-pointer"
				src={assets.logo_cure_connect_red}
				alt=""
			/>
			<ul className="hidden md:flex items-start gap-5 font-medium">
				<NavLink to="/">
					<li className="py-1">HOME</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/doctors">
					<li className="py-1">All DOCTORS</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/about">
					<li className="py-1">ABOUT</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/contact">
					<li className="py-1">CONTACT</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
			</ul>

			<div className="flex items-center gap-4">
				{token && userData ? (
					<div className="flex items-center gap-2 cursor-pointer group relative">
						<img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
						<img className="w-2.5" src={assets.dropdown_icon} alt="" />
						<div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
							<div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
								<p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
								<p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">My Appointments</p>
								<p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
							</div>
						</div>
					</div>
				) : (
					// <button
					// 	onClick={() => navigate("/login")}
					// 	className="bg-primary text-white px-8 py-3 rounded-full font-light  md:block "
					// >
					// 	Create Account
					// </button>
					<button onClick={() => navigate("/login")} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block " > Create Account</button>
				)}

				<img
					onClick={() => setShowMenu(true)}
					className="w-6 md:hidden"
					src={assets.menu_icon}
					alt=""
				/>
				{/* --------mobile menu------------- */}
				<div
					className={`${
						showMenu ? "fixed w-full" : "h-0 w-0"
					} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}
				>
					<div className="flex items-center justify-between px-5 py-6">
						<img className="w-10" src={assets.logo_cure_connect_red} alt="" />
						<img
							className="w-10"
							onClick={() => setShowMenu(false)}
							src={assets.cross_icon}
							alt=""
						/>
					</div>
					<ul className="flex flex-col items-center gap-2  mt-5 px-5 text-lg font-medium">
						<NavLink onClick={() => setShowMenu(false)} to="/">
							<p className="px-4 py-2 inline-block rounded-md"> HOME</p>
						</NavLink>
						<NavLink onClick={() => setShowMenu(false)} to="/doctors">
							<p className="px-4 py-2 inline-block rounded-md">ALL DOCTORS</p>
						</NavLink>
						<NavLink onClick={() => setShowMenu(false)} to="/about">
							<p className="px-4 py-2 inline-block rounded-md">ABOUT</p>
						</NavLink>
						<NavLink onClick={() => setShowMenu(false)} to="/contact">
							<p className="px-4 py-2 inline-block rounded-md">CONTACT US</p>
						</NavLink>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
	const { dToken, profileData, setProfileData, getProfileData } =
		useContext(DoctorContext);
	const { currency, backendUrl } = useContext(AppContext);

	// console.log(dToken);

	useEffect(() => {
		if (dToken) {
			getProfileData();
		}
	}, [dToken]);
	return (
		profileData && (
			<div>
				<div>
					<div>
						<img src={profileData.image} alt="" />
					</div>

					<div>
            {/* -----------doctor Info: name, degree, speciality and experience */}
						<p>{profileData.name}</p>
						<div>
							<p>{profileData.degree} -{profileData.speciality} </p>
              <button>{profileData.experience}</button>
						</div>

            {/* -------doctor about---------- */}
            <div>
              <p>About</p>
              <p>{profileData.about}</p>
            </div>
            <p>
              Appointment fee: <span>{currency} {profileData.fees} </span>
            </p>

            <div>
              <p>Address:</p>
              <p>
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </p>
            </div>

            <div>
              <input type="checkbox"  />
              <label htmlFor="">Available</label>
            </div>

            <button>Edit</button>
					</div>

				</div>
			</div>
		)
	);
};

export default DoctorProfile;

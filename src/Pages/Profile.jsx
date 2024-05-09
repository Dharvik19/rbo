import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./Profile.module.css";
import avatar from "../assets/img/avatar.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
const Profile = () => {
  const [userinfo, setuserinfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
    stud_name: "",
    grade: "",
    contactnumber: "",
  });

  const onProfileChange = (e) => {
    const { name, value } = e.target;

    setuserinfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getProfile = async () => {
    const response = await fetch(
      ` https://redbluorange.in/school/app/apis/profileinfo`,
      {
        method: "POST",
        body: JSON.stringify({
          userid: localStorage.getItem("userid"),
          accesskey: "7411189f74e25c6b2f135182edfc7030",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log(data);
    setuserinfo((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const handleGenderChange = (e) => {
    setuserinfo((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://redbluorange.in/school/app/apis/updateprofileinfo`,
        {
          method: "POST",
          body: JSON.stringify({
            userid: localStorage.getItem("userid"),
            firstname: userinfo.firstname,
            lastname: userinfo.lastname,
            dob: userinfo.dob,
            gender: userinfo.gender,
            studentname: userinfo.stud_name,
            grade: userinfo.grade,
            accesskey: "7411189f74e25c6b2f135182edfc7030",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log(userinfo); // Log the values of the form fields
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className={classes["mainprofilebox"]}>
              <div className={`row ${classes["mainprofileboximg"]}`}>
                <div className="">
                  <div className="profile-image">
                    <img src={avatar} alt="avatar"></img>
                  </div>
                  <div className={classes["namedetail"]}>
                    <h5>Hello</h5>
                    <h2>Name</h2>
                  </div>
                </div>
                <div className={classes["form-group"]}>
                  <label
                    htmlFor=""
                    className={classes["mobiprofileuploadimage"]}
                  >
                    Upload Profile Image
                    <br />
                    <code>For Preview (300X300)</code>
                  </label>
                  <input type="file" className={classes["mobiprofileinput"]} />
                </div>
              </div>
            </div>
            <div className={classes["profilelinks"]}>
              <ul className={classes["promenue"]}>
                <li>
                  <NavLink to="/order">My orders</NavLink>
                </li>
                <li>
                  <NavLink to="/shop">My Wishlist</NavLink>
                </li>
                <li>
                  <NavLink to="/changepassword">Change Password</NavLink>
                </li>
                <li>
                  <Button sx={{ padding: "15px 20px", fontWeight: "500" }}>
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className={classes["box-body"]}>
            <h1>Profile Info</h1>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12 col-sm-12 mobipad0">
              <div className={classes["form-group"]}>
                <label htmlFor="">First Name : </label>
                <input
                  type="text"
                  className={classes["form-control"]}
                  name="firstname"
                  value={userinfo.firstname}
                  onChange={onProfileChange}
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 col-sm-12 mobipad0">
              <div className={classes["form-group"]}>
                <label htmlFor="">Last Name : </label>
                <input
                  type="text"
                  className={classes["form-control"]}
                  name="lastname"
                  value={userinfo.lastname}
                  onChange={onProfileChange}
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 col-sm-12 mobipad0">
              <div className={classes["form-group"]}>
                <label htmlFor="">Date of Birth : </label>
                <input
                  type="text"
                  className={classes["form-control"]}
                  name="dob"
                  value={userinfo.dob}
                  onChange={onProfileChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12 col-sm-12 mobipad0">
              <div className={classes["form-group"]}>
                <label htmlFor="">Email : </label>
                <input
                  type="text"
                  className={classes["form-control"]}
                  name="email"
                  value={userinfo.email}
                  onChange={onProfileChange}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12 col-sm-12 mobipad0">
              <div className={classes["form-group"]}>
                <label htmlFor="">Contact Number : </label>
                <input
                  type="text"
                  className={classes["form-control"]}
                  name="contactnumber"
                  value={userinfo.contactnumber}
                  onChange={onProfileChange}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12 col-lg-12 col-sm-12 col-sm-12 mobipad0">
              {/* <div className={classes['form-group']}>
                        <label htmlFor="">Gender : </label>
                        <div className={classes['genderradio']}>
                            <label htmlFor="" className={classes['recontainer']}>Male</label>
                            <input type="radio" />
                            <span className={classes['checkmark']}></span>
                        </div>  
                        <div className={classes['genderradio']}>
                            <label htmlFor="" className={classes['recontainer']}>Female</label>
                            <input type="radio" />
                            <span className={classes['checkmark']}></span>
                        </div>  
                    </div> */}
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={userinfo.gender}
                  onChange={handleGenderChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12 col-sm-12 mobipad0">
              <div className={classes["form-group"]}>
                <label htmlFor="">Student Name : </label>
                <input
                  type="text"
                  className={classes["form-control"]}
                  name="stud_name"
                  value={userinfo.stud_name}
                  onChange={onProfileChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12 col-sm-12 mobipad0">
              <div className={classes["form-group"]}>
                <label htmlFor="">Grade : </label>
                <input
                  type="text"
                  className={classes["form-control"]}
                  name="grade"
                  value={userinfo.grade}
                  onChange={onProfileChange}
                />
              </div>
            </div>
            <div className="md-12 mobipad0">
              <div className={classes["updateprofilebtn"]}>
                <button
                  className={`btn ${classes["btnuprfo"]}`}
                  onClick={handleSubmit}
                >
                  Update profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

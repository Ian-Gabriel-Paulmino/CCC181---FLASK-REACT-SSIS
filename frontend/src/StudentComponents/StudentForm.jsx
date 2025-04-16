/**
 * StudentForm Component
 * 
 * This component handles both adding a new student and updating an existing student's information.
 * It uses form inputs to capture student details, and dynamically adjusts its behavior based 
 * on whether the form is for an update or a new entry.
 * 
 * */


import { useEffect, useState, useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

import LoadingModal from "../UtilityComponents/LoadingModal";

function StudentForm({
  studentToUpdate = {},
  updateCallBack,
  closeStudentForm,
  errorCallback,
}) {

  // States for the fields and csrf token to be used for request
  const [programs, setPrograms] = useState([]);
  const [student_id, setStudentId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [year_level, setYearLevel] = useState("");
  const [gender, setGender] = useState("");
  const [program_code, setProgramCode] = useState("");
  const [student_profile,setStudentProfile] = useState(null);
  const csrfToken = useContext(CSRFContext);

  const [isLoading,setLoading] = useState(false);

  // Sets the data for the fields, if the studentToUpdate props is empty it means the Form is adding else it is updating
  useEffect(() => {
    setStudentId(studentToUpdate.Student_Id || "");
    setFirstName(studentToUpdate.FirstName || "");
    setLastName(studentToUpdate.LastName || "");
    setYearLevel(studentToUpdate.Year_Level || "");
    setGender(studentToUpdate.Gender || "");
    setProgramCode(studentToUpdate.Program_Code || "");
    fetchPrograms();
  }, [studentToUpdate]);

  // Checks for current state of the form
  const updating = Object.keys(studentToUpdate).length !== 0;


  // Fetching available programs for program ComboBox
  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/programs/list"
      );
      setPrograms(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error in fetching Programs",error);
    }
  };

  // Sends request to the backend on which student to update and its new fields
  const updateStudent = async () => {
    try {
      if (
        !student_id ||
        !firstname ||
        !lastname ||
        !year_level ||
        !gender ||
        !program_code
      ) {
        alert("Please fill in all fields");
        return;
      }

      setLoading(true);

      // Creates a FormData object to allow files/images to be uploaded
      const studentFormData = new FormData();
      studentFormData.append('Student_Id',student_id);
      studentFormData.append('FirstName',firstname);
      studentFormData.append('LastName',lastname);
      studentFormData.append('Year_Level',year_level);
      studentFormData.append('Gender',gender);
      studentFormData.append('Program_Code',program_code);
      studentFormData.append('Student_Profile',student_profile);

      const response = await axios.patch(
        `http://localhost:5000/api/students/update/${studentToUpdate.Student_Id}`,studentFormData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      // Reseting the form after an update operation
      console.log("Student updated successfully: ", response.data);
      setStudentId("");
      setFirstName("");
      setLastName("");
      setYearLevel("");
      setGender("");
      setProgramCode("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallback(
        `Error in updating Student: ${error?.response?.data?.message}`
      );
    } finally {
      setLoading(false);
    }
  };


  // Sends request to the backend on which student to add and its fields
  const addStudent = async () => {
    try {
      if (
        !student_id ||
        !firstname ||
        !lastname ||
        !year_level ||
        !gender ||
        !program_code
      ) {
        alert("Please fill in all fields");
        return;
      }

      setLoading(true);

      // Creates a FormData object to allow files/images to be uploaded
      const studentFormData = new FormData();
      studentFormData.append('Student_Id',student_id);
      studentFormData.append('FirstName',firstname);
      studentFormData.append('LastName',lastname);
      studentFormData.append('Year_Level',year_level);
      studentFormData.append('Gender',gender);
      studentFormData.append('Program_Code',program_code);
      studentFormData.append('Student_Profile',student_profile);

      const response = await axios.post(
        `http://localhost:5000/api/students/add`,studentFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      // Reseting the form after an add operation
      console.log("Student added successfully", response.data);
      setStudentId("");
      setFirstName("");
      setLastName("");
      setYearLevel("");
      setGender("");
      setProgramCode("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallback(
        `Error in adding Student: ${error?.response?.data?.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  
  // Handling the render of the form based on which state it is in
  const getOperation = () => {
    updating ? updateStudent() : addStudent();
  };


  // Handlers for input change in the fields
  const handleProgramCode = (e) => {
    setProgramCode(e.target.value);
  };

  const handleYearLevel = (e) => {
    setYearLevel(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };


  // Actual Form skeleton
  return (
    <>
      {isLoading && <LoadingModal/>}

    <div className="form">
      <span
        className="closeForm"
        onClick={closeStudentForm}
        style={{ cursor: "pointer" }}
      >
        &times;
      </span>
      <h3> {updating ? "Update Student" : "Add Student"}</h3>
      <input
        type="file"
        onChange={(e) => {
          const profile = e.target.files[0];
          profile ? setStudentProfile(profile) : setStudentProfile(null);
        }}
      />
      <input
        type="text"
        placeholder="Student ID"
        value={student_id}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
      />
      <select value={year_level} onChange={handleYearLevel}>
        <option value="">Select Year Level</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
      </select>
      <select value={gender} onChange={handleGender}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select value={program_code} onChange={handleProgramCode}>
        <option value="">Select Program</option>
        {programs.map((program) => (
          <option key={program.Program_Code} value={program.Program_Code}>
            {program.Program_Code}
          </option>
        ))}
      </select>
      <button onClick={getOperation}>
        {updating ? "Update Student" : "Add Student"}
      </button>
    </div>
    </>
  );
}

export default StudentForm;

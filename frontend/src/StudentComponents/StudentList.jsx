/**
 * StudentList Component
 * 
 * This component renders a table of students and allows users to initiate actions 
 * to update or delete a student. Each student row includes buttons for editing or deleting.
 * */

/**
 * Profile changes
 * 
 * Clicking the profile image can show a modal that lists the details of the choosen student
 * 
 * 
 * Maps the URL inside the student object
 * 
 */


import { FaTrash, FaRegEdit } from "react-icons/fa";


function StudentList({ setDeleteStudent, setUpdateStudent,setPreviewStudent ,students }) {
 
  return (
    <div className="student-list-parent">
      <h1>Students</h1>
      <table>
        <div className="table-container-student">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Year Level</th>
              <th>Gender</th>
              <th>Program Code</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              if (!student.Student_Id) {
                return null;
              }
              return (
                <tr key={student.Student_Id}>
                  <td>
                    {student.Profile_Url ? (
                      <img
                        src={student.Profile_Url}
                        alt={student.FirstName}
                        width="70"
                        height="70"
                        onClick={() => setPreviewStudent(student)}        
                        style={{ cursor: "pointer" }}                     
                      />
                    ) : (
                      <p>NO PROFILE</p>
                    )}
                  </td>
                  <td>{student.Student_Id}</td>
                  <td>{student.FirstName}</td>
                  <td>{student.LastName}</td>
                  <td>{student.Year_Level}</td>
                  <td>{student.Gender}</td>
                  <td>{student.Program_Code}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => setUpdateStudent(student)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteStudent(student)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </table>
    </div>
  );
}

export default StudentList;
/**
 * Profile modal Component
 * 
 * This component renders the student preview modal after clicking the profile image in the student table. 
 * It blurs the background a bit and clicking such would also close the modal
 * 
 * */


import React from "react";

function ProfileModal({ student, closeModal }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        <h2>{student.FirstName} {student.LastName}</h2>
        <img
          src={student.Profile_Url}
          alt={`${student.FirstName}'s profile`}
          width="150"
          height="150"
        />
        <p>Student ID: {student.Student_Id}</p>
        <p>Year Level: {student.Year_Level}</p>
        <p>Gender: {student.Gender}</p>
        <p>Program Code: {student.Program_Code}</p>
      </div>
    </div>
  );
}

export default ProfileModal;
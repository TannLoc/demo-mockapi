"use client";
import React, { useEffect, useState } from "react";
import { IStudent } from "./page";
import {
  handleCreateStudent,
  handleDeleteStudent,
  handleEditStudent,
} from "./api";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetStudents: ()=>void;
  student?: IStudent;
  setStudent: React.Dispatch<React.SetStateAction<IStudent | undefined>>;
  action: string;
};

const INIT_STUDENT = {
  fullName: "",
  class: "",
  gender: "Nam",
  age: 1,
};

const TITLE = {
  CREATE: "Create student",
  EDIT: "Edit student",
  VIEW: "View student",
  DELETE: "Delete this student?",
};

const Modal = (props: Props) => {
  const { setIsModalOpen, handleGetStudents, student, setStudent, action } = props;

  const isDisabled = action !== "CREATE" && action !== "EDIT";

  const [newStudent, setNewStudent] = useState<IStudent>(INIT_STUDENT);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStudent(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result;
    if (action === "CREATE") {
      result = await handleCreateStudent(newStudent);
    } else if (action === "EDIT" && student?.id) {
      result = await handleEditStudent(newStudent, student.id);
    } else if (action === "DELETE" && student?.id) {
      result = await handleDeleteStudent(student.id);
    } else {
      alert("Invalid action or missing student ID");
      return;
    }
    if (result) {
      handleGetStudents();
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (student) {
      setNewStudent(student);
    }
  }, [student]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-lg w-96">
      <div className="flex justify-between items-center border-b border-gray-300 pb-3">
        <p className="text-lg font-semibold">
          {TITLE[action as "CREATE" | "VIEW" | "EDIT" | "DELETE"]}
        </p>
        <button
          className="text-xl rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          onClick={handleCloseModal}
        >
          ×
        </button>
      </div>

      <form className="mt-4 space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Họ và tên</label>
          <input
            type="text"
            placeholder="Họ và tên"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            value={newStudent.fullName}
            onChange={(e) =>
              setNewStudent((state) => ({ ...state, fullName: e.target.value }))
            }
            disabled={isDisabled}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Lớp</label>
          <input
            type="text"
            placeholder="Lớp"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            value={newStudent.class}
            onChange={(e) =>
              setNewStudent((state) => ({ ...state, class: e.target.value }))
            }
            disabled={isDisabled}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Giới tính</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            value={newStudent.gender}
            onChange={(e) =>
              setNewStudent((state) => ({ ...state, gender: e.target.value }))
            }
            disabled={isDisabled}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Tuổi</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            value={newStudent.age}
            onChange={(e) =>
              setNewStudent((state) => ({
                ...state,
                age: Number(e.target.value),
              }))
            }
            disabled={isDisabled}
          />
        </div>
        {action !== "VIEW" && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Modal;

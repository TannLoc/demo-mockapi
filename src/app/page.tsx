"use client";
import { useEffect, useState } from "react";
import Modal from "./modal";
import { fetchDataStudents, fetchOneStudent } from "./api";

export interface IStudent {
  fullName: string;
  studentId?: string;
  class: string;
  gender: string;
  age: number;
  id?: string;
}

export default function Home() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [student, setStudent] = useState<IStudent>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState("");

  const handleGetStudents = async () => {
    const data = await fetchDataStudents();
    setStudents(data);
  };

  const handleGetOneStudent = async (id: string) => {
    const data = await fetchOneStudent(id);
    setStudent(data);
  };

  const toogleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateStudent = () => {
    toogleOpenModal();
    setAction("CREATE");
  };

  const handleViewStudent = (id: string) => {
    handleGetOneStudent(id);
    toogleOpenModal();
    setAction("VIEW");
  };

  const handleDeleteStudent = (id: string) => {
    handleGetOneStudent(id);
    toogleOpenModal();
    setAction("DELETE");
  };

  const handleEditStudent = (id: string) => {
    handleGetOneStudent(id);
    toogleOpenModal();
    setAction("EDIT");
  };

  useEffect(() => {
    handleGetStudents();
  }, []);

  return (
    <>
      <div className="p-4">
        <button
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleCreateStudent}
        >
          Create
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">STT</th>
              <th className="border border-gray-300 px-4 py-2">Họ và tên</th>
              <th className="border border-gray-300 px-4 py-2">Lớp</th>
              <th className="border border-gray-300 px-4 py-2">Giới tính</th>
              <th className="border border-gray-300 px-4 py-2">Tuổi</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {student.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.fullName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.class}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.gender}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {student.age}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="mr-2 rounded bg-blue-400 px-3 py-1 text-white hover:bg-blue-500"
                    onClick={() => handleViewStudent(student.id!)}
                  >
                    View
                  </button>
                  <button
                    className="mr-2 rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                    onClick={() => handleEditStudent(student.id!)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-400 px-3 py-1 text-white hover:bg-red-500"
                    onClick={() => handleDeleteStudent(student.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          handleGetStudents={handleGetStudents}
          student={student}
          setStudent={setStudent}
          action={action}
        />
      )}
    </>
  );
}

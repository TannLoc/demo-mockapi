import { IStudent } from "./page";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://67d977cd00348dd3e2ab3624.mockapi.io/api/v1/STU";

export const fetchDataStudents = async () => {
  const res = await fetch(`${API_BASE}`);
  const data = await res.json();
  return data;
};

export const fetchOneStudent = async (id?: string) => {
  const res = await fetch(`${API_BASE}/${id}`);
  const data = await res.json();
  return data;
};

export const handleCreateStudent = async (newData: IStudent) => {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
};

export const handleEditStudent = async (newData: IStudent, id: string) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
};

export const handleDeleteStudent = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  const data = await res.json();
  return data;
};

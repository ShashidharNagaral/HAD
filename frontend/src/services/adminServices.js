import axios from "axios";
import { getValueForKey } from "../utils/localStorage";
import { IP_ADDRESS } from "../utils/constants";

const registerEmployeeAPI = `http://${IP_ADDRESS}/api/supervisor/create-employee/`;

const getEmployeeListByNameAPI = (searchName) =>
  `http://${IP_ADDRESS}/api/supervisor/search-employee/${searchName}`;

const deleteEmployeeByIdAPI = (employee_Id) =>
  `http://${IP_ADDRESS}/api/supervisor/delete-employee/${employee_Id}`;

const updateEmployeeAPI = (e_id) =>
  `http://${IP_ADDRESS}/api/supervisor/update-employee/${e_id}`;

async function registerEmployee(employeeData) {
  const responseData = await axios.post(registerEmployeeAPI, employeeData, {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function getEmployeeList(searchName) {
  const responseData = await axios.get(getEmployeeListByNameAPI(searchName), {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function deleteEmployee(employee_Id) {
  const responseData = await axios.delete(deleteEmployeeByIdAPI(employee_Id), {
    headers: { Authorization: `Bearer ${getValueForKey("token")}` },
  });
  return responseData;
}

async function updateEmployee(e_id, updatedEmployeeData) {
  const responseData = await axios.post(
    updateEmployeeAPI(e_id),
    updatedEmployeeData,
    {
      headers: { Authorization: `Bearer ${getValueForKey("token")}` },
    }
  );
  return responseData;
}

export { getEmployeeList, registerEmployee, deleteEmployee, updateEmployee };

import { User } from "../../types";

export const initialUsers: Array<Omit<User, "id">> = [
  { name: "Juan", username: "juancito", password: "secretodejuan" },
  { name: "Jose", username: "josecito", password: "secretodejose" },
  { name: "Stefan", username: "stefancito", password: "secretodestefan" },
  { name: "Laura", username: "laurita", password: "secretodelaura" },
  { name: "Vane", username: "vanecita", password: "secretodevane" },
];

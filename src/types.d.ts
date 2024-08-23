export type Note = {
  id: number;
  content: string;
  important: boolean;
  user: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
};

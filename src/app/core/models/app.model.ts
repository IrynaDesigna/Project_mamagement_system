export interface DecodedToken {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export interface User {
  name:	string,
  login:	string,
  password?:	string,
  token?: string,
  id?: string
}

export interface Board {
  _id:	string,
  title:	string,
  owner:	string,
  users:	string[]
}

export interface Column {
  _id:	string,
  title:	string,
  order:	number,
  boardId:	string
}

export interface Task {
  _id:	string,
  title:	string,
  order:	number,
  boardId:	string,
  columnId:	string,
  description:	string,
  userId:	number,
  users:	string[]
}

export interface File {
  _id: string,
  name:	string,
  taskId:	string,
  boardId: string,
  path:	string
}

export interface Point {
  _id:	string,
  title:	string,
  taskId:	number,
  boardId:	string,
  done:	boolean
}

export interface ErrorResponse {
  statusCode:	number,
  message:	string
}

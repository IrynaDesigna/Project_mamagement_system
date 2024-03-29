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
  id?: string,
}

export interface Board {
  _id?:	string,
  title:	string,
  owner:	string,
  users:	string[]
}

export interface Column {
  map(arg0: (column: any) => { id: any; title: any; order: any; }): unknown;
  _id?:	string,
  title:	string,
  order:	number,
  boardId:	string
}

export interface Task {
  _id?:	string,
  title:	string,
  order:	number,
  description:	string,
  userId:	string,
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
  _id?:	string,
  title:	string,
  taskId?:	number,
  boardId?:	string,
  done:	boolean
}

export interface ErrorResponse {
  statusCode:	number,
  message:	string
}

export interface ObjectWithArraysOfStrings {
  [key: string]: string[];
}

export interface ObjectWithStrings {
  [key: string]: string;
}

export interface ObjectWithBoolean {
  [key: string]: boolean;
}

export type UserRole = "contributor" | "maintainer";

export type IssueType = "bug" | "feature_request";

export type IssueStatus = "open" | "in_progress" | "resolved";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
};

export type RUser = Omit<User, "id" | "password" | "created_at" | "updated_at">;

export type Issue = {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
};


export type TResponse<T> = {
    status : number;
    success : boolean;
    message : string;
    data? : T;
    error? : any
}

export type TUsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TUser[];
};
export type TUpdateUserPayload = TUser;

export type TUpdateUserResponse = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
};

export type TCreateUserResponse = TUser;
export type TCreateUserPayload = Omit<TUser, "id">;

export type TGetUserResponse = {
  data: TUser;
  support: {
    url: string;
    text: string;
  };
};

export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

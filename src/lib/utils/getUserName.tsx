interface UserNameParams {
  first_name: string | null;
  last_name: string | null;
  username: string;
}

export default function getUserName({
  first_name,
  last_name,
  username,
}: UserNameParams): string {
  if (first_name && last_name) {
    return `${first_name} ${last_name}`;
  }
  if (first_name) {
    return first_name;
  }
  if (last_name) {
    return last_name;
  }
  return username || "-";
}

export function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

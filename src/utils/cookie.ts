export const setCookie = (
  name: string,
  value: string | boolean,
  time: number,
) => {
  const date = new Date();
  date.setTime(date.getTime() + time * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value + "" || ""}; expires=${expires}`;
};

export const isCookie = (name: string) => {
  const matches = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return matches ? decodeURIComponent(matches[2]) : undefined;
};

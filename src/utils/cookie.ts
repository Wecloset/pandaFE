export const setCookie = (
  name: string,
  value: string | boolean,
  time: number,
) => {
  let date = new Date();
  date.setTime(date.getTime() + time * 60 * 1000);
  let expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value + "" || ""}; expires=${expires}`;
};

export const isCookie = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

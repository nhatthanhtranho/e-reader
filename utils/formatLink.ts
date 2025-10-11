export function formatLink(url: string) {
  if (process.env.NEXT_PUBLIC_ENV === "PRODUCTION") {
    return `${process.env.NEXT_PUBLIC_ASSETS_PATH}${url}`;
  }
  if (url === "/" || url === "") {
    return "/";
  }

  return `${url}`;
}

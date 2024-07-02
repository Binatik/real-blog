function getTime(str: string) {
  const date = new Date(str);

  const options = { month: "long", day: "numeric", year: "numeric" } as const;

  return date.toLocaleDateString("en-US", options);
}

export { getTime };

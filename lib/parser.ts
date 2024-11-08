export const parseSecrets = (x: string) => {
  // return a map if the string is in the format of "key1=value1|key2=value2"
  // return an array if the string is in the format of "value1|value2"
  if (x.includes("=")) {
    return x.split("|").reduce((acc, item) => {
      const [key, value] = item.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  }
  return x.split("|");
};

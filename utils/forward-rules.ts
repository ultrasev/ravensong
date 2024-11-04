type ForwardRule = {
  from: string;
  to: string;
};

function parseForwardRules(rulesStr: string | undefined): ForwardRule[] {
  if (!rulesStr) return [];
  return rulesStr.split("|").map((rule) => {
    const [from, to] = rule.split("=");
    return { from: from.trim(), to: to.trim() };
  });
}

export function handleForwardRules(
  pathname: string,
  rules: string | undefined,
  search: string,
  url: string
) {
  const forwardRules = parseForwardRules(rules);
  const matchedRule = forwardRules.find((rule) =>
    pathname.startsWith(rule.from)
  );

  if (!matchedRule) return null;

  const newPath = pathname.replace(matchedRule.from, matchedRule.to);
  return new URL(newPath + search, url);
}

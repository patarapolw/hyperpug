export function stripIndent(s: string) {
  const indents: number[] = [];
  for (const r of s.split("\n")) {
    if (r.trim()) {
      const m = /^ */.exec(r);
      if (m) {
        indents.push(m[0].length);
      }
    }
  }

  if (indents.length === 0) {
    indents.push(0);
  }

  const indent: number = Math.min(...indents);

  return s.split("\n").map((r) => r.substr(indent)).join("\n");
}
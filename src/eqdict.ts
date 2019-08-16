export function eqDictParser(s: string) {
  let k = "";
  let v = "";

  const output: Record<string, string> = {};

  while (s.length > 0) {
    [k, s] = eqDictConsume(s);

    if (k) {
      if (s[0] === "=") {
        [v, s] = eqDictConsume(s);
        output[k] = v;
      } else {
        output[k] = "";
      }

      k = "";
    }
  }

  return output;
}

function eqDictConsume(s: string) {
  s = s.replace(/^[=,\s]+/, "");

  if (!s) {
    return ["" ,""];
  } else {
    if (s[0] === '"' || s[0] === "'") {
      let iSplitter = s.length;
      s.split("").forEach((c, i) => {
        if (i > 0) {
          if (c === s[0] && s.substr(i - 1, 1) !== "\\" && iSplitter === s.length) {
            iSplitter = i;
          }
        }
      });

      return [s.substr(1, iSplitter - 1), s.substr(iSplitter)];
    } else {
      let iSplitter = s.length;
      s.split("").forEach((c, i) => {
        if (/[=,\s]/.test(c) && iSplitter === s.length) {
          iSplitter = i;
        }
      });

      return [s.substr(0, iSplitter), s.substr(iSplitter)];
    }
  }
}
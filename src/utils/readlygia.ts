const getFile = async (url: string) => {
  const data = await import.meta.glob('../../node_modules/lygia/*/*.glsl');

  if (data[`../../node_modules/lygia${url}`]) {
    const result = (await data[`../../node_modules/lygia${url}`]()) as any;
    return result.default;
  }

  return '';
};

export const resolveLygia = function (lines: string | string[]) {
  if (!Array.isArray(lines)) {
    lines = lines.split(/\r?\n/);
  }

  let src = '';
  const cacheIndex: number[] = [];
  return new Promise((resolve) => {
    lines.forEach(async (line, i) => {
      let line_trim = line.trim();
      if (line_trim.startsWith('#include "lygia')) {
        let include_url = line_trim.substring(15);
        include_url = include_url.replace(/\"|\;|\s/g, '');
        src += line + '\n';
        cacheIndex.push(i);
        const result = await getFile(include_url);
        src = src.replaceAll(`${line_trim}`, result);
        cacheIndex.pop();
        if (cacheIndex.length === 0) {
          return resolve(src);
        }
      } else {
        src += line + '\n';
      }
    });
  });
};

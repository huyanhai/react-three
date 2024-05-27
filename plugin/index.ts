import { Plugin } from 'vite';
import fs from 'fs-extra';
import { resolve } from 'path';
import { createFilter } from '@rollup/pluginutils';

/**
 * @const
 * @name include
 * @type {readonly RegExp}
 *
 * @description RegEx to match GLSL
 * `#include` preprocessor instruction
 */
const include = /#include(\s+([^\s<>]+));?/gi;

/**
 * @function
 * @name removeSourceComments
 * @description Removes comments from shader source
 * code in order to avoid including commented chunks
 *
 * @param {string}  source Shader's source code
 * @param {boolean} triple Remove comments starting with `///`
 *
 * @returns {string} Shader's source code without comments
 */
function removeSourceComments(source: string, triple = false) {
  if (source.includes('/*') && source.includes('*/')) {
    source =
      source.slice(0, source.indexOf('/*')) +
      source.slice(source.indexOf('*/') + 2, source.length);
  }

  const lines = source.split('\n');

  for (let l = lines.length; l--; ) {
    const index = lines[l].indexOf('//');

    if (index > -1) {
      if (lines[l][index + 2] === '/' && !include.test(lines[l]) && !triple)
        continue;
      lines[l] = lines[l].slice(0, lines[l].indexOf('//'));
    }
  }

  return lines.join('\n');
}

const DEFAULT_SHADERS = Object.freeze([
  '**/*.glsl',
  '**/*.wgsl',
  '**/*.vert',
  '**/*.frag',
  '**/*.vs',
  '**/*.fs'
]);

const readFile = (source: string) => {
  let fileCtx = '';
  const codesArray = source.split(/\\n/);
  // 当前项目node的存放路径
  const nodeDirPath = resolve(__dirname, '../node_modules');
  codesArray.forEach((line, index) => {
    if (line.startsWith(`#include \\\"`)) {
      let fileName = line.substring(11, line.length - 2);
      const pathString = resolve(nodeDirPath, fileName);

      let ctx = fs.readFileSync(pathString, 'utf-8');
      // console.log('pathString', removeSourceComments(ctx));
      fileCtx += ctx.replaceAll('\n', '\\n');
    } else {
      fileCtx += `${line}${codesArray.length - 1 > index ? '\\n' : ''}`;
    }
  });
  return fileCtx;
};

const lygiaPlugin = (): Plugin => {
  const filter = createFilter(DEFAULT_SHADERS, undefined);

  return {
    enforce: 'pre',
    name: 'lygia',

    transform(source, shader) {
      if (!filter(shader)) return;

      console.log(source, include.test(source));
      if (include.test(source)) {
        console.log('执行');

        return { code: readFile(source), map: null };
      }
      return { code: source, map: null };
    }
  };
};

export default lygiaPlugin;

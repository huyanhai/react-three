import { extend } from '@react-three/fiber';
import ScreenShader from './screen/index';

export const registerShader = () => {
  extend({
    ScreenShader
  });
};

import { extend } from '@react-three/fiber';
import Test from './test/index';
import ScreenShader from './screen/index';

export const registerShader = () => {
  extend({
    Test,
    ScreenShader
  });
};

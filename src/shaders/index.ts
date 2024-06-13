import { extend } from '@react-three/fiber';
import ScreenShader from './screen/index';
import HumanShader from './human/index';

export const registerShader = () => {
  extend({
    ScreenShader,
    HumanShader,
  });
};

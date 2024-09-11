import { useMemo } from 'react';
import { CatmullRomCurve3, Shape, Vector3 } from 'three';
import { FIRST_POINT } from '../constants';

// 点的坐标
const pointsPosition = [
  FIRST_POINT,
  new Vector3(0, 20, 30),
  new Vector3(18.47337626175879, 27.538580746027492, 69.28164971877845)
];

export const useLine = () => {
  // 将点生成贝塞尔曲线
  const points = useMemo(() => {
    return new CatmullRomCurve3(pointsPosition);
  }, []);

  // 获取指定偏移量的点
  const getPointAt = (offset: number) => {
    return points.getPointAt(offset);
  };

  // 绘制线
  const shape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, -0.01);
    shape.lineTo(0, 0.01);

    return shape;
  }, [points]);

  return {
    points,
    shape,
    getPointAt
  };
};

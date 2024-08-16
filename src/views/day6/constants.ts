import { Vector3 } from 'three';

export const pointsPosition = [
  new Vector3(0, 0, 0),
  new Vector3(0, 0, -10),
  new Vector3(-5, 0, -20),
  new Vector3(0, 0, -30),
  new Vector3(5, 0, -40),
  new Vector3(0, 0, -50),
  new Vector3(0, 0, -60),
  new Vector3(0, 0, -70)
];

export const cloudPosition = [
  new Vector3(-8, Math.random() * 5, 0),
  new Vector3(10, Math.random() * 5, -10),
  new Vector3(-12, Math.random() * 5, -20),
  new Vector3(10, Math.random() * 5, -30),
  new Vector3(14, Math.random() * 5, -40),
  new Vector3(-8, Math.random() * 5, -50),
  new Vector3(8, Math.random() * 5, -60),
  new Vector3(-20, Math.random() * 5, -70),
];

import React from "react";
import { EffectComposer, Selection, Noise, Bloom, DepthOfField, Vignette, Select, Autofocus, Glitch, GodRays, Outline, DotScreen } from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";

const effect = () => {
  return (
    <EffectComposer>
      {/* 故障风格 */}
      {/* <Glitch mode={GlitchMode.SPORADIC} ratio={0.5} duration={new Vector2(3, 3)} delay={new Vector2(3, 3)} /> */}
      {/* 点状风格 */}
      <DotScreen blendFunction={BlendFunction.NORMAL} scale={1} angle={Math.PI * 0.5} />
    </EffectComposer>
  );
};

export default effect;

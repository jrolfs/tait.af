/*
  eslint-disable
  no-multi-assign,
  no-nested-ternary,
  no-return-assign,
  no-void,
  react/jsx-props-no-spreading,
  react/no-array-index-key,
  react/no-children-prop,
  react/prop-types,
*/

import * as THREE from 'three';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Text from '../Text';

function Jumbo() {
  const ref = useRef();
  useFrame(
    ({ clock }) =>
      (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z =
        Math.sin(clock.getElapsedTime()) * 0.3),
  );
  return (
    <group ref={ref}>
      <Text hAlign="center" position={[0, 4.2, 0]} children="HAPPY" />
      <Text hAlign="center" position={[0, 0, 0]} children="BIRTHDAY" />
      <Text hAlign="center" position={[0, -4.2, 0]} children="MIKE" />
    </group>
  );
}

function Bird({ speed, factor, url, ...props }) {
  const { nodes, materials, animations } = useLoader(GLTFLoader, url);
  const group = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useEffect(
    () => void mixer.clipAction(animations[0], group.current).play(),
    [],
  );
  useFrame((state, delta) => {
    group.current.rotation.y +=
      Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;
    mixer.update(delta * speed);
  });

  return (
    <group ref={group} dispose={null}>
      <scene name="Scene" {...props}>
        <mesh
          name="Object_0"
          morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
          morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
          rotation={[1.5707964611537577, 0, 0]}
          geometry={nodes.Object_0.geometry}
          material={materials.Material_0_COLOR_0}
        />
      </scene>
    </group>
  );
}

function Birds() {
  return new Array(100).fill().map((_, key) => {
    const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1);
    const y = -10 + Math.random() * 20;
    const z = -5 + Math.random() * 10;
    const bird = ['Stork', 'Parrot', 'Flamingo'][Math.round(Math.random() * 2)];
    const speed = bird === 'Stork' ? 0.5 : bird === 'Flamingo' ? 2 : 5;
    const factor =
      bird === 'Stork'
        ? 0.5 + Math.random()
        : bird === 'Flamingo'
        ? 0.25 + Math.random()
        : 1 + Math.random() - 0.5;
    return (
      <Bird
        key={key}
        position={[x, y, z]}
        rotation={[0, x > 0 ? Math.PI : 0, 0]}
        speed={speed}
        factor={factor}
        url={`/${bird}.glb`}
      />
    );
  });
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Jumbo />
        <Birds />
      </Suspense>
    </Canvas>
  );
}

export default App;

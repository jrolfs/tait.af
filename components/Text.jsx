/*
  eslint-disable
  no-nested-ternary,
  no-param-reassign,
  react/prop-types,
*/

import * as THREE from 'three';
import React, { useMemo } from 'react';
import { useLoader, useUpdate } from 'react-three-fiber';

export default function Text({
  children,
  vAlign = 'center',
  hAlign = 'center',
  size = 1,
  color = '#000000', // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}) {
  const font = useLoader(THREE.FontLoader, '/bold.blob');
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font],
  );
  const mesh = useUpdate(
    self => {
      const vector = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(vector);
      self.position.x =
        hAlign === 'center'
          ? -vector.x / 2
          : hAlign === 'right'
          ? 0
          : -vector.x;
      self.position.y =
        vAlign === 'center' ? -vector.y / 2 : vAlign === 'top' ? 0 : -vector.y;
    },
    [children],
  );
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  );
}

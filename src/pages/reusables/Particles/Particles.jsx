import React from "react";
import styles from "./particles.module.css";

const Particles = () => {
  const particles = Array.from({ length: 20 }).map((_, index) => {
    const style = {
      "--n": index / 20,
      "--duration": `${Math.random() * 5 + 3}s`,
    };
    return (
      <div
        className={styles.particle}
        style={style}
        key={`particle-${index}`}
      />
    );
  });
  return <div className="particles">{particles}</div>;
};

export default Particles;

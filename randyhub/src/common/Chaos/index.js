import React from 'react';
import ReactSlider from 'react-slider';
import styles from './styles.module.scss';

const Chaos = (props) => {
  const {
    hueFilter, setHueFilter, randyCursor, setRandyCursor,
  } = props;

  return (
    <div className={`${styles.chaos}`}>
      <h3>
        Chaos
      </h3>
      <ReactSlider
        className={`${styles['horizontal-slider']}`}
        thumbClassName={`${styles['hue-shift-thumb']}`}
        trackClassName={`${styles['hue-shift-track']}`}
        onChange={(value) => { setHueFilter(value); }}
        value={hueFilter || 0}
      />
      <ReactSlider
        className={`${styles['horizontal-slider']}`}
        thumbClassName={`${styles['hue-shift-thumb']}`}
        trackClassName={`${styles['hue-shift-track']}`}
        onChange={(value) => { setRandyCursor(value); }}
        value={randyCursor || 0}
        max={1}
      />
    </div>
  );
};

export default Chaos;

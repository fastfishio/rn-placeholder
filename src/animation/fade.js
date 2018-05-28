import React from 'react';
import { Animated, View } from 'react-native';
import PropTypes from 'prop-types';

const START_VALUE = 0.5;
const END_VALUE = 1;
const DURATION = 500;
const useNativeDriver = true;

/**
 * Create a repetitive fadein / fadeout animation
 */
const Fade = ({ children, style }) => {
  const animation = new Animated.Value(START_VALUE);

  function start() {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: END_VALUE,
        duration: DURATION,
        useNativeDriver,
      }),
      Animated.timing(animation, {
        toValue: START_VALUE,
        duration: DURATION,
        useNativeDriver,
      }),
    ]).start((e) => {
      if (e.finished) {
        start();
      }
    });
  }

  start();
  const opacityAnimation = { opacity: animation };
  return <Animated.View style={[opacityAnimation, style]}>{children}</Animated.View>;
};

Fade.propTypes = {
  children: PropTypes.shape({}),
  style: View.propTypes.style,
};

Fade.defaultProps = {
  children: null,
  style: {},
};

export default Fade;

import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const START_VALUE = 0;
const END_VALUE = 100;
const DURATION = 750;

const styles = StyleSheet.create({
  shine: {
    width: 30,
    position: 'absolute',
    height: '100%',
    backgroundColor: '#ffffff',
    opacity: 0.4,
  },
});
/**
 * Create a repetitive Shine animation
 */
const Shine = ({ children, style }) => {
  const animation = new Animated.Value(0);

  function start() {
    animation.setValue(START_VALUE);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: END_VALUE,
        duration: DURATION,
      }),
    ]).start(() => {
      start();
    });
  }

  start();

  const marginLeft = animation.interpolate({
    inputRange: [START_VALUE, END_VALUE],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={style}>
      {children}
      <Animated.View style={[styles.shine, { marginLeft }]} />
    </View>
  );
};

Shine.propTypes = {
  children: PropTypes.shape({}),
  style: View.propTypes.style,
};

Shine.defaultProps = {
  children: null,
  style: {},
};

export default Shine;

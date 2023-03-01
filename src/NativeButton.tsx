import React from 'react' //'/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react/index'//
import PropTypes from "prop-types";
import createReactClass from "create-react-class";

import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableHighlight,
  Text,
  StyleSheet,
  Platform,
  View,
  TextStyle,
  TouchableWithoutFeedbackProps,
} from "react-native"; // "/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react-native"//

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 14,
    alignSelf: "center",
  },
  opacity: {
    opacity: 0.8,
  },
});

interface IPropsNativeButton { 
  underlayColor?:string;
  background?: string;
  accessibilityComponentType?:string ;
  accessibilityTraits?:any;
  disabledStyle?: any;
  children: React.ReactNode;
  textStyle: any;
} 

export class NativeButton extends React.Component<IPropsNativeButton & TouchableWithoutFeedbackProps > {
  isAndroid= Platform.OS === "android"
  constructor(props:IPropsNativeButton & TouchableWithoutFeedbackProps) {
    super(props)
  
    /* this.state = {
       
    }; */
  };
  _renderText=()=> {
    // If children is not a string don't wrapp it in a Text component
    if (typeof this.props.children !== "string") {
      return this.props.children;
    }

    return (
      <Text
        numberOfLines={1}
        ellipsizeMode={Platform.OS === "ios" ? "clip" : "tail"}
        style={[styles.textButton, this.props.textStyle]}
      >
        {this.props.children}
      </Text>
    );
  }
  render() {
    const disabledStyle = this.props.disabled
    ? this.props.disabledStyle || styles.opacity
    : {};

  // Extract Button props
    let buttonProps = {
      accessibilityComponentType: this.props.accessibilityComponentType,
      accessibilityTraits: this.props.accessibilityTraits,
      accessible: this.props.accessible,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut,
      disabled: this.props.disabled,
      hitSlop: this.props.hitSlop,
      onLayout: this.props.onLayout,
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress,
      pressRetentionOffset: this.props.pressRetentionOffset,
    };

    // Render Native Android Button
    if (this.isAndroid) {
      buttonProps = Object.assign(buttonProps, {
        background:
          this.props.background ||
          TouchableNativeFeedback.SelectableBackground(),
      });

      return (
        <TouchableNativeFeedback {...buttonProps}>
          <View style={[styles.button, this.props.style, disabledStyle]}>
            {this._renderText()}
          </View>
        </TouchableNativeFeedback>
      );
    }

    // Render default button
    return (
      <TouchableHighlight
        {...buttonProps}
        style={[styles.button, this.props.style, disabledStyle]}
        underlayColor={this.props.underlayColor}
      >
        {this._renderText()}
      </TouchableHighlight>
    );
  }
}




export default NativeButton;

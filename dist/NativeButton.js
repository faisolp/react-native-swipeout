"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //'/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react/index'//


// "/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react-native"//

var styles = _reactNative.StyleSheet.create({
  button: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center"
  },
  textButton: {
    fontSize: 14,
    alignSelf: "center"
  },
  opacity: {
    opacity: 0.8
  }
});

var NativeButton = exports.NativeButton = function (_React$Component) {
  _inherits(NativeButton, _React$Component);

  function NativeButton(props) {
    _classCallCheck(this, NativeButton);

    /* this.state = {
       
    }; */
    var _this = _possibleConstructorReturn(this, (NativeButton.__proto__ || Object.getPrototypeOf(NativeButton)).call(this, props));

    _this.isAndroid = _reactNative.Platform.OS === "android";

    _this._renderText = function () {
      // If children is not a string don't wrapp it in a Text component
      if (typeof _this.props.children !== "string") {
        return _this.props.children;
      }

      return _react2.default.createElement(
        _reactNative.Text,
        {
          numberOfLines: 1,
          ellipsizeMode: _reactNative.Platform.OS === "ios" ? "clip" : "tail",
          style: [styles.textButton, _this.props.textStyle]
        },
        _this.props.children
      );
    };

    return _this;
  }

  _createClass(NativeButton, [{
    key: "render",
    value: function render() {
      var disabledStyle = this.props.disabled ? this.props.disabledStyle || styles.opacity : {};

      // Extract Button props
      var buttonProps = {
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
        pressRetentionOffset: this.props.pressRetentionOffset
      };

      // Render Native Android Button
      if (this.isAndroid) {
        buttonProps = Object.assign(buttonProps, {
          background: this.props.background || _reactNative.TouchableNativeFeedback.SelectableBackground()
        });

        return _react2.default.createElement(
          _reactNative.TouchableNativeFeedback,
          buttonProps,
          _react2.default.createElement(
            _reactNative.View,
            { style: [styles.button, this.props.style, disabledStyle] },
            this._renderText()
          )
        );
      }

      // Render default button
      return _react2.default.createElement(
        _reactNative.TouchableHighlight,
        _extends({}, buttonProps, {
          style: [styles.button, this.props.style, disabledStyle],
          underlayColor: this.props.underlayColor
        }),
        this._renderText()
      );
    }
  }]);

  return NativeButton;
}(_react2.default.Component);

exports.default = NativeButton;
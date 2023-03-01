"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

var _NativeButton = require("./NativeButton");

var _NativeButton2 = _interopRequireDefault(_NativeButton);

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //'/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react/index'//


//"/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react-native"//

/* interface IPropsSwipeoutBtn {
        backgroundColor: string
        color: string
        component: any
        onPress: ()=>void
        text: any
        type: string
        underlayColor: string
        height:any
        width:any
        disabled:boolean
} */
var SwipeoutBtn = function (_Component) {
  _inherits(SwipeoutBtn, _Component);

  function SwipeoutBtn() {
    _classCallCheck(this, SwipeoutBtn);

    return _possibleConstructorReturn(this, (SwipeoutBtn.__proto__ || Object.getPrototypeOf(SwipeoutBtn)).apply(this, arguments));
  }

  _createClass(SwipeoutBtn, [{
    key: "render",
    value: function render() {
      var btn = this.props;

      var styleSwipeoutBtn = [_styles2.default.swipeoutBtn];

      //  apply "type" styles (delete || primary || secondary)
      if (btn.type === "delete") styleSwipeoutBtn.push(_styles2.default.colorDelete);else if (btn.type === "primary") styleSwipeoutBtn.push(_styles2.default.colorPrimary);else if (btn.type === "secondary") styleSwipeoutBtn.push(_styles2.default.colorSecondary);

      //  apply background color
      if (btn.backgroundColor) styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }]);

      styleSwipeoutBtn.push([{
        height: btn.height,
        width: btn.width
      }]);

      var styleSwipeoutBtnComponent = [];

      //  set button dimensions
      styleSwipeoutBtnComponent.push([{
        height: btn.height,
        width: btn.width
      }]);

      var styleSwipeoutBtnText = [_styles2.default.swipeoutBtnText];

      //  apply text color
      if (btn.color) styleSwipeoutBtnText.push({ color: btn.color });

      return _react2.default.createElement(
        _NativeButton2.default,
        {
          onPress: this.props.onPress,
          underlayColor: this.props.underlayColor,
          disabled: this.props.disabled,
          style: [_styles2.default.swipeoutBtnTouchable, styleSwipeoutBtn],
          textStyle: styleSwipeoutBtnText
        },
        btn.component ? _react2.default.createElement(
          _reactNative.View,
          { style: styleSwipeoutBtnComponent },
          btn.component
        ) : btn.text
      );
    }
  }]);

  return SwipeoutBtn;
}(_react.Component);

exports.default = SwipeoutBtn;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactTweenState = require("react-tween-state");

var _reactTweenState2 = _interopRequireDefault(_reactTweenState);

var _SwipeoutBtn = require("./SwipeoutBtn");

var _SwipeoutBtn2 = _interopRequireDefault(_SwipeoutBtn);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import NativeButton from "./NativeButton";
//'/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react/index'//
//import PropTypes from "prop-types";
//import createReactClass from "create-react-class";

//"/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react-native"//

/* interface IPropsSwipeout {
  autoClose: boolean
  backgroundColor: string
  close: boolean
  left: any[]
  onOpen: (sectionID:string, rowID:string, direction?:TDirection)=>void
  onClose: (sectionID:string, rowID:string, direction?:TDirection)=>void
  right: any[]
  scroll: (val:boolean)=>void
  style: any
  sensitivity: number
  buttonWidth: number
  disabled: boolean
  sectionID:string
  rowID:string
  children?:any,
} */
var Swipeout = function (_Component) {
  _inherits(Swipeout, _Component);

  function Swipeout(props) {
    _classCallCheck(this, Swipeout);

    var _this = _possibleConstructorReturn(this, (Swipeout.__proto__ || Object.getPrototypeOf(Swipeout)).call(this, props));

    _this.mixins = [_reactTweenState2.default.Mixin];
    _this.swipeoutContent = null;
    _this._panResponder = null;

    _this.componentDidMount = function () {
      _this._panResponder = _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder(event, gestureState) {
          return true;
        },
        onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture(event, gestureState) {
          return _this.state.openedLeft || _this.state.openedRight;
        },
        onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture(event, gestureState) {
          return Math.abs(gestureState.dx) > (_this.props.sensitivity || 0) && Math.abs(gestureState.dy) <= (_this.props.sensitivity || 0);
        },
        onPanResponderGrant: _this._handlePanResponderGrant,
        onPanResponderMove: _this._handlePanResponderMove,
        onPanResponderRelease: _this._handlePanResponderEnd,
        onPanResponderTerminate: _this._handlePanResponderEnd,
        onShouldBlockNativeResponder: function onShouldBlockNativeResponder(event, gestureState) {
          return false;
        },
        onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
          return false;
        }
      });
    };

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.close) _this._close();
      if (prevProps.openRight) _this._openRight();
      if (prevProps.openLeft) _this._openLeft();
    };

    _this._handlePanResponderGrant = function (e, gestureState) {
      //_handlePanResponderGrant: function (e: Object, gestureState: Object) {
      if (_this.props.disabled) return;
      if (!_this.state.openedLeft && !_this.state.openedRight) {
        _this._callOnOpen();
      } else {
        _this._callOnClose();
      }
      _this.swipeoutContent.measure(function (ox, oy, width, height) {
        var buttonWidth = _this.props.buttonWidth || width / 5;
        _this.setState({
          btnWidth: buttonWidth,
          btnsLeftWidth: _this.props.left ? buttonWidth * _this.props.left.length : 0,
          btnsRightWidth: _this.props.right ? buttonWidth * _this.props.right.length : 0,
          swiping: true,
          timeStart: new Date().getTime()
        });
      });
    };

    _this._handlePanResponderMove = function (e, gestureState) {
      //_handlePanResponderMove: function (e: Object, gestureState: Object) {
      if (_this.props.disabled) return;
      var posX = gestureState.dx;
      var posY = gestureState.dy;
      var leftWidth = _this.state.btnsLeftWidth;
      var rightWidth = _this.state.btnsRightWidth;
      if (_this.state.openedRight) posX = gestureState.dx - rightWidth;else if (_this.state.openedLeft) posX = gestureState.dx + leftWidth;

      //  prevent scroll if moveX is true
      var moveX = Math.abs(posX) > Math.abs(posY);
      if (_this.props.scroll) {
        if (moveX) _this.props.scroll(false);else _this.props.scroll(true);
      }
      if (_this.state.swiping) {
        //  move content to reveal swipeout
        if (posX < 0 && _this.props.right) {
          _this.setState({ contentPos: Math.min(posX, 0) });
        } else if (posX > 0 && _this.props.left) {
          _this.setState({ contentPos: Math.max(posX, 0) });
        }
      }
    };

    _this._handlePanResponderEnd = function (e, gestureState) {
      if (_this.props.disabled) return;
      var posX = gestureState.dx;
      var contentPos = _this.state.contentPos;
      var contentWidth = _this.state.contentWidth;
      var btnsLeftWidth = _this.state.btnsLeftWidth;
      var btnsRightWidth = _this.state.btnsRightWidth;

      //  minimum threshold to open swipeout
      var openX = contentWidth * 0.33;

      //  should open swipeout
      var openLeft = posX > openX || posX > btnsLeftWidth / 2;
      var openRight = posX < -openX || posX < -btnsRightWidth / 2;

      //  account for open swipeouts
      if (_this.state.openedRight) var openRight = posX - openX < -openX;
      if (_this.state.openedLeft) var openLeft = posX + openX > openX;

      //  reveal swipeout on quick swipe
      var timeDiff = new Date().getTime() - (_this.state.timeStart || 0) < 200;
      if (timeDiff) {
        var openRight = posX < -openX / 10 && !_this.state.openedLeft;
        var openLeft = posX > openX / 10 && !_this.state.openedRight;
      }

      if (_this.state.swiping) {
        if (openRight && contentPos < 0 && posX < 0) {
          _this._open(-btnsRightWidth, "right");
        } else if (openLeft && contentPos > 0 && posX > 0) {
          _this._open(btnsLeftWidth, "left");
        } else {
          _this._close();
        }
      }

      //  Allow scroll
      if (_this.props.scroll) _this.props.scroll(true);
    };

    _this._tweenContent = function (state, endValue) {
      (0, _reactTweenState2.default)(state, {
        easing: _reactTweenState2.default.easingTypes.easeInOutQuad,
        duration: endValue === 0 ? _this.state.tweenDuration * 1.5 : _this.state.tweenDuration,
        endValue: endValue
      });
    };

    _this._rubberBandEasing = function (valueArg, limit) {
      var value = valueArg.toString() === "NaN" ? 0 : valueArg;
      if (value < 0 && value < limit) return limit - Math.pow(limit - value, 0.85);else if (value > 0 && value > limit) return limit + Math.pow(value - limit, 0.85);
      return value;
    };

    _this._autoClose = function (btn) {
      if (_this.state.autoClose) _this._close();
      var onPress = btn.onPress;
      if (onPress) onPress();
    };

    _this._open = function (contentPos, direction) {
      var left = direction === "left";
      var _this$props = _this.props,
          sectionId = _this$props.sectionId,
          rowId = _this$props.rowId,
          onOpen = _this$props.onOpen;


      onOpen && sectionId && rowId && onOpen(sectionId, rowId, direction);
      _this._tweenContent("contentPos", contentPos);
      _this.setState({
        contentPos: contentPos,
        openedLeft: left,
        openedRight: !left,
        swiping: false
      });
    };

    _this._close = function () {
      var _this$props2 = _this.props,
          sectionId = _this$props2.sectionId,
          rowId = _this$props2.rowId,
          onClose = _this$props2.onClose;
      //const sectionId =this.props.sectionId||0
      //const rowId =this.props.rowId||0

      if (onClose && sectionId && rowId && (_this.state.openedLeft || _this.state.openedRight)) {
        var _direction = _this.state.openedRight ? "right" : "left";
        onClose(sectionId, rowId, _direction);
      }
      _this._tweenContent("contentPos", 0);
      _this._callOnClose();
      _this.setState({
        openedRight: false,
        openedLeft: false,
        swiping: false
      });
    };

    _this._callOnClose = function () {
      var _this$props3 = _this.props,
          sectionId = _this$props3.sectionId,
          rowId = _this$props3.rowId,
          onClose = _this$props3.onClose;

      var direction = _this.state.openedRight ? "right" : "left";
      if (onClose && rowId && sectionId) onClose(sectionId, rowId, direction);
    };

    _this._callOnOpen = function () {
      var _this$props4 = _this.props,
          sectionId = _this$props4.sectionId,
          rowId = _this$props4.rowId,
          onOpen = _this$props4.onOpen;

      var direction = _this.state.openedRight ? "right" : "left";
      if (onOpen && rowId && sectionId) onOpen(sectionId, rowId, direction);
    };

    _this._openRight = function () {
      _this.swipeoutContent.measure(function (ox, oy, width, height) {
        var btnWidth = _this.props.buttonWidth || width / 5;

        _this.setState({
          btnWidth: btnWidth,
          btnsRightWidth: _this.props.right ? btnWidth * _this.props.right.length : 0
        }, function () {
          _this._tweenContent("contentPos", -_this.state.btnsRightWidth);
          _this._callOnOpen();
          _this.setState({
            contentPos: -_this.state.btnsRightWidth,
            openedLeft: false,
            openedRight: true,
            swiping: false
          });
        });
      });
    };

    _this._openLeft = function () {
      _this.swipeoutContent.measure(function (ox, oy, width, height) {
        var btnWidth = _this.props.buttonWidth || width / 5;

        _this.setState({
          btnWidth: btnWidth,
          btnsLeftWidth: _this.props.left ? btnWidth * _this.props.left.length : 0
        }, function () {
          _this._tweenContent("contentPos", _this.state.btnsLeftWidth);
          _this._callOnOpen();
          _this.setState({
            contentPos: _this.state.btnsLeftWidth,
            openedLeft: true,
            openedRight: false,
            swiping: false
          });
        });
      });
    };

    _this._onLayout = function (event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
          width = _event$nativeEvent$la.width,
          height = _event$nativeEvent$la.height;

      _this.setState({
        contentWidth: width,
        contentHeight: height
      });
    };

    _this._renderButtons = function (buttons, isVisible, style) {
      if (buttons && isVisible) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: style },
          buttons.map(_this._renderButton)
        );
      } else {
        return _react2.default.createElement(_reactNative.View, null);
      }
    };

    _this._renderButton = function (btn, i) {
      return _react2.default.createElement(_SwipeoutBtn2.default, {
        backgroundColor: btn.backgroundColor,
        color: btn.color,
        component: btn.component,
        disabled: btn.disabled,
        height: _this.state.contentHeight,
        key: i,
        onPress: function onPress() {
          return _this._autoClose(btn);
        },
        text: btn.text,
        type: btn.type,
        underlayColor: btn.underlayColor,
        width: _this.state.btnWidth
      });
    };

    _this.state = {
      autoClose: _this.props.autoClose || false,
      btnWidth: 0,
      btnsLeftWidth: 0,
      btnsRightWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: 0,
      openedRight: false,
      openedLeft: false,
      swiping: false,
      tweenDuration: 160
      //timeStart: null,
    };
    return _this;
  }

  //_handlePanResponderEnd: function (e: Object, gestureState: Object) {


  //  close swipeout on button press


  _createClass(Swipeout, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var contentWidth = this.state.contentWidth;
      var posX = (0, _reactTweenState.getTweeningValue)("contentPos");

      var styleSwipeout = [_styles2.default.swipeout, this.props.style];
      if (this.props.backgroundColor) {
        styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }]);
      }

      var limit = -this.state.btnsRightWidth;
      if (posX > 0) limit = this.state.btnsLeftWidth;

      var styleLeftPos = {
        left: {
          left: 0,
          overflow: "hidden",
          width: Math.min(limit * (posX / limit), limit)
        }
      };
      var styleRightPos = {
        right: {
          left: Math.abs(contentWidth + Math.max(limit, posX)),
          right: 0
        }
      };
      var styleContentPos = {
        content: {
          transform: [{ translateX: this._rubberBandEasing(posX, limit) }]
        }
      };

      var styleContent = [_styles2.default.swipeoutContent];
      styleContent.push(styleContentPos.content);

      var styleRight = [_styles2.default.swipeoutBtns];
      styleRight.push(styleRightPos.right);

      var styleLeft = [_styles2.default.swipeoutBtns];
      styleLeft.push(styleLeftPos.left);

      var isRightVisible = posX < 0;
      var isLeftVisible = posX > 0;
      if (!this._panResponder) return _react2.default.createElement(_reactNative.View, { style: styleSwipeout });
      return _react2.default.createElement(
        _reactNative.View,
        { style: styleSwipeout },
        _react2.default.createElement(
          _reactNative.View,
          _extends({
            ref: function ref(node) {
              return _this2.swipeoutContent = node;
            },
            style: styleContent,
            onLayout: this._onLayout
          }, this._panResponder.panHandlers),
          this.props.children
        ),
        this._renderButtons(this.props.right, isRightVisible, styleRight),
        this._renderButtons(this.props.left, isLeftVisible, styleLeft)
      );
    }
  }]);

  return Swipeout;
}(_react.Component);

exports.default = Swipeout;
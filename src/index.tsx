import tweenState,{getTweeningValue} from "react-tween-state";
//import NativeButton from "./NativeButton";
import SwipeoutBtn, { SwipeoutButtonProperties } from "./SwipeoutBtn";
import styles from "./styles";

import React, { Component } from 'react' //'/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react/index'//
//import PropTypes from "prop-types";
//import createReactClass from "create-react-class";

import {
  PanResponder,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from  "react-native"; //"/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react-native"//

type TDirection = "right" | "left"

export interface SwipeoutProperties {
  autoClose?: boolean;
  backgroundColor?: string;
  close?: boolean;
  disabled?: boolean;
  left?: SwipeoutButtonProperties[];
  onOpen?:(sectionId: number, rowId: number, direction: string)=> void;
  onClose?:(sectionId: number, rowId: number, direction: string)=> void;
  right?: SwipeoutButtonProperties[];
  scroll?:(scrollEnabled: boolean)=> void;
  style?: Object;
  sensitivity?: number;
  buttonWidth?: number;
  rowId?: number;
  sectionId?: number;
  openRight?: boolean;
  openLeft?: boolean;
  children: React.ReactNode; // 👈️ added type for children
}                                   





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
interface IStateSwipeout {
  autoClose:boolean,
  btnWidth: number,
  btnsLeftWidth: number,
  btnsRightWidth: number,
  contentHeight: number,
  contentPos: number,
  contentWidth: number,
  openedRight: boolean,
  openedLeft:boolean,
  swiping: boolean,
  tweenDuration: number,
  timeStart?:number,
  
 
}

 class Swipeout extends Component<SwipeoutProperties,IStateSwipeout> {
  mixins= [tweenState.Mixin]
  swipeoutContent: any=null
  _panResponder:any =null
  constructor(props:SwipeoutProperties) {
    super(props)
  
    this.state = {
      autoClose: this.props.autoClose || false,
      btnWidth: 0,
      btnsLeftWidth: 0,
      btnsRightWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: 0,
      openedRight: false,
      openedLeft:false,
      swiping: false,
      tweenDuration: 160,
      //timeStart: null,
    }
  }

  componentDidMount =()=>{
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) =>
        this.state.openedLeft || this.state.openedRight,
      onMoveShouldSetPanResponderCapture: (event, gestureState) =>
        Math.abs(gestureState.dx) > (this.props.sensitivity||0) &&
        Math.abs(gestureState.dy) <= (this.props.sensitivity||0),
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: (event, gestureState) => false,
      onPanResponderTerminationRequest: () => false,
    });
  }
  componentDidUpdate=(prevProps:SwipeoutProperties)=>{
    if (prevProps.close) this._close();
    if (prevProps.openRight) this._openRight();
    if (prevProps.openLeft) this._openLeft();
  }


  _handlePanResponderGrant=  (e, gestureState) =>{
    //_handlePanResponderGrant: function (e: Object, gestureState: Object) {
      if (this.props.disabled) return;
      if (!this.state.openedLeft && !this.state.openedRight) {
        this._callOnOpen();
      } else {
        this._callOnClose();
      }
      this.swipeoutContent.measure((ox, oy, width, height) => {
        let buttonWidth = this.props.buttonWidth || width / 5;
        this.setState({
          btnWidth: buttonWidth,
          btnsLeftWidth: this.props.left
            ? buttonWidth * this.props.left.length
            : 0,
          btnsRightWidth: this.props.right
            ? buttonWidth * this.props.right.length
            : 0,
          swiping: true,
          timeStart: new Date().getTime(),
        });
      });
  }
  
  _handlePanResponderMove= (e, gestureState)=> {
    //_handlePanResponderMove: function (e: Object, gestureState: Object) {
      if (this.props.disabled) return;
      var posX = gestureState.dx;
      var posY = gestureState.dy;
      var leftWidth = this.state.btnsLeftWidth;
      var rightWidth = this.state.btnsRightWidth;
      if (this.state.openedRight)  
          posX = gestureState.dx - rightWidth;
      else if (this.state.openedLeft)  posX = gestureState.dx + leftWidth;
  
      //  prevent scroll if moveX is true
      var moveX = Math.abs(posX) > Math.abs(posY);
      if (this.props.scroll) {
        if (moveX) this.props.scroll(false);
        else this.props.scroll(true);
      }
      if (this.state.swiping) {
        //  move content to reveal swipeout
        if (posX < 0 && this.props.right) {
          this.setState({ contentPos: Math.min(posX, 0) });
        } else if (posX > 0 && this.props.left) {
          this.setState({ contentPos: Math.max(posX, 0) });
        }
      }
  }
  
    //_handlePanResponderEnd: function (e: Object, gestureState: Object) {
  _handlePanResponderEnd= (e, gestureState) =>{
      if (this.props.disabled) return;
      var posX = gestureState.dx;
      var contentPos = this.state.contentPos;
      var contentWidth = this.state.contentWidth;
      var btnsLeftWidth = this.state.btnsLeftWidth;
      var btnsRightWidth = this.state.btnsRightWidth;
  
      //  minimum threshold to open swipeout
      var openX = contentWidth * 0.33;
  
      //  should open swipeout
      var openLeft = posX > openX || posX > btnsLeftWidth / 2;
      var openRight = posX < -openX || posX < -btnsRightWidth / 2;
  
      //  account for open swipeouts
      if (this.state.openedRight) var openRight = posX - openX < -openX;
      if (this.state.openedLeft) var openLeft = posX + openX > openX;
  
      //  reveal swipeout on quick swipe
      var timeDiff = new Date().getTime() - (this.state.timeStart||0) < 200;
      if (timeDiff) {
        var openRight = posX < -openX / 10 && !this.state.openedLeft;
        var openLeft = posX > openX / 10 && !this.state.openedRight;
      }
  
      if (this.state.swiping) {
        if (openRight && contentPos < 0 && posX < 0) {
          this._open(-btnsRightWidth, "right");
        } else if (openLeft && contentPos > 0 && posX > 0) {
          this._open(btnsLeftWidth, "left");
        } else {
          this._close();
        }
      }
  
      //  Allow scroll
      if (this.props.scroll) this.props.scroll(true);
  }
  
  _tweenContent=  (state, endValue) =>{
      tweenState(state, {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration:
          endValue === 0
            ? this.state.tweenDuration * 1.5
            : this.state.tweenDuration,
        endValue: endValue,
      });
  }
  
  _rubberBandEasing=  (valueArg, limit)=> {
      var value = valueArg.toString() === "NaN" ? 0 : valueArg;
      if (value < 0 && value < limit)
        return limit - Math.pow(limit - value, 0.85);
      else if (value > 0 && value > limit)
        return limit + Math.pow(value - limit, 0.85);
      return value;
  }
  
    //  close swipeout on button press
  _autoClose=  (btn)=>{
      if (this.state.autoClose) this._close();
      var onPress = btn.onPress;
      if (onPress) onPress();
  }
  
  _open=  (contentPos, direction) =>{
      const left = direction === "left";
      const {sectionId,rowId, onOpen } = this.props;
   
      onOpen && sectionId && rowId && onOpen(sectionId, rowId, direction);
      this._tweenContent("contentPos", contentPos);
      this.setState({
        contentPos,
        openedLeft: left,
        openedRight: !left,
        swiping: false,
      });
  }
  
  _close= () =>{
      const { sectionId, rowId, onClose } = this.props;
      //const sectionId =this.props.sectionId||0
      //const rowId =this.props.rowId||0
      if (onClose && 
          sectionId &&  
          rowId &&
          (this.state.openedLeft || this.state.openedRight)) {
        const direction:TDirection= this.state.openedRight ? "right" : "left";
        onClose(sectionId, rowId, direction);
      }
      this._tweenContent("contentPos", 0);
      this._callOnClose();
      this.setState({
        openedRight: false,
        openedLeft: false,
        swiping: false,
      });
  }
  
  _callOnClose= () =>{
      const { sectionId, rowId, onClose } = this.props;
      const direction:TDirection= this.state.openedRight ? "right" : "left";
      if (onClose && rowId && sectionId) 
        onClose(sectionId, rowId,direction);
  }
  
  _callOnOpen=  ()=> {
    const { sectionId, rowId, onOpen } = this.props;
    const direction:TDirection= this.state.openedRight ? "right" : "left";
      if (onOpen && rowId && sectionId) 
        onOpen(sectionId,rowId,direction);
  }
  
  _openRight=  ()=> {
      this.swipeoutContent.measure((ox, oy, width, height) => {
        let btnWidth = this.props.buttonWidth || width / 5;
  
        this.setState(
          {
            btnWidth,
            btnsRightWidth: this.props.right
              ? btnWidth * this.props.right.length
              : 0,
          },
          () => {
            this._tweenContent("contentPos", -this.state.btnsRightWidth);
            this._callOnOpen();
            this.setState({
              contentPos: -this.state.btnsRightWidth,
              openedLeft: false,
              openedRight: true,
              swiping: false,
            });
          }
        );
      });
  }
  
  _openLeft= () =>{
      this.swipeoutContent.measure((ox, oy, width, height) => {
        let btnWidth = this.props.buttonWidth || width / 5;
  
        this.setState(
          {
            btnWidth,
            btnsLeftWidth: this.props.left
              ? btnWidth * this.props.left.length
              : 0,
          },
          () => {
            this._tweenContent("contentPos", this.state.btnsLeftWidth);
            this._callOnOpen();
            this.setState({
              contentPos: this.state.btnsLeftWidth,
              openedLeft: true,
              openedRight: false,
              swiping: false,
            });
          }
        );
      });
    }


  _onLayout=  (event) =>{
      var { width, height } = event.nativeEvent.layout;
      this.setState({
        contentWidth: width,
        contentHeight: height,
      });
  }
  
  _renderButtons=  (buttons, isVisible, style)=> {
      if (buttons && isVisible) {
        return <View style={style}>{buttons.map(this._renderButton)}</View>;
      } else {
        return <View />;
      }
  }
  
  _renderButton=  (btn, i) =>{
      return (
        <SwipeoutBtn
          backgroundColor={btn.backgroundColor}
          color={btn.color}
          component={btn.component}
          disabled={btn.disabled}
          height={this.state.contentHeight}
          key={i}
          onPress={() => this._autoClose(btn)}
          text={btn.text}
          type={btn.type}
          underlayColor={btn.underlayColor}
          width={this.state.btnWidth}
        />
      );
  }

  render() {
    var contentWidth = this.state.contentWidth;
    var posX = getTweeningValue("contentPos");

    var styleSwipeout = [styles.swipeout, this.props.style];
    if (this.props.backgroundColor) {
      styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }]);
    }

    var limit = -this.state.btnsRightWidth;
    if (posX > 0)  limit = this.state.btnsLeftWidth;

    var styleLeftPos = {
      left: {
        left: 0,
        overflow: "hidden",
        width: Math.min(limit * (posX / limit), limit),
      },
    };
    var styleRightPos = {
      right: {
        left: Math.abs(contentWidth + Math.max(limit, posX)),
        right: 0,
      },
    };
    var styleContentPos = {
      content: {
        transform: [{ translateX: this._rubberBandEasing(posX, limit) }],
      },
    };

    var styleContent = [styles.swipeoutContent];
    styleContent.push(styleContentPos.content);

    var styleRight = [styles.swipeoutBtns];
    styleRight.push(styleRightPos.right);

    var styleLeft = [styles.swipeoutBtns];
    styleLeft.push(styleLeftPos.left);

    var isRightVisible = posX < 0;
    var isLeftVisible = posX > 0;
    if(!this._panResponder)
      return(<View style={styleSwipeout}></View>)
    return (
      <View style={styleSwipeout}>
        <View
          ref={(node) => (this.swipeoutContent = node)}
          style={styleContent}
          onLayout={this._onLayout}
          {...this._panResponder.panHandlers}
        >
          {this.props.children}
        </View>
        {this._renderButtons(this.props.right, isRightVisible, styleRight)}
        {this._renderButtons(this.props.left, isLeftVisible, styleLeft)}
      </View>
    );
  }
}

export default Swipeout;

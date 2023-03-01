import React, { Component } from 'react' //'/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react/index'//
import styles from "./styles";
import NativeButton from "./NativeButton";

import {

    View,
  } from  "react-native"; //"/Users/faisolphalawon/Library/Caches/typescript/4.9/node_modules/@types/react-native"//
  
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
    export interface SwipeoutButtonProperties {
        backgroundColor?: string;
        color?: string;
        component?: React.JSX.Element;
        onPress?:()=> void;
        text?: React.ReactNode;
        type?: 'default'|'delete'|'primary'|'secondary';
        underlayColor?: string;
        disabled?: boolean;
        height?:any;
        width?:any;
    }
  
  class SwipeoutBtn extends Component<SwipeoutButtonProperties> {
  
    render() {
      var btn = this.props;
  
      var styleSwipeoutBtn = [styles.swipeoutBtn];
  
      //  apply "type" styles (delete || primary || secondary)
      if (btn.type === "delete") styleSwipeoutBtn.push(styles.colorDelete);
      else if (btn.type === "primary") styleSwipeoutBtn.push(styles.colorPrimary);
      else if (btn.type === "secondary")
        styleSwipeoutBtn.push(styles.colorSecondary);
  
      //  apply background color
      if (btn.backgroundColor)
        styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }]);
  
      styleSwipeoutBtn.push([
        {
          height: btn.height,
          width: btn.width,
        },
      ]);
  
      let styleSwipeoutBtnComponent:any[] = [];
  
      //  set button dimensions
      styleSwipeoutBtnComponent.push([
        {
          height: btn.height,
          width: btn.width,
        },
      ]);
  
      var styleSwipeoutBtnText = [styles.swipeoutBtnText];
  
      //  apply text color
      if (btn.color) styleSwipeoutBtnText.push({ color: btn.color });
  
      return (
        <NativeButton
          onPress={this.props.onPress}
          underlayColor={this.props.underlayColor}
          disabled={this.props.disabled}
          style={[styles.swipeoutBtnTouchable, styleSwipeoutBtn]}
          textStyle={styleSwipeoutBtnText}
        >
          {btn.component ? (
            <View style={styleSwipeoutBtnComponent}>{btn.component}</View>
          ) : (
            btn.text
          )}
        </NativeButton>
      );
    }
    
  }

  export default  SwipeoutBtn
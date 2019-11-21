import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome5";

function TabIcon(props) {
  return (
    <Icon
      name={props.name}
      size={26}
      color={props.focused ? "#fc6663" : "#999"}
    />
  );
}

export default TabIcon;

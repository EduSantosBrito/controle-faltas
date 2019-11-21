import styled from "styled-components";
import { TouchableOpacity } from "react-native";

const FloatingButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 10;
  right: 10;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  padding: 15px 0px;
  background-color: #fc6663;
`;

export default FloatingButton;

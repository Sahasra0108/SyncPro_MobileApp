import { TouchableOpacity, Text, View,StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Button = (props) => {
  return (
    <TouchableOpacity style={style.button} onPress={props.onPress}>
      <Text>{props.name}</Text>
      <Icon name="right" size={15} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between text and icon
    alignItems: "center",
    paddingLeft: 20,
    padding: 5,
    margin: 3,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    width: 360,
    height:50,
    fontSize:18
  },

});

export default Button;

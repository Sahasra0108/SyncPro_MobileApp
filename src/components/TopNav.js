import { Appbar, BottomNavigation } from "react-native-paper";
import SearchBar from "./SearchBar";
import Search from "../screens/Search";

function TopNav() {
  return (
    <Appbar.Header>
      <Search />
      <Appbar.Action icon="bell" onPress={() => {}} />
    </Appbar.Header>
  );
}

export default TopNav;

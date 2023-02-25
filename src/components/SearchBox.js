import { Input } from "antd";
const { Search } = Input;

function SearchBox() {
  const onSearch = (value) => console.log(value);
  return <Search placeholder="Search" onSearch={onSearch} enterButton />;
}

export default SearchBox;

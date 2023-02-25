/**

Import the Select component from Ant Design library
*/
import { Select } from "antd";
/**

AntdSelect functional component receives an options array and returns a Select 
component with options mapped from the array.
@param {Array} options - An array of options to be displayed in the Select component.
@returns {JSX.Element} - A Select component from Ant Design library with options mapped 
                        from the options array.
*/
const AntdSelect = ({ options }) => {
  return (
    <Select
      style={{ minWidth: "200px" }}
      defaultValue={options && options[0]}
      options={
        options &&
        options.map((oneOption, index) => ({
          key: index,
          value: oneOption,
          label: oneOption,
        }))
      }
    />
  );
};
/**

Export the AntdSelect component as default.
*/
export default AntdSelect;

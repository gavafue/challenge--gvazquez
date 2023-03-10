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
const AntdSelect = ({
  options,
  value,
  handleChange,
  className,
  placeholder,
  showSearch,
}) => {
  return (
    <Select
      showSearch={showSearch && showSearch}
      className={className}
      value={value || undefined}
      placeholder={placeholder && placeholder}
      onChange={handleChange && handleChange}
      options={
        options &&
        options?.map((oneOption, index) => ({
          key: index,
          value: oneOption.value,
          label: oneOption.label,
        }))
      }
    />
  );
};
/**

Export the AntdSelect component as default.
*/
export default AntdSelect;

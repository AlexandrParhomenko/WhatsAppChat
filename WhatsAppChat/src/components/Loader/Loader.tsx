import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = ({...props}) => {
  return (
    <Spin {...props} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} className="spinner" />
  );
};

export default Loader;
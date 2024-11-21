import { Empty } from "antd";

const NotFoundPage = () => {
  return (
    <Empty className={"notFoundBox"} imageStyle={{color: 'red'}} description='Нет данных'/>
  );
};

export default NotFoundPage;
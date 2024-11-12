import { useRef, useState } from "react";
import { Button, Form, FormInstance, Input } from "antd";
import capitalize from "antd/es/_util/capitalize";

const AuthPage = () => {
  const ref = useRef<FormInstance>(null);
  // const navigate = useNavigate();
  const [authError, setAuthError] = useState<string>();
  // const dispatch = useDispatch();

  const onAuth = async () => {

  };


  return (
    <div className={"authWrapper"}>
      <div className={"authWindow"}>
        <Form scrollToFirstError={{
          behavior: "smooth",
          block: "center",
          inline: "center"
        }} ref={ref} tabIndex={0} onFinish={onAuth} className={"authForm"} layout={"vertical"}>
          <Form.Item className={"authInputBar"}
                     name={"user_login"}
                     hasFeedback
                     rules={[
                       {
                         required: true,
                         message: "Введите логин"
                       },
                       { type: "email" },
                       { whitespace: true, message: "Логин не может быть пустым" }
                     ]}
                     label={"Логин"}>
            <Input onClick={() => setAuthError("")}></Input>
          </Form.Item>
          <Form.Item className={"authInputBar"}
                     label={"Пароль"}
                     name={"user_password"}
                     hasFeedback
                     rules={[
                       { required: true, message: "Пароль не может быть пустым" },
                       { min: 5, message: "Пароль не может быть короче 5 символов" }
                     ]}>
            <Input.Password autoFocus onPressEnter={() => {
              if (ref.current) {
                ref.current.submit();
              }
            }} onClick={() => setAuthError("")} />
          </Form.Item>
          {authError ? <span className={"authFailFont"}>{capitalize(authError)}</span> : ""}
          <Button htmlType="submit"
                  className="submitBtn">Войти</Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
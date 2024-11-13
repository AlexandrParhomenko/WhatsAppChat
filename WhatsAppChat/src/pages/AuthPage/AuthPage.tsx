import {useRef} from "react";
import {Button, Form, FormInstance, Input} from "antd";
import InputMask from "react-input-mask";
import {setAuthData} from "../../store/reducers/authSlice.ts";
import {Login} from "../../types/types.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    const ref = useRef<FormInstance>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onAuth = (values: Login) => {
        dispatch(setAuthData(values))
        navigate("/chat")
    };

    return (
        <div style={{height: "100%", width: "100%"}}>
            <div className={"authWrapper"}>
                <div className={"authWindow"}>
                    <Form scrollToFirstError={{
                        behavior: "smooth",
                        block: "center",
                        inline: "center"
                    }} ref={ref} tabIndex={0} onFinish={onAuth} className={"authForm"} layout={"vertical"}>
                        <Form.Item className={"authInputBar"}
                                   name={"user_id"}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите id"
                                       },
                                       {whitespace: true, message: "Id не может быть пустым"}
                                   ]}
                                   label={"Id пользователя"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item className={"authInputBar"}
                                   label={"Токен пользователя"}
                                   name={"user_token"}
                                   hasFeedback
                                   rules={[
                                       {required: true, message: "Введите токен"}
                                   ]}>
                            <Input.Password autoFocus onPressEnter={() => {
                                if (ref.current) {
                                    ref.current.submit();
                                }
                            }}/>
                        </Form.Item>
                        <Form.Item className={"authInputBar"}
                                   label={"Номер получателя"}
                                   name={"phone"}
                                   hasFeedback
                                   rules={[
                                       {required: true, message: "Введите номер телефона"},
                                       {min: 10, message: "Номер телефона нужно заполнить полностью"}
                                   ]}>
                            <InputMask className="phoneInput" mask="+7 (999) 999-99-99"
                                       placeholder={"+7 (___) ___-__-__"}/>
                        </Form.Item>
                        <Button htmlType="submit"
                                className="submitBtn">Войти</Button>
                    </Form>
                </div>
            </div>

        </div>
    );
};

export default AuthPage;
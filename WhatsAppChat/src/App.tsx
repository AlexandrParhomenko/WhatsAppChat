import './styles/App.css'
import './styles/styles.scss'
import {RouterProvider} from "react-router-dom";
import router from "./router/router.tsx";
import {ConfigProvider} from "antd";

function App() {

    return (
        <ConfigProvider theme={{
            components: {
                InputNumber: {
                    hoverBorderColor: "#25d366",
                },
                Input: {
                    hoverBorderColor: "#25d366",
                    activeBorderColor: "#25d366",

                }
            }}}>
            <RouterProvider router={router}/>
        </ConfigProvider>
    )
}

export default App

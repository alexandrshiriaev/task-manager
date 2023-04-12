import React from 'react';
import { Outlet } from "react-router-dom";

import {Layout, theme} from 'antd';
import MySider from "./components/MySider/MySider";
import MyHeader from "./components/MyHeader/MyHeader";

const {Content} = Layout;

function App() {

    const {
        token: {colorBgContainer},
    } = theme.useToken();


    return (
        <div className="App">

            <Layout style={{minHeight: "100vh"}}>
                <MySider/>
                <Layout>
                    <MyHeader/>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                            <Outlet/>
                        </div>
                    </Content>
                    {/*<Footer style={{textAlign: 'center'}}>Alexandr Shiriaev | Ant Design</Footer>*/}
                </Layout>
            </Layout>
        </div>
    );
}

export default App;

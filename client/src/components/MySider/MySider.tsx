import React, {FC, useEffect, useState} from 'react';
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";

const pagesItems = [
    {key: '/tasks', label: 'Активные',},
    {key: '/tasks/completed', label: 'Выполненые'}
]

const MySider: FC = () => {

    const location = useLocation()

    const [currentPage, setCurrentPage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        console.log(location.pathname)
        const pagesFound = pagesItems.filter(page => page.key === location.pathname)
        if (pagesFound.length) {
            setCurrentPage(location.pathname)
        }
    }, [location])

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
            }}
        >
            <div className="logo"/>
            <Menu
                selectable={false}
                theme="dark"
                mode="inline"
                selectedKeys={[currentPage]}
                items={pagesItems}
                onClick={({key}) => {
                    navigate(key)
                }}
            />
        </Sider>
    );
};

export default MySider;
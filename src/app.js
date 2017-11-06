import React, {Component} from 'react'
import { Layout, Menu} from 'antd';
const { Header, Content, Footer } = Layout;
import { HashRouter as Router, Link, Route } from 'react-router-dom'//引入React-router-dom组件
import './css/App.css'
//导入自定义的组件
import HomeContainer from './component/home/HomeContainer.js'
import MovieContainer from './component/movie/MovieContainer.js'
import AboutContainer from './component/about/AboutContainer.js'


export default class App extends Component{
    render(){
        return <Router>
            <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/movie/in_theaters">电影</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/about">关于</Link></Menu.Item>
            </Menu>
            </Header>
            <Content style={{ height:'100%' }}>
            <div style={{ background: '#fff', minHeight: 28, height:'100%' }}>
            {/* exact使用路由的绝对匹配 */}
                <Route exact path="/" component={HomeContainer}>Content1</Route>
                <Route path="/movie" component={MovieContainer}>Content2</Route>
                <Route path="/about" component={AboutContainer}>Content3</Route>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                focusdroid ©2017 王旭
            </Footer>
        </Layout>
        </Router>
    }
}

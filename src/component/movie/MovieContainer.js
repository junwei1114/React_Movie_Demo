import React, {Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import {Link, Route} from 'react-router-dom' //

import MovieList from './MovieList.js'
import MovieDateil from './MovieDateil.js'
export default class MovieContainer extends Component {
    render(){
        return <Layout style={{height:'100%'}}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 1 }}>
            <Menu.Item key="1"><Link to="/movie/in_theaters">正在热映</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/movie/coming_soon">即将上映</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/movie/top250">top250</Link></Menu.Item>
        </Menu>
      </Sider>
    <Layout style={{height:'100%'}}>
        <Content style={{background:'#fff',padding:10,margin:0,height:'100%'}}>
            <Route exact path="/movie/:type" component={MovieList}></Route>
            <Route path="/movie/moviedetail/:id" component={MovieDateil}></Route>
        </Content>
    </Layout>
  </Layout>
    }
}
import React, {Component} from 'react'
import { Button, Alert, Icon, Spin } from 'antd';

import MovieDataServices from '../../dataServer/getMovieData.js'

export default class MovieDateil extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieId:this.props.match.params.id,
            movieInfo:{}, //电影详情
            isLoading:true,
        }
    }
    render(){
        return <div>
          <Button type="primary" onClick={this.goBack}>
            <Icon type="left" />返回上一页
          </Button>
            {/* MovieDateil--{this.props.match.params.id} */}
            {this.createMovieDetail()}
        </div>
    }
//返回上一页的按钮
    goBack = ()=>{
        // this.props.history.go(-1);
        this.props.history.goBack();
    }
    //获取电影数据
    componentDidMount(){
        var promise = MovieDataServices.getMovieListById(this.state.movieId);
        // console.log(promise);
        promise.then((data)=>{
            this.setState({
                movieInfo:data,
                isLoading:false
            })
        });
        
    }
    //现实电影详细信息的页面
    createMovieDetail = ()=>{
        if(this.state.isLoading){
            return <Spin tip="Loading...">
            <Alert
              message="正在请求列表数据"
              description="请稍等..."
              type="info"
            />
          </Spin>
        }else{
            return <div>
                <h1 style={{textAlign:'center', marginTop:10, marginBottom:20}}>{this.state.movieInfo.title}</h1>
                <div style={{textAlign:'center'}}>
                    <img src={this.state.movieInfo.images.large} />
                </div>
                <h3>主要演员：</h3>
                <ul style={{display:'flex', flexWrap:'wrap', margin:5,}}>
                    {this.state.movieInfo.casts.map(function(item, i){
                        return <li key={i}>
                            <img src={item.avatars.small} />
                            <h4>{item.name}</h4>
                        </li>
                    })}
                </ul>
                <h3>剧情简介：</h3>
                <p style={{lineHeight:'25px', textIndent: '2em'}}>{this.state.movieInfo.summary}</p>
            </div>
        }
    }
}
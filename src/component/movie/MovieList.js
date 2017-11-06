import React, {Component} from 'react'

import MovieDataServices from '../../dataServer/getMovieData.js'

import { Spin, Alert, Rate } from 'antd';//导入loading组件
import '../../css/movieList.css'
export default class MovieList extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieType:this.props.match.params.type,//电影类型
            movieList:[], //所有的电影数据
            isLoading:true,
        }
    }
    render(){
        return <div>
                {this.createMovieList()}
            </div>
    }

    componentDidMount(){
        /*1. https://api.douban.com/v2/movie/in_theaters    【正在热映】
        /*2. https://api.douban.com/v2/movie/coming_soon    【即将上映】
        /*3. https://api.douban.com/v2/movie/top250         【top250】
          
        先来分析请求Node服务器时，请求URL地址
        http://127.0.0.1:9999/getmovielist>type=in_theaters
        http://127.0.0.1:9999/getmovielist>type=coming_soon
        http://127.0.0.1:9999/getmovielist>type=top250

        在Node服务器中，如何获取url中传递的参数？？  req.query.type(req.query. + 参数名)
        */
        this.getMovieListByType();
    }
    //封装公共的获取列表的参数
    getMovieListByType = ()=>{
        var result = MovieDataServices.getMovieListByType(this.state.movieType);
        // console.log(result.json());
        result.then((data)=>{
            console.log(data.subjects);
            this.setState({
                movieList:data.subjects,
                isLoading:false
            })
        });
    }
    //定义一个显示电影列表的方法
    createMovieList = ()=>{
       if(this.state.isLoading){
            return <Spin tip="Loading...">
            <Alert
              message="正在请求列表数据"
              description="请稍等..."
              type="info"
            />
          </Spin>
       }else{
            return <div style={{display:'flex',flexWrap:'wrap'}}>
                {this.state.movieList.map(this.createMovieItem)}
            </div>
       }
    }
    //创建每一条电影信息
    createMovieItem = (item, i)=>{
        return <div onClick={()=>{this.getMovieDetain(item.id)}} className="movieItem" key={i} style={{padding:2, border:'1px solid #eee', margin:4,textAlign:'center'}}>
            <img style={{width:120}} src={item.images.medium}/>
            <div><strong>{item.title}</strong></div>
            <div><strong>电影类型：</strong>{item.genres.join(',')}</div>
            <div><strong>评分：</strong><Rate disabled defaultValue={item.rating.average/2}/></div>
        </div>
    }
    //点击电影，，获取当前点击的id   /* 点击进入详情列表*/
    getMovieDetain = (movieId)=>{
        // console.log(movieId);
        console.log(this.props);
        this.props.history.push('/movie/moviedetail/' + movieId);
    }

    //组件将要接受新props属性
    componentWillReceiveProps(nextProps){
        // console.log(this.match.param.type);
        console.log(nextProps.match.params.type);
        this.setState({
            movieType:nextProps.match.params.type,
            isLoading:true
        }, ()=>{
            //修改电影类型和isLoading之后，重新获取数据
            this.getMovieListByType();
        })
    }

}
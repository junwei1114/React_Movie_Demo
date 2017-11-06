export default {
    getMovieListByType(type){//根据电影类型，获取电影列表数据
        var url = 'http://127.0.0.1:9999/getmovielist?type='+type
        /*不推荐使用
        return fetch(url).then((response)=>{
            return response.json();
        }).then((result)=>{
            return result
        });*/
        //推荐使用5颗星
       return  new Promise((resolve, reject)=>{
            fetch(url).then((response)=>{
                return response.json();
            }).then((res)=>{
                resolve(res)
            });
       })
    },

    getMovieListById(id){ //根据电影ID，获取对应的电影详情
        var url = 'http://127.0.0.1:9999/getmoviedetail?id='+id
        return new Promise((resolve,reject)=>{
            fetch(url).then((response)=>{
                return response.json();
            }).then((res)=>{
                resolve(res);
            });
        })
    }
}
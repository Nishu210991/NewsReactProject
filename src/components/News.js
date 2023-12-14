import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category: 'general'

  }
  static propsTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    
  }

  constructor(){
    super();
    this.state ={
      articles : [],
      loading: false,
      page: 1

    }
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7b59b8caa064c80bc5ff1d089c1362c
    &page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading:false
    })

  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7b59b8caa064c80bc5ff1d089c1362c
    &page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading:false
    })
  }

  handleNextClick = async ()=>{
  //   if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

  //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7b59b8caa064c80bc5ff1d089c1362c&page=
  //       ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //       this.setState({loading:true});
  //       let data = await fetch(url);
  //       let parseData = await data.json()
        
  //       this.setState({
  //           page : this.state.page + 1,
  //           articles: parseData.articles,
  //           loading: false
  //       }) 
  // }
      this.setState({ page: this.state.page + 1    
      });
      this.updateNews()
  }

  handlePrevClick = async ()=>{
    // console.log('Previous')
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7b59b8caa064c80bc5ff1d089c1362c
    // &page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);
    // this.setState({
    //     page : this.state.page - 1,
    //     articles: parseData.articles,
    //     loading: false
    // })
      this.setState({ page: this.state.page -1    
      });
      this.updateNews()
    
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>Trending News- Top News</h1>   
        {this.state.loading && <Spinner/>}
        <div className='row md-3'>
        {!this.state.loading && this.state.articles.map((element)=>{
          return  <div className='col-md-3 mx-3' key={element.url}>

          <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} 
          author={element.author} date={element.publishedAt} source={element.source.name}  />

        </div>

        })}
       
        </div>
        <div className='container d-flex justify-content-between'>
        <button  disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
       

      </div>
    )
  }
}

export default News

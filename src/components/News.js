import React , {useEffect, useState} from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
    &page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles)
    setTotalResults(parseData.setTotalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=> {
    document.title = `${capitalizeFirstLetter(props.category)} - TrendingNews`;
    updateNews();
    // eslint-disable-next-line
  }, [])


  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
    &page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page +1 )
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    
  };

 
    return (
      <> <h1 className="text-center" style={{margin:'10px 0px', marginTop:'20px' }}>
          Trending News- Top {capitalizeFirstLetter(props.category)}{" "}
          News </h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row md-3">
            {articles.map((element) => {
              return  <div className="col-md-3 mx-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
            
            })}
          </div>
          </div>
       
        </InfiniteScroll>
      </>
    )
  }


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;

import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date , source} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'55%',zIndex:'1'}}>{source}
            </span>
          <img src={
              !imageUrl
                ? "https://english.cdn.zeenews.com/sites/default/files/2023/12/12/1334764-live-score-ind-vs-sa.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small class="text-body-secondary">
                By {!author ? "Unknown" : author} {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileGithub extends Component {
  state = {
    clientId: "df0c868deb22b5cef196",
    clientSecret: "67cacbfcb4bcbd186eca897055c90fb5bee41df5",
    count: 5,
    sort: "created: asc",
    repos: []
  };
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    const url = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (this.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => {
        if (this.myRef) {
          this.setState({ repos: [] });
        }
      });
  }
  render() {
    const { repos } = this.state;

    const repoItems =
      repos.length > 0 ? (
        repos.map(repo => {
          return (
            <div key={repo.id} className="card card-body mb-2">
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    <Link
                      to={repo.html_url}
                      className="text-info"
                      target="_blank"
                    >
                      {repo.name}
                    </Link>
                  </h4>
                  <p>{repo.description}</p>
                </div>

                <div className="col-md-6">
                  <span className="badge badge-info mr-1">
                    Stars: {repo.stargazers_count}
                  </span>
                  <span className="badge badge-secondary mr-1">
                    Watchers: {repo.watchers_count}
                  </span>
                  <span className="badge badge-success">
                    Forks: {repo.forks_count}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="card card-body">
          Could not find repos for Github Username of {this.props.username}
        </div>
      );

    return (
      <div
        ref={myRef => {
          this.myRef = myRef;
        }}
      >
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

export default ProfileGithub;

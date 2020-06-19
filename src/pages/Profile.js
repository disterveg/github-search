import React, {useContext, useEffect, Fragment} from 'react';
import {GithubContext} from '../context/github/githubContext';
import {Link} from 'react-router-dom';
import {Repos} from '../components/Repos/Repos';

export const Profile = ({match}) => {
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
  }, []);

  if (loading) {
    return <p className="text-center">Загузка...</p>;
  }

  const {
    name,
    company,
    // eslint-disable-next-line camelcase
    avatar_url,
    location,
    bio,
    blog,
    login,
    // eslint-disable-next-line camelcase
    html_url,
    followers,
    following,
    // eslint-disable-next-line camelcase
    public_repos,
    // eslint-disable-next-line camelcase
    public_gists
  } = user;

  return (
    <Fragment>
      <Link to={'/'} className="btn bnt-link">На главную</Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-5">
              {/* eslint-disable-next-line camelcase*/}
              <img className="card-img-top" src={avatar_url} alt={name} />
            </div>
            <div className="col-sm-7 text-left">
              <h1 className="mb-3 mt-3">{name}</h1>
              <div className="profile-bio">
                {
                  bio && <Fragment>
                    <h3>Информация профиля:</h3>
                    <p>{bio}</p>
                  </Fragment>
                }
                <ul>
                  {login && <li>
                    <strong>Логин: </strong> {login}
                  </li>}
                  {company && <li>
                    <strong>Компания: </strong> {company}
                  </li>}
                  {blog && <li>
                    <strong>Сайт: </strong> {blog}
                  </li>}
                  {location && <li>
                    <strong>Местоположение: </strong> {location}
                  </li>}
                </ul>

                <div className="badge badge-primary">
                  Подписчики: {followers}
                </div>
                <div className="badge badge-success">
                  Подписан: {following}
                </div>
                <div className="badge badge-info">
                  {/* eslint-disable-next-line camelcase*/}
                  Репозитории: {public_repos}
                </div>
                <div className="badge badge-dark">
                  {/* eslint-disable-next-line camelcase*/}
                  Gists: {public_gists}
                </div>
                <div className="mt-3">
                  {/* eslint-disable-next-line camelcase*/}
                  <a href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark">Открыть профиль</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

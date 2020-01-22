import React, { Component } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            loadedUser: false,
            user: []
        };
    }

    fetchUser(e) {
        e.preventDefault();
        this.setState(state => {
            state.loading = true;
            return state;
        })
        fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    loading: false,
                    loadedUser: true,
                    user: result.results[0]
                });
            },
            (error) => {
                this.setState({
                    loading: false,
                    loadedUser: false,
                    error: error
                });
            }
        )
    }
    render() {
        const { error, loading, user, loadedUser } = this.state;

        return (
            <div className="homepage">
                <div className="homepage__container">
                    <div className="display-user">
                        <button className="display-user__button" onClick={this.fetchUser.bind(this)}>Find a new buddy!</button>
                        <div className="display-user__result">
                            {loading ? (
                                <div className="homepage--spinner"></div>
                            ) : loadedUser ? (
                                <React.Fragment>
                                    <div className="result">
                                        <img src={user.picture.large} alt="User"></img>
                                        <h2>{user.name.title} {user.name.first} {user.name.last}</h2>
                                        <p className="paragraph">Email: {user.email}</p>
                                        <p className="paragraph">Phone: {user.cell}</p>
                                    </div>
                                </React.Fragment>
                            ) : null } 
                            {error ? (
                                <span>{error}</span>
                            ) : null }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;

import React from 'react'

import Notes from './Notes';

const Home = (props) => {
    const { showAlert } = props;
    return (
        <div>

            <div className="container my-3 mx-2">

                <Notes showAlert={showAlert} />
            </div>

        </div>
    )
}

export default Home

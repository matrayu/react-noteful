import React, { Component } from 'react';
import MainSection from '../MainSection/MainSection';
import MainSidebar from '../MainSidebar/MainSidebar';

class AppMain extends Component {
    render() {
        return (
            <div className='AppMain'>
                <div className='AppMain__mainSidebar'>
                    <MainSidebar />
                </div>
                <div className='AppMain__mainSection'>
                    <MainSection />
                </div>
            </div>
        )
    }
}

export default AppMain
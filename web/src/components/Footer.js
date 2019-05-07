import React, { Component } from 'react'

class Footer extends Component {

    render() {
        return (
            <footer className="page-footer font-small" style={{ backgroundColor: '#4B4A4A', color: 'white', position: 'absolute', bottom: 0, width: '100%' }}>
                <div className="footer-copyright text-center py-3">© 2019 Copyright:
                    <a href="https://tenusha.wordpress.com"> tenusha.wordpress.com</a>
                </div>
            </footer>
        )
    }
}

export default Footer
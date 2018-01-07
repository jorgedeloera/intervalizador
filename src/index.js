import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './components/App'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'

ReactDOM.render(<App/>, document.getElementById('root'))

OfflinePluginRuntime.install()
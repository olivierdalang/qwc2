/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const {Glyphicon} = require('react-bootstrap');
const {changeZoomLevel} = require('../actions/map');
require('./style/Buttons.css');

class ZoomButton extends React.Component {
    static propTypes = {
        currentZoom : PropTypes.number,
        position: PropTypes.number,
        changeZoomLevel: PropTypes.func,
        maxZoom: PropTypes.number,
        direction: PropTypes.number
    }
    render() {
        let position = this.props.position >= 0 ? this.props.position : (this.props.direction > 0 ? 4 : 3);
        let disabled = (this.props.currentZoom + this.props.direction > this.props.maxZoom) || (this.props.currentZoom + this.props.direction < 0);
        return (
            <button className="Button"
                onClick={ev => this.props.changeZoomLevel(this.props.currentZoom + this.props.direction)}
                style={{bottom: (5 + 4 * position) + 'em'}}
                disabled={disabled}
            >
                <Glyphicon glyph={this.props.direction > 0 ? "plus" : "minus"}/>
            </button>
        );
    }
};

module.exports = {
    ZoomInPlugin: connect((state) => ({
        currentZoom: state.map.zoom,
        maxZoom: state.map.resolutions.length - 1,
        direction: +1
    }),{
        changeZoomLevel: changeZoomLevel
    })(ZoomButton),
    ZoomOutPlugin: connect((state) => ({
        currentZoom: state.map.zoom,
        maxZoom: state.map.resolutions.length - 1,
        direction: -1
    }),{
        changeZoomLevel: changeZoomLevel
    })(ZoomButton),
    reducers: {
        map: require("../reducers/map")
    }
};

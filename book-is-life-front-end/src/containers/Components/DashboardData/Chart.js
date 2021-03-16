import React, { Component } from 'react'
import { Bar } from '@reactchartjs/react-chart.js';



class Chart extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }
    render() {

        return (
            <Bar
                height={180}
                width={270}
                options={{
                    maintainAspectRatio: false
                }}
                data={this.state.data}
            />
        )
    }
}
export default (Chart)
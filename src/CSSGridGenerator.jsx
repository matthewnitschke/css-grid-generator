import React, { Component } from 'react';

import './styles.scss'

export default class CSSGridGenerator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns: 'auto',
            rows: 'auto',
            columnGap: '2px',
            rowGap: '2px',
            templateAreas: '.'
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const rowCount = this.state.rows.split(' ').length
        const columnCount = this.state.columns.split(' ').length

        let layoutChildrenCount = rowCount * columnCount

        let gridTemplateAreaMatrix = this.state.templateAreas.split('\n').map(e => {
            return e.split(' ')
        })
        
        let r = 0
        let c = 0
        let layoutChildrenDom = Array(layoutChildrenCount).fill().map((e, i) => {
            if (i != 0){
                if (i % columnCount == 0) {
                    c = 0
                    r++
                } else {
                    c++
                }
            }

            let text = ""
            if (gridTemplateAreaMatrix.length > r &&
                gridTemplateAreaMatrix[r].length > c &&
                gridTemplateAreaMatrix[r][c] &&
                gridTemplateAreaMatrix[r][c] != ".") {
                text = gridTemplateAreaMatrix[r][c]
            }

            return <div key={i} className="layout-view-child" title={text}>
                {text}
            </div>
        })

        let templateAreasInvalid = false
        gridTemplateAreaMatrix.forEach((c, i) => {
            if (c.length != columnCount) {
                templateAreasInvalid = true
            }

            if (i > columnCount - 1){
                templateAreasInvalid = true
            }
        })

        return (
            <div className="css-grid-generator">
                <div className="tac">
                    <pre className="code-view dib tal">
                        <span style={{color: "#ff79c6"}}>.container</span> {'{'}
                        <div className="dfc pl3" style={{ color: "#8be9fd" }}>
                            <div>
                                grid-template-columns<span style={{color: "#ff79c6"}}>:</span> <input className="code-view-input" autoComplete="off" value={this.state.columns} name="columns" onChange={this.onChange} /> <span style={{color: "#ff79c6"}}>;</span>
                            </div>
                            <div>
                                grid-template-rows<span style={{color: "#ff79c6"}}>:</span> <input className="code-view-input" autoComplete="off" value={this.state.rows} name="rows" onChange={this.onChange} /> <span style={{color: "#ff79c6"}}>;</span>
                            </div>
                            <div>
                                grid-column-gap<span style={{color: "#ff79c6"}}>:</span> <input className="code-view-input small" autoComplete="off" value={this.state.columnGap} name="columnGap" onChange={this.onChange} /> <span style={{color: "#ff79c6"}}>;</span>
                            </div>
                            <div>
                                grid-row-gap<span style={{color: "#ff79c6"}}>:</span> <input className="code-view-input small" autoComplete="off" value={this.state.rowGap} name="rowGap" onChange={this.onChange} /> <span style={{color: "#ff79c6"}}>;</span>
                            </div>
                            <div>
                                <div>
                                    grid-template-areas<span style={{color: "#ff79c6"}}>:</span>
                                    <div className="pl3">
                                        <textarea 
                                            rows={rowCount} 
                                            className={`code-view-input ${templateAreasInvalid ? 'invalid' : ''}`}
                                            autoComplete="off" 
                                            value={this.state.templateAreas} 
                                            name="templateAreas" 
                                            onChange={this.onChange}></textarea><span style={{color: "#ff79c6"}}>;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {'}'}
                    </pre>
                </div>
                <div className="tac">
                    <div className="layout-view dib" style={{
                        gridTemplateColumns: this.state.columns,
                        gridTemplateRows: this.state.rows,
                        gridColumnGap: this.state.columnGap,
                        gridRowGap: this.state.rowGap
                    }}>
                        {layoutChildrenDom}
                    </div>
                </div>
            </div>
        );
    }
}
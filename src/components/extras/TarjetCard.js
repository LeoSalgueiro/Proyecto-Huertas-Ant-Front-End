
import React, { Component } from 'react'

import { Card } from 'antd';




export default class TarjetCard extends Component {
    render() {
        return (
            <div>
            <Card title="Control de Huertas Remoto"  style={{ width: 300 }}>
                <p>Inicio De Sesión</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
  </div >
        )
    }
}

/**
 * @fileOverview 影院列表中的影院项
 * @time 2017/12/28
 * @author liugang
 * */

import React from 'react';
import {Link} from 'react-router-dom';

export default ({cinema}) => {
    return (
        <div key={cinema.id}>
            <Link to={"/cinema/detail/"+cinema.id} style={{
                display: 'block'
            }}>
                <span className="cinema-name">{cinema.name}</span>
                <span className="cinema-tag">
                    {cinema.labels.map((item, index) => (<em key={index}>{item.name}</em>))}
                </span>
                <span style={{
                    color: '#ccc'
                }}>{cinema.address}</span>
                <span>1.5km</span>
            </Link>
        </div>
    )
}




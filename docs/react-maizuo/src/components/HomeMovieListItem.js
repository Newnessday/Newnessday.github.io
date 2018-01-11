/**
 * @fileOverview 首页正在热映和即将上映
 * @time 2017/12/4
 * @author liugang
 * */

import React from 'React';
import {Link} from 'react-router-dom';

export default (props) => {
    var {data, key}=props;
    return (
        <li key={key}>
            <Link to={`/movie/detail/${data.id}`}>
                <img src={data.cover.origin} />
                <span>{data.name}<br/><em>{data.cinemaCount}家影院上映</em><i>{data.grade}</i></span>
            </Link>
        </li>
    )

}


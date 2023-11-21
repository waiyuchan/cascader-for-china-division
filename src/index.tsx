import React from "react";
import ReactDOM from "react-dom";
import {Cascader} from "antd";

import areas from "china-division/dist/areas.json";
import cities from "china-division/dist/cities.json";
import provinces from "china-division/dist/provinces.json";

// 定义接口
interface Area {
    code: string;
    name: string;
    cityCode?: string;
}

interface City {
    code: string;
    name: string;
    provinceCode: string;
    children?: AreaOption[];
}

interface Province {
    code: string;
    name: string;
    children?: CityOption[];
}

interface AreaOption {
    label: string;
    value: string;
}

interface CityOption extends AreaOption {
    children?: AreaOption[];
}

// 将原始数据转换为带有 children 属性的类型
const typedCities: City[] = cities.map((city) => ({...city, children: []}));
const typedProvinces: Province[] = provinces.map((province) => ({
    ...province,
    children: []
}));
const typedAreas: Area[] = areas.map((area) => ({...area}));

typedAreas.forEach((area) => {
    const matchCity = typedCities.find((city) => city.code === area.cityCode);
    if (matchCity) {
        matchCity.children!.push({
            label: area.name,
            value: area.code
        });
    }
});

typedCities.forEach((city) => {
    const matchProvince = typedProvinces.find(
        (province) => province.code === city.provinceCode
    );
    if (matchProvince) {
        matchProvince.children!.push({
            label: city.name,
            value: city.code,
            children: city.children
        });
    }
});

const options = typedProvinces.map((province) => ({
    label: province.name,
    value: province.code,
    children: province.children
}));

ReactDOM.render(
    <div style={{margin: 24}}>
        <p style={{marginBottom: 24}}>Antd Cascader Demo</p>
        <Cascader
            options={options}
            showSearch
            placeholder="请选择地址"
            style={{width: 400}}
        />
    </div>,
    document.getElementById("root")
);

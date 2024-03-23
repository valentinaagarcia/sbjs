"use client";
import React from "react";
import { Button, Card, Input, Radio, Space, Flex } from 'antd';
import { useEffect, useState } from "react";

export default function AboutPage() {
    const [value, setValue] = useState(null);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return(
        <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
                <Radio.Button value={1}>Option A</Radio.Button>
                <Radio.Button value={2}>Option B</Radio.Button>
                <Radio.Button value={3}>Option C</Radio.Button>
            </Space>
        </Radio.Group>
    );
}


'use client'
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { APILoader, AutoComplete } from '@uiw/react-amap';

const Example = () => {
  const mapRef = useRef();
  const [data, setData] = useState();
  const [city, setCity] = useState('上海市');
  const [input, setInput] = useState();
  useEffect(() => {
    setInput(mapRef.current);
    console.log('@@@@', data)
  }, [input]);
  return (
    <>
      <input type="text" ref={mapRef} />
      <div style={{ width: '100%' }}>
        {input && (
          <AutoComplete
            input={input}
            onSelect={(opts) => {
              setData(opts);
              console.log('@@@@', opts)
            }}
          />
        )}
        <pre style={{ padding: 10, marginTop: 10 }}>
          {data ? JSON.stringify(data, null, 2) : '{请在输入框输入内容，下拉列表选择...}'}
        </pre>
      </div>
    </>
  );
}

const Mount = () => (
  <APILoader akey="acafdf9063b0476ecb3d2f5dc6345158">
    <Example />
  </APILoader>
);

export default Mount;
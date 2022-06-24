import React, { useEffect } from 'react';
import { View, useEffect, useState } from 'react-native-web';
import * as api from './api';
import List from './List';

function ListContainer(props) {
    const [data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    function  fetchItems() {
        return api
            .fetchItems()
            .then((resp) => resp.json())
            .then(({items}) => {
                setData([
                    ...data,
                    ...items.map((value) => ({
                        key: value,
                        value,
                    })),
                ]);
            });
    }

    function refreshItems() {
        setIsRefreshing(true);
        return api
            .fetchItems()
            .then((resp) => resp.json())
            .then(({items}) => {
                setData([
                    items.map((value) => ({
                        key: value,
                        value,
                    })),
                ]);
            })
            .finally(() => {
                setIsRefreshing(false);
            });
    }
    
    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <List
            data={data}
            fetchItems = {fetchItems}
            refreshItems = {refreshItems}
            isRefreshing = {isRefreshing}
        />
    );
}

export default ListContainer;
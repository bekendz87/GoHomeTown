import React from "react";
import { Button, View,Text } from 'react-native';

export default class ScheduleDrive extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Đặt xe</Text>
                <Button onPress={() => this.props.navigation.goBack()} title="Go back home" />
            </View>
        );
    }
}
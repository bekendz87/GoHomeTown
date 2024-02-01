import React from "react";
import { View, Text } from "react-native";
import LottieView from 'lottie-react-native';
export default class Intro extends React.Component {
    componentDidMount() {
        setTimeout(() => { this.load() }, 7000);
    }
    load = () => {
        this.props.navigation.replace("Home");
    }
    render() {
        return (
            <View>
                <LottieView
                    autoPlay
                    source={require("../../../animation/intro.json")}
                    loop
                    style={{ justifyContent: "center", alignContent: "center", width: "100%", height: "100%" }}
                />
            </View>
        )
    }
}
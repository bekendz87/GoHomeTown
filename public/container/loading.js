import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.loading}
                style={{ zIndex: 1100 }}
                onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        {
                            (this.props && this.props.loading && this.props.loading == true) ? (
                                <LottieView
                                    autoPlay
                                    style={{
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        width: 100,
                                        height: 100,
                                    }}
                                    source={require("../../animation/loading.json")}
                                />
                            ) : (
                                null
                            )
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    },
    activityIndicatorWrapper: {
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})
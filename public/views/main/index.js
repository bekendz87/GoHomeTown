import React from "react";
import { Button, View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput, NativeModules } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Entypo, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import Loading from "../../container/loading";

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                selectFrom: {},
                selectTo: {}
            },
            address: "",
            loading: false
        }
    }

    async componentDidMount() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Quyền truy cập vị trí đã bị từ chối")
            return;
        }

        let location = await Location.getCurrentPositionAsync({ mayShowUserSettingsDialog: true, accuracy: 5 });

        if (location) {
            location = location && location.coords ? location.coords : {}

            this.setState({
                region: {
                    latitude: location && location.latitude ? location.latitude : 0,
                    longitude: location && location.longitude ? location.longitude : 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            })
            let addresss = await Location.reverseGeocodeAsync(this.state.region);
            if (addresss && addresss.length > 0) {
                addresss = addresss && addresss[0] ? addresss[0] : {}
                let fulladdress = ""
                fulladdress = `${addresss && addresss.name ? addresss.name : ""}, ${addresss && addresss.street ? addresss.street : ""}, ${addresss && addresss.district ? addresss.district : ""}, ${addresss && addresss.city ? addresss.city : ""}`
                this.setState({ address: fulladdress })
            }

        }

    }

    onSelect = (data, type) => {

        if (type == "provinces") {
            this.setState({ selectFrom: data })
        }

        if (type == "districts") {
            this.setState({ selectTo: data })
        }

    };

    onPressView(type) {
        this.props.navigation.navigate("SelectContainer",
            { onSelect: this.onSelect, type: type, selectFrom: this.state.selectFrom, selectTo: this.state.selectTo })
    }

    findBuses() {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white", top: 0 }}>
                <Loading loading={this.state.loading} />
                <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={this.state.region}>
                    <Marker
                        coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }} />
                </MapView>
                <View style={{ flex: 1, justifyContent: 'center', paddingTop: 10, }}>
                    <ScrollView>
                        <View
                            style={[styles.iconContainer, {
                                alignSelf: 'flex-start',
                                height: 10,
                                width: 100,
                                paddingRight: 15,
                                paddingBottom: 15,
                                top: 59,
                                paddingLeft: 27
                            }]}>
                            <View style={[styles.box, { backgroundColor: 'black' }]} />
                            <View style={[styles.box, { backgroundColor: 'black' }]} />
                            <View style={[styles.box, { backgroundColor: 'black' }]} />
                        </View>

                        <View style={styles.criteriaRow}>
                            <View style={styles.iconContainer}>
                                <Entypo style={styles.icon} name="circle" color="#00CCFF" size={22} />
                            </View>
                            <TouchableOpacity onPress={() => this.onPressView("provinces")} style={{ borderRadius: 8, backgroundColor: '#F4F6FA', padding: 20, width: "85%" }}>
                                {this.state.selectFrom ? (
                                    (this.state.selectFrom && this.state.selectFrom.name && this.state.selectFrom.province) ?

                                        (<Text>{this.state.selectFrom && this.state.selectFrom.name &&
                                            this.state.selectFrom.province ? `${this.state.selectFrom.name} - ${this.state.selectFrom.province}` : ""}</Text>) :

                                        (<Text>{this.state.selectFrom && this.state.selectFrom.name ? this.state.selectFrom.name : ""}</Text>)

                                ) :
                                    (<Text>{'Đi đâu ?'}</Text>)
                                }

                            </TouchableOpacity>

                        </View>
                        <View style={[styles.criteriaRow, styles.criteriaRowArrive]}>
                            <View style={styles.iconContainer}>
                                <FontAwesome6 style={[styles.icon, styles.iconPin]} name="location-pin" color="#00CCFF" size={22} />
                            </View>
                            <TouchableOpacity onPress={() => this.onPressView("districts")} style={{ borderRadius: 8, backgroundColor: '#F4F6FA', padding: 20, width: "85%" }}>
                                {this.state.selectTo ? (
                                    (this.state.selectTo && this.state.selectTo.name && this.state.selectTo.province) ?

                                        (<Text>{this.state.selectTo && this.state.selectTo.name &&
                                            this.state.selectTo.province ? `${this.state.selectTo.name} - ${this.state.selectTo.province}` : ""}</Text>) :

                                        (<Text>{this.state.selectTo && this.state.selectTo.name ? this.state.selectTo.name : ""}</Text>)

                                ) :
                                    (<Text>{'Đến đâu ?'}</Text>)
                                }
                            </TouchableOpacity>

                        </View>


                    </ScrollView>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center", padding: 20 }}>
                    <TouchableOpacity style={{
                        justifyContent: 'center', alignItems: "center",
                        backgroundColor: "#00CCFF", width: "100%", height: 40, borderRadius: 8,
                    }} onPress={() => this.findBuses()}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Tìm chuyến xe</Text>
                    </TouchableOpacity>

                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '30%',
    },
    criteriaRow: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
    },
    horizontalLine: {
        width: "100%",
        height: 1
    },
    text: {
        justifyContent: 'center',
    },
    icon: {
        padding: 12,
        color: "#00CCFF",
        fontWeight: "bold"
    },
    iconPin: {
        paddingLeft: 15,
    },
    iconContainer: {

    },
    criteriaRowArrive: {
        paddingTop: 40
    },
    box: {
        width: 1,
        height: 33,
    }
});
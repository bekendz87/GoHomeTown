import React from "react";
import { View, Text, StyleSheet, TextInput, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import config from "../config/config";
import Model from "../model/model"
import Loading from "../container/loading"


export default class SelectContainer extends React.Component {
    constructor(props) {
        super(props)
      
        this.selectFrom = props && props.route && props.route.params && props.route.params.selectFrom ? props.route.params.selectFrom : null
        this.selectTo = props && props.route && props.route.params && props.route.params.selectTo ? props.route.params.selectTo : null
        this.typeSelect = props && props.route && props.route.params && props.route.params.type ? props.route.params.type : ""
        this.onSelect = props && props.route && props.route.params && props.route.params.onSelect ? props.route.params.onSelect : null

        this.state = {
            listProvinces: [],
            listDistricts: [],
            newText: "",
            loading: false,
            refreshing: false,
            textSearch: ""
        }
    }

    onRefresh = () => {
        this.setState({ refreshing: true })

        if (this.typeSelect == "provinces" || this.typeSelect == "districts") {
            this.getProvinces()
            this.onChangeSearch("")
            this.setState({ textSearch: "" })
        }

        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 2000);
    };

    componentDidMount() {
        this.setState({ loading: true })

        if (this.typeSelect == "provinces" || this.typeSelect == "districts") {
            setTimeout(() => {
                this.getProvinces()
            }, 1000);
        }


    }

    async getProvinces() {
        let url = config.API_FPO + "/v1/partner/areas/province"
        let result = await Model.sendBackEnd(url, "GET", {})
        if (result && result.status == 200 || result.status == "Success") {

            (result && result.results ? result.results : []).forEach(async province => {
                let districtbyId = await this.getDistricts(province && province.code ? province.code : "")
                if (districtbyId && districtbyId.length > 0) {
                    result.results.push(...districtbyId)
                }
            });

            if (this.selectFrom) {
                let index = result.results.findIndex(o => o.code === (this.selectFrom && this.selectFrom.code ? this.selectFrom.code : ""))
                result.results.splice(index, 1)
            }

            if (this.selectTo) {
                let index = result.results.findIndex(o => o.code === (this.selectTo && this.selectTo.code ? this.selectTo.code : ""))
                result.results.splice(index, 1)
            }


            this.setState({
                listProvinces: result && result.results ? result.results : []
            })
        }
        this.setState({ loading: false })
    }

    async getDistricts(provinceId) {
        let url = config.API_FPO + "/v1/partner/areas/district"
        url = url + "?province=" + provinceId
        let result = await Model.sendBackEnd(url, "GET", {})
        if (result && result.status == 200 || result.status == "Success") {
            return result && result.results ? result.results : []
        }
    }

    onChangeSearch(item) {
        if (this.typeSelect == "provinces" || this.typeSelect == "districts") {
            let listSearch = this.state.listProvinces.filter(o => o.name.includes(item));

            if (listSearch && listSearch.length > 0) {
                this.setState({ listProvinces: listSearch })
            }

            if (!item) {
                this.getProvinces()
            }
        }


    }

    renderItem = (item) => {
        if (this.typeSelect == "provinces" || this.typeSelect == "districts") {
            return (
                <View style={{
                    padding: 20, borderStyle: 'solid',
                    borderWidth: 0.2,
                    borderRadius: 1,
                    borderColor: "gray",
                    justifyContent: "center",
                }}>
                    <TouchableOpacity onPress={() => this.onSelectData(item)}>
                        {
                            item && item.name && item.province ? (
                                <Text style={{ fontSize: 16 }}>{item.name}-{item.province}</Text>
                            ) : (
                                <Text style={{ fontSize: 16 }}>{item.name}</Text>

                            )
                        }

                    </TouchableOpacity>
                </View>
            );
        }

    }

    onSelectData(item) {
        this.onSelect(item, this.typeSelect)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={style.container}>
                <View style={{
                    backgroundColor: "white",
                    shadowColor: "#000000",
                    shadowOpacity: 0.8,
                    zIndex: 1
                }}>
                    <TextInput
                        style={style.styleInput}
                        onChangeText={newText => this.onChangeSearch(newText)}
                        placeholder="Tìm..."
                    />
                </View>

                <View>
                    <View style={{ backgroundColor: "white" }}>
                        <Loading loading={this.state.loading} />
                        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
                            <SafeAreaView>
                                {
                                    (this.typeSelect == "provinces" || this.typeSelect == "districts") ? (
                                        <FlatList
                                            data={this.state.listProvinces}
                                            renderItem={({ item }) => this.renderItem(item)}
                                        />
                                    ) : (null)
                                }

                            </SafeAreaView>
                        </ScrollView>
                    </View>
                </View>
            </View>

        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    styleInput: {
        height: 50,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 15,
        borderRadius: 10,
        backgroundColor: "#DDDDDD"
    }
})
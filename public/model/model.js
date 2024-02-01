import React from "react";
module.exports = {
    sendBackEnd: async (url, type, data) => {
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let result = await fetch(url, { method: type, headers: headers, body: (type != "GET") ? JSON.stringify(data) : null, })
        const dataFinal = await result.json();
        if (dataFinal) {
            return dataFinal
        } else {
            return []
        }
    }
}
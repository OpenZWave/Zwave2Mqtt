/* eslint-disable */

<template>
    <v-container fluid>
        <v-card>
            <d3-network :net-nodes="activeNodes" :net-links="links" :options="options" />
        </v-card>
    </v-container>
</template>
<script>
import ConfigApis from "@/apis/ConfigApis";
import value from "@/apis/ConfigApis";

import D3Network from "vue-d3-network";

//https://github.com/socketio/socket.io-client/blob/master/docs/API.md
import io from "socket.io-client";

export default {
    name: "Mesh",
    components: {
        D3Network
    },
    computed: {
        activeNodes() {
            return this.nodes.filter(n => !n.failed);
        }
    },
    watch: {
    },
    data() {
        return {
            socket: null,
            homeid: "",
            homeHex: "",
            cnt_status: "Unknown",
            nodes: [],
            links: [],
            options: {
                canvas: false,
                size: {
                    w: 500,
                    h: 500
                },
                force: 350,
                offset: {
                    x: 0,
                    y: 0
                },
                nodeSize: 20,
                linkWidth: 1,
                nodeLabels: false,
                linkLabels: false,
                strLinks: true
            }
        };
    },
    methods: {
        showSnackbar(text) {
          this.$emit("showSnackbar", text);
        },
        convertNode(n) {
            return {
                id: n.node_id,
                _color: this.colorNode(n),
                node_id: n.node_id,
                status: n.status,
                failed: n.failed
            };
        },
        colorNode(n) {
            if (n.node_id === 1) {
                return 'purple';
            }
            
            if (n.status === 'Sleep') {
                return 'yellow';
            }

            return 'green';
        },
        apiRequest(apiName, args) {
        if (this.socket.connected) {
            var data = {
            api: apiName,
            args: args
            };
            this.socket.emit("ZWAVE_API", data);
        } else {
            this.showSnackbar("Socket disconnected");
        }
        }
    },
    mounted() {
        var self = this;

        this.socket = io(ConfigApis.getSocketIP());

        this.socket.on("connect", () => {
            console.log("Socket connected");
            self.$emit("updateStatus", "Connected", "green");
        });

        this.socket.on("disconnect", () => {
            console.log("Socket closed");
            self.$emit("updateStatus", "Disconnected", "red");
        });

        this.socket.on("error", () => {
            console.log("Socket error");
        });

        this.socket.on("reconnecting", () => {
            console.log("Socket reconnecting");
            self.$emit("updateStatus", "Reconnecting", "yellow");
        });

        this.socket.on("CONTROLLER_CMD", data => {
            self.cnt_status = data.help;
        });

        this.socket.on("DRIVER_READY", info => {
            self.homeid = info.homeid;
            self.homeHex = info.name;
        });

        this.socket.on("NODE_REMOVED", node => {
            self.$set(self.nodes, node.node_id, node);
        });

        this.socket.on("INIT", data => {
            //convert node values in array
            var nodes = data.nodes;
            for (var i = 0; i < nodes.length; i++) {
                self.nodes.push(self.convertNode(nodes[i]));
                
            }
            
            for (var i = 0; i < self.nodes.length; i++) {
                if (!self.nodes[i].failed)
                    self.apiRequest('getNodeNeighbors', [self.nodes[i].node_id]);
            }

            self.cnt_status = data.error ? data.error : data.cntStatus;
            self.homeid = data.info.homeid;
            self.homeHex = data.info.name;
        });

        this.socket.on("NODE_UPDATED", data => {
            var node = self.convertNode(data);
            if (!self.nodes[data.node_id] || self.nodes[data.node_id].failed) {
                //add missing nodes
                while (self.nodes.length < data.node_id)
                self.nodes.push(node);
            }

            self.$set(self.nodes, data.node_id, node);
        });

        this.socket.on("API_RETURN", data => {
            if (data.success) {
                switch (data.api) {
                case "getNodeNeighbors":
                    //console.log(data.result);
                    //confirm("Node neighbors \n" + self.jsonToList(data.result));
                    var neighbors = data.result;
                    for (var i = 0; i < neighbors.length; i++) {
                        if (self.nodes[neighbors[i]] && !self.nodes[neighbors[i]].failed)
                        self.links.push({
                            sid: data.args[0],
                            tid: neighbors[i],
                            _color: 'black'
                        });
                    }
                    break;
                }
            } else {
                self.showSnackbar(
                    "Error while calling api " + data.api + ": " + data.message
                );
            }
        });
    }
}
</script>
<template>
  <v-menu
    :value="showFilterOptions"
    :close-on-content-click="false"
    @suspend="showFilterOptions=false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon small v-on:click="showFilterOptions=true"
        v-bind="attrs"
        v-on="on"
      >
        {{ hasColFilter(header) ? 'filter_alt' : 'filter_list' }}
      </v-icon>
    </template>
    <v-card>
      <v-card-text>
        <v-text-field ref="search" v-if="header.filterInfo.type=='string'" label="Contains" v-model="header.search" @change="showFilterOptions=false" @show="$refs.search.$el.focus()"></v-text-field>
        <v-row>
          <v-col>
            <v-text-field v-if="header.filterInfo.type=='number'" type="number" label="Min" v-model="header.filterInfo.min"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-if="header.filterInfo.type=='number'" type="number" label="Max" v-model="header.filterInfo.max"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-if="header.filterInfo.type=='date'" type="datetime-local" label="Min" v-model="header.filterInfo.min"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-if="header.filterInfo.type=='date'" type="datetime-local" label="Max" v-model="header.filterInfo.max"></v-text-field>
          </v-col>
        </v-row>
        Items
        <v-item-group multiple v-model="header.filterInfo.list">
          <v-item
            v-for="item in nodeColumnValueList(header)"
            :key="item"
            :value="item"
            v-slot:default="{ active, toggle }"
          >
            <v-chip
              active-class="blue--text"
              :input-value="active"
              @click="toggle"
            >
              {{ item }}
            </v-chip>
          </v-item>
        </v-item-group>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="resetColFilter(header);showFilterOptions=false">Clear</v-btn>
        <v-btn color="primary" @click="showFilterOptions=false">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
    },
    headers: {
      type: Array,
    },
    header: {
      type: Object,
    },
  },
  data () {
    return {
      showFilterOptions: false,
    }
  },
  methods: {
    nodeColumnValueList(header) {
      let values = this.data.map(v => v[header.value]).filter(
        v => {
          if (
            header.search !== undefined &&
            header.search !== null &&
            typeof v === 'string' &&
            (
              v === '' ||
              v.toString().toLocaleLowerCase().indexOf(header.search.toLocaleLowerCase()) === -1
            )
          ) return false
          return true
        }
      )
      return [...new Set(values)];
    },
    hasColFilter (header) {
      return (header.search != null && header.search != '')
        || (header.filterInfo.list.length > 0)
        || (header.filterInfo.min != null)
        || (header.filterInfo.max != null)
    },
    resetColFilter (header) {
      header.search = null
      if (header.filterInfo && header.filterInfo.list) header.filterInfo.list = []
      if (header.filterInfo && header.filterInfo.min) header.filterInfo.min = null
      if (header.filterInfo && header.filterInfo.max) header.filterInfo.max = null
    },
  }
}
</script>

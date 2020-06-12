<template>
  <v-data-table
    :headers="headers"
    :items="tableNodes"
    :items-per-page-options="[10, 20, { text: 'All', value: -1 }]"
    item-key="node_id"
    class="elevation-1"
  >
    <template v-slot:body.prepend>
      <tr>
        <td></td>
        <td class="td-small">
          <v-select v-model="filters.types" :items="types" clearable chips dense multiple></v-select>
        </td>
        <td>
          <v-text-field v-model="filters.product" type="text" label="Product Name"></v-text-field>
        </td>
        <td>
          <v-text-field v-model="filters.name" type="text" label="Name"></v-text-field>
        </td>
        <td>
          <v-select v-model="filters.locations" :items="locations" clearable chips dense multiple></v-select>
        </td>
        <td></td>
        <td class="td-medium">
          <v-select v-model="filters.status" :items="states" clearable chips dense multiple></v-select>
        </td>
        <td></td>
      </tr>
    </template>
    <template v-slot:item="{ item }">
      <tr
        :style="{
                cursor: 'pointer',
                background:
                  selectedNode === item
                    ? $vuetify.theme.themes.light.accent
                    : 'none'
              }"
        @click.stop="nodeSelected(item)"
      >
        <td>{{ item.node_id }}</td>
        <td class="td-large">{{ item.type }}</td>
        <td class="td-large" :title="productName(item)">{{productName(item)}}</td>
        <td>{{ item.name || '' }}</td>
        <td>{{ item.loc || '' }}</td>
        <td>{{ item.secure ? 'Yes' : 'No' }}</td>
        <td class="td-medium">{{ item.status }}</td>
        <td>
          {{
          item.lastActive
          ? new Date(item.lastActive).toLocaleString()
          : 'Never'
          }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script src="./nodes-table.js"></script>
<style scoped src="./nodes-table.css"></style>

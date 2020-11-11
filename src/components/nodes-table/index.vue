<template>
  <v-data-table
    :headers="headers"
    :items="tableNodes"
    :footer-props="{
      itemsPerPageOptions: [10, 20, 50, 100, -1]
    }"
    :items-per-page.sync="nodeTableItems"
    item-key="node_id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-btn color="blue darken-1" text @click.native="resetFilter()"
        >Reset Filter</v-btn
      >
    </template>
    <template v-slot:header.node_id="{ header }">
      <filter-options v-model="filters.ids" :items="ids"></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:header.type="{ header }">
      <filter-options v-model="filters.types" :items="types"></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:header.product="{ header }">
      <filter-options
        v-model="filters.products"
        :items="products"
      ></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:header.name="{ header }">
      <filter-options v-model="filters.names" :items="names"></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:header.loc="{ header }">
      <filter-options
        v-model="filters.locations"
        :items="locations"
      ></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:header.secure="{ header }">
      <filter-options
        v-model="filters.secures"
        :items="secures"
      ></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:header.status="{ header }">
      <filter-options v-model="filters.states" :items="states"></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:header.lastActive="{ header }">
      <filter-options
        v-model="filters.lastActives"
        :items="lastActives"
      ></filter-options>
      {{ header.text }}
    </template>
    <template v-slot:item="{ item }">
      <tr
        :style="{
          cursor: 'pointer',
          background:
            selectedNode === item ? $vuetify.theme.themes.light.accent : 'none'
        }"
        @click.stop="nodeSelected(item)"
      >
        <td>{{ item.node_id }}</td>
        <td class="td-large">{{ item.type }}</td>
        <td class="td-large" :title="productName(item)">
          {{ productName(item) }}
        </td>
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

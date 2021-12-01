<template>
  <div>
    <p>This is the Data page.</p>
  </div>
  <br> <br>
    <div class="col-md-10 offset-md-1">
      <h3> Latest Data </h3>
      <Card style="text-align:justify">
        <template #content>
            <b>Scrape Date: November 1, 2020</b>
            <br> <br>
            Automart: 20/40 listings valid (50%) <br>
            Facebook: 20/60 listings valid (33%) <br>
            <b>Overall: 40/100  (40%) </b>
        </template>
        <template #footer>
            <Button icon="pi pi-download" label="Download All Data" />
        </template>
      </Card>
    </div>
    <br> <br>
    <div class="col-md-10 offset-md-1">
      <h3> Scraped Files </h3>
      <Card style="text-align:justify">
        <template #content>
            Scrape Date &nbsp; <Calendar v-model="value"/> <br> <br>
            Websites &nbsp;&nbsp;&nbsp;&nbsp; <MultiSelect v-model="selectedSites" :options="sites" optionLabel="name" placeholder="Select Sites" />
        </template>
        <template #footer>
            <Button icon="pi pi-download" label="Download" /> &nbsp;&nbsp;&nbsp;&nbsp;
        </template>
      </Card>
    </div>

    <br> <br>

    <div class="col-md-10 offset-md-1">
      <h3> Process Logs </h3>
      <Card style="text-align:justify">
        <template #content>
            Scrape Date &nbsp; <Calendar v-model="value"/> <br> <br>
        </template>
        <template #footer>
            <Button icon="pi pi-download" label="Download" />
        </template>
      </Card>
    </div>
      <br>
      <br>
</template>

<script>

export default {
  data () {
    return {
      value: null,
      selectedSites: null,
      sites: [
        { name: 'Autodeal', value: 'Autodeal' },
        { name: 'Automart', value: 'Automart' },
        { name: 'Carguide', value: 'Carguide' },
        { name: 'Carmudi', value: 'Carmudi' },
        { name: 'Carousell', value: 'Carousell' },
        { name: 'Facebook', value: 'Facebook' },
        { name: 'Philkotse', value: 'Philkotse' }
      ],
      selectedLogTypes: null,
      logTypes: [
        { name: 'Info', value: 'Info' },
        { name: 'Warning', value: 'Warning' },
        { name: 'Error', value: 'Error' }
      ]
    }
  }
}
</script>

<template>
  <div>
    <p>This is the Settings Page.</p>
  </div>
  <br> <br> <br>
  <div>
    <h3 style="margin-left: 60px">Data Scraper Parameters</h3> <br> <br>
    <div class="col-md-5 offset-md-1">
      <div>
        <Card style="text-align:justify">
          <template #title>
            Manual Trigger
          </template>
          <template #content>
              Websites &nbsp;&nbsp;&nbsp;&nbsp; <MultiSelect v-model="selectedSites" :options="sites" optionLabel="name" placeholder="Select Sites" />
          </template>
          <template #footer>
              <div style="text-align: right">
                <Button label="Scrape Now" class="p-button-secondary" />
              </div>
          </template>
        </Card>
        <br> <br>
      </div>
      <Divider/>
      <div>
        <Card style="text-align:justify">
          <template #title>
            Schedule Scraping Activity
          </template>
          <template #content>
              Scrape every &nbsp;&nbsp;&nbsp;&nbsp;
              <InputNumber v-model="frequency" showButtons/> &nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown v-model="selectedFrequencyTypes" :options="frequencyTypes" optionLabel="name" placeholder="Days" />
          </template>
          <template #footer>
              <div style="text-align: right">
                <Button label="Save Settings" class="p-button-secondary" />
              </div>
          </template>
        </Card>
      </div>
    </div>
    <br> <br>
  </div>
  <div>
    <h3 style="margin-left: 60px">Data Cleaner Parameters</h3> <br> <br>
    <div class="col-md-10 offset-md-1">
      <Card style="text-align:justify">
        <template #title>
            <h3 style="margin-left: 30px">Masterfile</h3> <br>
          </template>
          <template #content>
              <div style="text-align: center">
                <Button icon="pi pi-download" label="Download" class="p-button-lg"/> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                <Button icon="pi pi-upload" label="Upload" class="p-button-success p-button-lg"/>
              </div>
          </template>
      </Card>
    </div>
    <br> <br>
    <div class="col-md-10 offset-md-1">
      <Card style="text-align:justify">
        <template #title>
            <h3 style="margin-left: 30px">Cleaning Options</h3>
          </template>
          <template #content>
            <div class="col-md-10 offset-md-1">
              <Card style="text-align:justify">
                <template #content>
                  <div style="text-align:center">
                    <Card style="text-align:justify">
                      <template #content>
                        <big><b> Required Fields: </b></big> &emsp;
                        <MultiSelect v-model="selectedRequiredFields"
                          :options="requiredFields"
                          optionLabel="name"
                          placeholder="Select Fields" />
                      </template>
                    </Card>
                    <br> <br>
                    <Card style="text-align:justify">
                      <template #content>
                        <big><b> Set Valid Range: </b></big>
                        <div style="text-align:center">
                          <b> Minimum </b>  &emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;
                          <b> Maximum </b> <br> <br>
                        </div>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <b> Mileage: </b> &emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;
                        <InputNumber v-model="minMileage" suffix=" km" /> &emsp;
                        <InputNumber v-model="maxMileage" suffix=" km" /> <br> <br>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <b> Price: </b> &emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; &emsp;
                        <InputNumber v-model="minPrice" suffix=" Php" /> &emsp;
                        <InputNumber v-model="maxPrice" suffix=" Php" /> <br> <br>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <b> Engine Size: </b> &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                        <InputNumber v-model="minPrice"/> &emsp;
                        <InputNumber v-model="maxPrice"/>
                      </template>
                    </Card>
                    <br> <br>
                    <Card style="text-align:justify">
                      <template #content>
                        <big><b> Field Options: </b></big>
                        <br> <br>
                        <table style="width:100%">
                          <tr>
                            <th></th>
                            <th style="text-align:right">Approximate Correct Value</th>
                            <th style="text-align:center">Turn Invalid Values to Null</th>
                          </tr>
                          <br> <br>
                          <tr>
                            <td style="text-align:right">
                              Seller Type
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Model Year
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Make
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Model
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Variant
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Fuel Type
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Engine Size
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Transmission
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Mileage
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Mileage Range
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Price
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Location
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Seller
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Body Type
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                          <br>
                          <tr>
                            <td style="text-align:right">
                              Color
                            </td>
                            <td style="text-align:right">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                            <td style="text-align:center">
                              <Checkbox v-model="checked" :binary="true" />
                            </td>
                          </tr>
                        </table>
                      </template>
                    </Card>
                  </div>
                </template>
              </Card>
            </div>
            <br>
          </template>
      </Card>
    </div>
  </div>
  <br> <br>
</template>

<script>

export default {
  name: 'Home',
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
      ],
      frequency: 0,
      selectedFrequencyTypes: null,
      frequencyTypes: [
        { name: 'Hours', value: 'Hours' },
        { name: 'Days', value: 'Days' },
        { name: 'Weeks', value: 'Weeks' },
        { name: 'Months', value: 'Months' }
      ],
      minMileage: 0,
      maxMileage: 0,
      minPrice: 0,
      maxPrice: 0,
      allFields: [
        { name: 'Seller Type', value: 'seller_type' },
        { name: 'Date Posted', value: 'date_posted' },
        { name: 'Model Year', value: 'model_year' },
        { name: 'Make', value: 'make' },
        { name: 'Model', value: 'model' },
        { name: 'Variant', value: 'variant' },
        { name: 'Fuel Type', value: 'fuel_type' },
        { name: 'Engine Size', value: 'engine_size' },
        { name: 'Transmission', value: 'transmission' },
        { name: 'Mileage', value: 'mileage' },
        { name: 'Mileage Range', value: 'mileage_range' },
        { name: 'Price', value: 'price' },
        { name: 'Location', value: 'location' },
        { name: 'Seller', value: 'seller' },
        { name: 'Body Type', value: 'body_type' },
        { name: 'Color', value: 'color' }
      ],
      requiredFields: [
        { name: 'Seller Type', value: 'seller_type' },
        { name: 'Model Year', value: 'model_year' },
        { name: 'Make', value: 'make' },
        { name: 'Model', value: 'model' },
        { name: 'Variant', value: 'variant' },
        { name: 'Fuel Type', value: 'fuel_type' },
        { name: 'Engine Size', value: 'engine_size' },
        { name: 'Transmission', value: 'transmission' },
        { name: 'Mileage', value: 'mileage' },
        { name: 'Price', value: 'price' },
        { name: 'Location', value: 'location' },
        { name: 'Seller', value: 'seller' },
        { name: 'Body Type', value: 'body_type' },
        { name: 'Contact Number', value: 'contact_number' },
        { name: 'Color', value: 'color' }
      ],
      selectedRequiredFields: null,
      checked: []
    }
  }
}
</script>

<style>
  .box{
                background-color: white;
                height: 300px;
                width: 900px;
                outline-width: 10px;
                outline-style: auto;
                margin: auto;
            }
  /* table {
    margin: 0 auto;
  } */
  .paddingBetweenCols td {
  padding: 0 15px;
  }
</style>

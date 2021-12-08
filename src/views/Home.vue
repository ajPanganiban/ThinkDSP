<template>
  <Dialog header="Scraped Files" v-model:visible="scrapeDisplay" >
    <ul id="example-1">
      <li v-for="(item, key, index) in scrapeLinks" :key="index">
        <b>{{key}}:</b> <br>
        <a :href="item">{{item}}</a>
      </li>
    </ul>
  </Dialog>
  <Fieldset>
    <template #legend>
      Download Data
    </template>
    <div class="row">
      <div class="column">
        <div class="card">
          <Card style="text-align:justify">
            <template #title>
                Cleaned Listings
              </template>
            <template #content>
                <b>Last Scraped Date: November 1, 2021</b>
                <br> <br>
                Accepted Listings: <br>
                Automart: 20/40 listings (50%) <br>
                Facebook: 20/60 listings (33%) <br>
                <b>Overall: 40/100  (40%) </b>
            </template>
            <template #footer>
                <Button
                  @click.prevent="downloadData('latest_data', 'latest_data')"
                  icon="pi pi-download"
                  label="Download All Data" />
            </template>
          </Card>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <Card style="text-align:justify">
            <template #title>
              Scraped Listings
            </template>
            <template #content>
                Date &nbsp; <Calendar v-model="scraped_date"/> <br> <br>
                Websites &nbsp;&nbsp;&nbsp;&nbsp;
                <MultiSelect
                  v-model="selectedSites"
                  :options="sites"
                  optionLabel="name"
                  placeholder="Select Sites"
                />
            </template>
            <template #footer>
                <Button
                  @click.prevent="downloadScraped(this.selectedSites, this.scraped_date)"
                  icon="pi pi-download"
                  label="Generate Files"
                />
            </template>
          </Card>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <Card style="text-align:justify">
            <template #title>
              Process Logs
            </template>
            <template #content>
                Scrape Date &nbsp; <Calendar v-model="value"/> <br> <br>
            </template>
            <template #footer>
                <Button icon="pi pi-download" label="Download" />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </Fieldset>
  <br>
  <Fieldset>
    <template #legend>
      Edit Settings
    </template>
    <Accordion :multiple="true">
      <AccordionTab header="Start/Schedule Scraper">
        <div class="row">
          <div class="column" style="width:50%">
            <div class="card">
              <Card>
                <template #title>
                  Manual Trigger
                </template>
                <template #content>
                    Websites &nbsp;&nbsp;&nbsp;&nbsp;
                    <MultiSelect v-model="triggerSites"
                      :options="sites"
                      optionLabel="name"
                      placeholder="Select Sites" />
                </template>
                <template #footer>
                    <div style="text-align: right">
                      <Button
                        @click.prevent="handleTrigger(this.triggerSites)"
                        label="Scrape Now"
                        class="p-button-secondary"
                        style="width:100%"
                      />
                      <Message
                        v-if="manualTriggerStatus"
                        severity="success"
                        :life="5000"
                        :sticky="false
                      ">
                        Scraper successfully triggered.
                      </Message>
                    </div>
                </template>
              </Card>
            </div>
          </div>
          <div class="column" style="width:50%">
            <div class="card">
              <Card>
                <template #title>
                  Schedule Scraping Activity
                </template>
                <template #content>
                    Scrape every
                    <InputNumber v-model="frequency"/>
                    <Dropdown v-model="selectedFrequencyTypes"
                      :options="frequencyTypes"
                      optionLabel="name"
                      placeholder="Days" />
                </template>
                <template #footer>
                    <div style="text-align: right">
                      <Button label="Save Settings"
                        class="p-button-secondary"
                        style="width:100%"/>
                    </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="Cleaner Reference">
        <Card style="text-align:justify">
          <template #content>
            <p style="margin-left: 30px;font-style:italic;">
              The reference will be used in the cleaning phase.
              All values in each column of the masterfile will be considered valid. <br>
              Download the current masterfile or upload a new one.
            </p>
          </template>
          <template #footer>
            <div id="outer">
              <div class="inner">
                <Button
                  @click.prevent="downloadData(
                    'masterfile?file=True',
                    'cleaner_reference'
                  )"
                  icon="pi pi-download"
                  label="Download"
                  class="p-button-lg"
                  style="width:150%"
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style="display:inline-block">
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  url="./upload"
                  icon="pi pi-upload"
                  chooseLabel="Upload"
                  class="p-button-success p-button-lg"
                  style="width:150%"
                />
              </span>
            </div>
          </template>
        </Card>
      </AccordionTab>
      <AccordionTab header="Field Options">
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
                    <template #footer>
                      <div style="text-align: right">
                        <Button
                          @click.prevent="editRequiredFields(this.selectedRequiredFields)"
                          label="Save Settings"
                          class="p-button-secondary"
                          style="width:30%"/>
                      </div>
                      <Message
                        v-if="requiredFieldStatus"
                        severity="success"
                        :life="5000"
                        :sticky="false
                      ">
                        Settings successfully saved.
                      </Message>
                    </template>
                  </Card>
                  <br> <br>
                  <Card style="text-align:justify">
                    <template #content>
                      <big><b> Set Valid Range: </b></big>
                      <div style="text-align:center">
                        <b> Minimum </b>  &emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;
                        <b> Maximum </b> <br> <br>
                        <b> Mileage: </b> &emsp;
                        <InputNumber v-model="minMileage" suffix=" km" /> &emsp;
                        <InputNumber v-model="maxMileage" suffix=" km" /> <br> <br>
                        <b> Price: </b> &emsp;&emsp;&nbsp;
                        <InputNumber v-model="minPrice" suffix=" Php" /> &emsp;
                        <InputNumber v-model="maxPrice" suffix=" Php" /> <br> <br>
                        <b> Engine Size: </b>
                        <InputNumber v-model="minPrice"/> &emsp;
                        <InputNumber v-model="maxPrice"/>
                        <br>
                      </div>
                    </template>
                    <template #footer>
                      <div style="text-align: right">
                        <Button label="Save Settings"
                          class="p-button-secondary"
                          style="width:30%"/>
                      </div>
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
                    <template #footer>
                      <div style="text-align: right">
                        <Button label="Save Settings"
                          class="p-button-secondary"
                          style="width:30%"/>
                      </div>
                    </template>
                  </Card>
                </div>
              </template>
            </Card>
          </div>
      </AccordionTab>
    </Accordion>
  </Fieldset>
  <br>
</template>

<script>

export default {
  data () {
    return {
      requiredFieldStatus: false,
      manualTriggerStatus: false,
      scrapeDisplay: false,
      scrapeLinks: {},
      value: null,
      scraped_date: null,
      selectedSites: null,
      triggerSites: null,
      sites: [
        { name: 'Autodeal', value: 'autodeal' },
        { name: 'Automart', value: 'automart' },
        { name: 'Carguide', value: 'carguide' },
        { name: 'Carmudi', value: 'carmudi' },
        { name: 'Carousell', value: 'carousell' },
        { name: 'Philkotse', value: 'philkotse' }
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
      requiredFields: [],
      selectedRequiredFields: [],
      checked: []
    }
  },
  methods: {
    getToken () {
      console.log(localStorage.getItem('token'))
      return localStorage.getItem('token')
    },
    downloadData (prefix, filename) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())
      return fetch('http://127.0.0.1:8000/' + prefix, {
        method: 'GET',
        responseType: 'blob',
        headers: headers
      })
        .then(response => response.blob())
        .then(blob => {
          var fileURL = window.URL.createObjectURL(blob)
          var fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', filename + '.csv')
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(console.error)
    },
    downloadScraped (inputSites, inputDate) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())

      const sites = []
      for (var key in inputSites) {
        sites.push(inputSites[key].value)
      }

      const date = inputDate.getFullYear() +
        '-' +
        inputDate.getMonth() +
        '-' +
        inputDate.getDate()

      const url = 'http://127.0.0.1:8000/scraped_data' +
        '?sites=' +
        sites +
        '&date=' +
        date

      return fetch(url, {
        method: 'GET',
        responseType: 'json',
        headers: headers
      })
        .then(response => response.json())
        .then(data => {
          for (var site in data.sites) {
            this.scrapeLinks[site] = data.sites[site].replace(/['"]+/g, '')
            console.log(site, data.sites[site].replace('/"/g', ''))
          }
          this.scrapeDisplay = true
        })
        .catch(console.error)
    },
    handleTrigger (inputSites) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())

      const sites = []
      for (var key in inputSites) {
        sites.push(inputSites[key].value)
      }
      const jsonBody = { sites: sites }

      return fetch('http://127.0.0.1:8000/scrape', {
        method: 'POST',
        responseType: 'json',
        headers: headers,
        body: JSON.stringify(jsonBody)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.manualTriggerStatus = true
          console.log('here')
        })
        .then(this.manualTriggerStatus = false)
        .catch(console.error)
    },
    editRequiredFields (inputFields) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())

      const fieldList = []
      for (var field in inputFields) {
        fieldList.push(inputFields[field].name)
      }

      const jsonBody = {
        type: 'reject_if_null',
        status: true,
        list_of_fields: fieldList
      }

      return fetch('http://127.0.0.1:8000/columns', {
        method: 'PUT',
        responseType: 'json',
        headers: headers,
        body: JSON.stringify(jsonBody)
      })
        .then(res => {
          this.requiredFieldStatus = true
          console.log('here')
        })
        .then(this.requiredFieldStatus = false)
        .catch(console.error)
    }
  },
  mounted () {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', 'Bearer ' + this.getToken())

    fetch('http://127.0.0.1:8000/columns?type=reject_if_null', {
      method: 'GET',
      responseType: 'json',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        for (var item in data.items) {
          this.requiredFields.push(data.items[item])
        }
      })
  }
}
</script>

<style media="screen">
  *,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color: rgb(208, 214, 223);
}
.background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
form{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: black;
    letter-spacing: 0.5px;
    outline: black;
    border: black;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    font-style: normal;
    margin-left: 0;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color:whitesmoke;
    border-radius: 10px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #e5e5e5;
}
button{
    margin-top: 50px;
    width: 100%;
    background-color:lightgreen;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
}
h3{
    margin-bottom: 20px;
    margin-left: 120px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 33.3%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding in columns */
.row {margin: 0 -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  text-align: center;
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
}

.card button{
  width: 50%;
  justify-content: right;
  align-items: right;
  display: flex;
}

#outer
{
    width:100%;
    text-align: center;
}

.inner
{
    display: inline-block;
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
</style>

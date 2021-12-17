<template>
  <Dialog header="Scraped Files" v-model:visible="scrapeDisplay" >
    <ul>
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
    <div class="card">
      <Card style="text-align:justify;padding:20px 20px 50px">
        <template #title>
            Cleaned Listings
          </template>
        <template #content>
            <b>Last Scrape Date: {{this.latestRunDate}}</b>
            <br> <br>
            <i>Accepted Listings From The Last Scrape:</i><br>
            <li
              v-for="(value, key, index) in latestStats"
              :key="index"
              style="list-style-type:none"
            >
              {{key}}: {{value.valid}}/{{value.total}} listings ({{value.clean_percentage}}%)
            </li>
        </template>
        <template #footer>
            <Button
              @click.prevent="downloadData(
                'latest_data',
                'used_car_listings-cleaned-' +
                this.latestRunDate
              )"
              icon="pi pi-download"
              label="Download All Listings"
              style="position:absolute;right:50px"
            />
        </template>
      </Card>
    </div>
    <br>
    <div class="card">
      <Card style="text-align:justify;padding:20px 20px 50px">
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
              style="position:absolute;right:50px"
            />
        </template>
      </Card>
    </div>
    <br>
    <div class="card">
      <Card style="text-align:justify;padding:20px 20px 50px">
        <template #title>
          Process Logs
        </template>
        <template #content>
            Scrape Date &nbsp; <Calendar v-model="value"/> <br> <br>
        </template>
        <template #footer>
            <Button
              :disabled="this.logDisabled"
              icon="pi pi-download"
              label="Download"
              style="position:absolute;right:50px"
            />
        </template>
      </Card>
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
                        Please wait for 2 hours for the it to finish.
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
                    Scrape
                    <Dropdown v-model="selectedFrequencyTypes"
                      :options="frequencyTypes"
                      optionLabel="name"
                      placeholder="Select Frequency" />
                    <br> <br>
                    <div v-if="selectedFrequencyTypes">
                      <div v-if="selectedFrequencyTypes.name=='monthly'">
                        Select Date:
                        <InputNumber
                          v-model="scrapeScheduleDate"
                          max="31"
                          min="1"
                          placeholder="(1-31)"
                        />
                      </div>
                      <div v-if="selectedFrequencyTypes.name=='weekly'">
                        Select Day:
                        <Dropdown v-model="selectedFrequencyDays"
                          :options="frequencyDays"
                          optionLabel="name"
                          placeholder="(Mon-Sun)"
                        />
                      </div>
                    </div>
                </template>
                <template #footer>
                    <div style="text-align: right">
                      <Button
                        @click.prevent="scheduleScrape(this.selectedFrequencyTypes.name)"
                        label="Save Settings"
                        class="p-button-secondary"
                        style="width:100%"
                      />
                      <Message
                        v-if="scheduleScrapeStatus"
                        severity="success"
                        :life="5000"
                        :sticky="false
                      ">
                        Settings successfully saved.
                      </Message>
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
                    'used_car_listings-reference-' +
                    this.latestRunDate
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
                  :disabled=true
                  mode="basic"
                  name="demo[]"
                  url="http://127.0.0.1:8000/masterfile?file=true"
                  :auto="true"
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
                        <b> Minimum </b>  &emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;
                        <b> Maximum </b> <br> <br>
                        <b> Mileage: </b> &emsp;&emsp;&nbsp;&nbsp;
                        <InputNumber v-model="minMileage" suffix=" km" /> &emsp;
                        <InputNumber v-model="maxMileage" suffix=" km" /> <br> <br>
                        <b> Price: </b> &emsp;&emsp;&nbsp;&emsp;&nbsp;&nbsp;
                        <InputNumber v-model="minPrice" suffix=" Php" /> &emsp;
                        <InputNumber v-model="maxPrice" suffix=" Php" /> <br> <br>
                        <b> Engine Size: </b> &emsp;
                        <InputNumber v-model="minEngineSize"/> &emsp;
                        <InputNumber v-model="maxEngineSize"/>
                        <br>
                      </div>
                    </template>
                    <template #footer>
                      <i>Zero values indicate no max/min specified.</i>
                      <div style="text-align: right">
                        <Button
                          @click.prevent="editRange([
                            this.minEngineSize,
                            this.maxEngineSize,
                            this.minMileage,
                            this.maxMileage,
                            this.minPrice,
                            this.maxPrice
                          ])"
                          label="Save Settings"
                          class="p-button-secondary"
                          style="width:30%"/>
                      </div>
                      <Message
                        v-if="rangeStatus"
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
                      <big><b> Other Options: </b></big>
                      <br> <br>
                      <b> Approximate Values for: </b> &emsp;
                        <Listbox v-model="selectedApproximateFields"
                          :options="approximateFields"
                          optionLabel="name"
                          :multiple="this.boolTrue"
                          placeholder="Select Fields" />
                        <br>
                        <div style="text-align: right">
                          <Button
                            @click.prevent="editApproxConfigs(this.selectedApproximateFields)"
                            label="Save Settings"
                            class="p-button-secondary"
                            style="width:30%"/>
                        </div>
                        <Message
                          v-if="configStatus1"
                          severity="success"
                          :life="5000"
                          :sticky="false
                        ">
                          Settings successfully saved.
                        </Message>
                      <br> <br>
                      <b> Turn Invalid Values to Null for: </b> &emsp;
                        <Listbox v-model="selectedNullConvertedFields"
                          :options="nullConvertedFields"
                          optionLabel="name"
                          :multiple="this.boolTrue"
                          placeholder="Select Fields" />
                        <br>
                        <div style="text-align: right">
                          <Button
                            @click.prevent="editNullConfigs(this.selectedNullConvertedFields)"
                            label="Save Settings"
                            class="p-button-secondary"
                            style="width:30%"/>
                        </div>
                        <Message
                          v-if="configStatus2"
                          severity="success"
                          :life="5000"
                          :sticky="false
                        ">
                          Settings successfully saved.
                        </Message>
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
      configStatus1: false,
      configStatus2: false,
      boolTrue: true,
      scheduleScrapeStatus: false,
      logDisabled: true,
      latestStats: {},
      latestRunDate: '',
      rangeStatus: false,
      configStatus: false,
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
        { name: 'weekly', value: 'weekly' },
        { name: 'monthly', value: 'monthly' }
      ],
      selectedFrequencyDays: null,
      frequencyDays: [
        { name: 'Monday', value: 'Mon' },
        { name: 'Tuesday', value: 'Tue' },
        { name: 'Wednesday', value: 'Wed' },
        { name: 'Thursday', value: 'Thu' },
        { name: 'Friday', value: 'Fri' },
        { name: 'Saturday', value: 'Sat' },
        { name: 'Sunday', value: 'Sun' }
      ],
      minMileage: 0,
      maxMileage: 0,
      minPrice: 0,
      maxPrice: 0,
      minEngineSize: 0,
      maxEngineSize: 0,
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
      approximateFields: [],
      selectedApproximateFields: [],
      nullConvertedFields: [],
      selectedNullConvertedFields: [],
      checked: []
    }
  },
  methods: {
    getToken () {
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

      const month = inputDate.getMonth() + 1
      const sites = []
      for (var key in inputSites) {
        sites.push(inputSites[key].value)
      }

      const date = inputDate.getFullYear() +
        '-' +
        month +
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
      const jsonBody = {
        sites: sites,
        email_topic: 'dev'
      }

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

      const notRequired = []
      const notRequiredFields = this.requiredFields.filter(
        f => !this.selectedRequiredFields.includes(f)
      )
      for (var f in notRequiredFields) {
        notRequired.push(notRequiredFields[f].name)
      }

      const jsonBody2 = {
        type: 'reject_if_null',
        status: false,
        list_of_fields: notRequired
      }

      fetch('http://127.0.0.1:8000/columns', {
        method: 'PUT',
        responseType: 'json',
        headers: headers,
        body: JSON.stringify(jsonBody)
      })
        .then(res => {
          fetch('http://127.0.0.1:8000/columns', {
            method: 'PUT',
            responseType: 'json',
            headers: headers,
            body: JSON.stringify(jsonBody2)
          })
            .then(res => {
              this.requiredFieldStatus = true
            })
            .then(this.requiredFieldStatus = false)
            .catch(console.error)
        })
        .then(this.requiredFieldStatus = false)
        .catch(console.error)
    },
    editRange (inputValues) {
      // input values: minEngine maxEngine minMileage maxMileage minPrice maxPrice
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())

      for (var value in inputValues) {
        if (inputValues[value] === 0) {
          inputValues[value] = null
        }
      }

      const engineJsonBody = {
        type: 'col_range',
        min: inputValues[0],
        max: inputValues[1]
      }
      const mileageJsonBody = {
        type: 'col_range',
        min: inputValues[2],
        max: inputValues[3]
      }
      const priceJsonBody = {
        type: 'col_range',
        min: inputValues[4],
        max: inputValues[5]
      }

      fetch('http://127.0.0.1:8000/columns/engine_size', {
        method: 'PUT',
        responseType: 'json',
        headers: headers,
        body: JSON.stringify(engineJsonBody)
      })
        .then(
          fetch('http://127.0.0.1:8000/columns/mileage', {
            method: 'PUT',
            responseType: 'json',
            headers: headers,
            body: JSON.stringify(mileageJsonBody)
          })
        )
        .then(
          fetch('http://127.0.0.1:8000/columns/price', {
            method: 'PUT',
            responseType: 'json',
            headers: headers,
            body: JSON.stringify(priceJsonBody)
          })
            .then(res => { this.rangeStatus = true })
        )
        .then(this.rangeStatus = false)
        .catch(console.error)
    },
    editApproxConfigs (inputFields) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())

      const fieldList = []
      for (var field in inputFields) {
        fieldList.push(inputFields[field].name)
      }

      const jsonBody = {
        type: 'infer_from_make_or_desc',
        status: true,
        list_of_fields: fieldList
      }

      const notRequired = []
      const notRequiredFields = this.approximateFields.filter(
        f => !this.selectedApproximateFields.includes(f)
      )
      for (var f in notRequiredFields) {
        notRequired.push(notRequiredFields[f].name)
      }
      console.log(fieldList)
      console.log(notRequired)

      const jsonBody2 = {
        type: 'infer_from_make_or_desc',
        status: false,
        list_of_fields: notRequired
      }

      fetch('http://127.0.0.1:8000/columns', {
        method: 'PUT',
        responseType: 'json',
        headers: headers,
        body: JSON.stringify(jsonBody)
      })
        .then(res => {
          fetch('http://127.0.0.1:8000/columns', {
            method: 'PUT',
            responseType: 'json',
            headers: headers,
            body: JSON.stringify(jsonBody2)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              this.configStatus1 = true
            })
        })
        .then(this.configStatus1 = false)
        .catch(console.error)
    },
    editNullConfigs (inputFields) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())

      const fieldList = []
      for (var field in inputFields) {
        fieldList.push(inputFields[field].name)
      }

      const jsonBody = {
        type: 'convert_to_null_if_invalid',
        status: true,
        list_of_fields: fieldList
      }

      const notRequired = []
      const notRequiredFields = this.nullConvertedFields.filter(
        f => !this.selectedNullConvertedFields.includes(f)
      )
      for (var f in notRequiredFields) {
        notRequired.push(notRequiredFields[f].name)
      }
      console.log(fieldList)
      console.log(notRequired)

      const jsonBody2 = {
        type: 'convert_to_null_if_invalid',
        status: false,
        list_of_fields: notRequired
      }

      fetch('http://127.0.0.1:8000/columns', {
        method: 'PUT',
        responseType: 'json',
        headers: headers,
        body: JSON.stringify(jsonBody)
      })
        .then(res => {
          fetch('http://127.0.0.1:8000/columns', {
            method: 'PUT',
            responseType: 'json',
            headers: headers,
            body: JSON.stringify(jsonBody2)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              this.configStatus2 = true
            })
        })
        .then(this.configStatus2 = false)
        .catch(console.error)
    },
    scheduleScrape (inputFrequency) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Authorization', 'Bearer ' + this.getToken())

      let param = ''
      let paramKey = ''
      if (inputFrequency === 'weekly') {
        paramKey = 'day_per_week'
        param = this.selectedFrequencyDays.value
      } else {
        paramKey = 'date_per_month'
        param = this.scrapeScheduleDate
      }

      const jsonBody = {
        format: inputFrequency
      }
      jsonBody[paramKey] = param

      return fetch('http://127.0.0.1:8000/scrape_scheduler', {
        method: 'PUT',
        responseType: 'json',
        headers: headers,
        body: JSON.stringify(jsonBody)
      })
        .then(response => response.json())
        .then(data => {
          this.scheduleScrapeStatus = true
          console.log(data)
        })
        .then(this.scheduleScrapeStatus = false)
        .catch(console.error)
    }
  },
  mounted () {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', 'Bearer ' + this.getToken())

    fetch('http://127.0.0.1:8000/latest_stats', {
      method: 'GET',
      responseType: 'json',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        this.latestRunDate = data.datetime_exported
        const stats = data
        delete stats.batch_number
        delete stats.datetime_exported
        this.latestStats = stats
      })

    fetch('http://127.0.0.1:8000/columns?type=reject_if_null', {
      method: 'GET',
      responseType: 'json',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        for (var item in data.items) {
          this.requiredFields.push(data.items[item])
          if (data.items[item].status) {
            this.selectedRequiredFields.push(data.items[item])
          }
        }
      })

    fetch('http://127.0.0.1:8000/columns?type=infer_from_make_or_desc', {
      method: 'GET',
      responseType: 'json',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        for (var item in data.items) {
          this.approximateFields.push(data.items[item])
          if (data.items[item].status) {
            this.selectedApproximateFields.push(data.items[item])
          }
        }
      })

    fetch('http://127.0.0.1:8000/columns?type=convert_to_null_if_invalid', {
      method: 'GET',
      responseType: 'json',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        for (var item in data.items) {
          this.nullConvertedFields.push(data.items[item])
          if (data.items[item].status) {
            this.selectedNullConvertedFields.push(data.items[item])
          }
        }
      })

    fetch('http://127.0.0.1:8000/columns?type=col_range', {
      method: 'GET',
      responseType: 'json',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        for (var item in data.items) {
          if (data.items[item].name === 'engine_size') {
            if (data.items[item].max) {
              this.maxEngineSize = data.items[item].max
            } else {
              this.maxEngineSize = 0
            }
            if (data.items[item].min) {
              this.minEngineSize = data.items[item].min
            } else {
              this.minEngineSize = 0
            }
          } else if (data.items[item].name === 'price') {
            if (data.items[item].max) {
              this.maxPrice = data.items[item].max
            } else {
              this.maxPrice = 0
            }
            if (data.items[item].min) {
              this.minPrice = data.items[item].min
            } else {
              this.minPrice = 0
            }
          } else {
            if (data.items[item].max) {
              this.maxMileage = data.items[item].max
            } else {
              this.maxMileage = 0
            }
            if (data.items[item].min) {
              this.minMileage = data.items[item].min
            } else {
              this.minMileage = 0
            }
          }
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

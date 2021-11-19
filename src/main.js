import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import MultiSelect from 'primevue/multiselect'
import Divider from 'primevue/divider'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import TabMenu from 'primevue/tabmenu'
import Checkbox from 'primevue/checkbox'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.config.productionTip = false
app.use(router)

app.use(PrimeVue)
app.component('Card', Card)
app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('MultiSelect', MultiSelect)
app.component('Divider', Divider)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('TabMenu', TabMenu)
app.component('Checkbox', Checkbox)

app.mount('#app')

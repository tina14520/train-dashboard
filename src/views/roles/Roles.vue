
       <template>
  
   <CCardBody class="diva">
    <CNav variant="pills" class="flex-column ap">
        <div class="ad list-group-item ww"><CIcon name="cil-user" height="20" /> Admin Type</div>

  <CNavItem class=" list-group-item">
    <CNavLink  href="#"  @click="accordion = accordion === 0 ? false : 0">Accountent</CNavLink>
  </CNavItem>
  <CNavItem class="list-group-item">
    <CNavLink  href="#"  @click="accordion = accordion === 1 ? false : 1" >Super Admin</CNavLink>
  </CNavItem>
  <CNavItem class="list-group-item">
    <CNavLink href="#"   @click="accordion = accordion === 2 ? false : 2" >Sub Admin</CNavLink>
  </CNavItem>
  <CNavItem class="list-group-item">
    <CNavLink href="#"   @click="accordion = accordion === 3 ? false : 3">
      Manegars
    </CNavLink>
  </CNavItem>
</CNav>
    <div class="divl">
<CCardBody>
          <div>
            <CCard class="mb-0">
              <div class="ad list-group-item ww"><CIcon name="cil-check" height="17" /> Roles & permissions</div>
              <CCollapse :show="accordion === 0">
                <div>
                  <ejs-treeview id='treeview' CssClass='e-info' :fields="fields" :showCheckBox='true' :nodeClicked='nodeChecked' :keyPress='nodeChecked'></ejs-treeview>
                </div>
              </CCollapse>
            </CCard>
            <CCard class="mb-0">
              <CCollapse :show="accordion === 1">
                <CCardBody>
                <div>
                  <ejs-treeview id='treeview' :fields="fields" :showCheckBox='true' :nodeClicked='nodeChecked' :keyPress='nodeChecked'></ejs-treeview>
                </div>
                </CCardBody>
              </CCollapse>
            </CCard>
            <CCard class="mb-0">
              <CCollapse :show="accordion === 2">
                <CCardBody>
                <div>
                  <ejs-treeview id='treeview' :fields="fields" :showCheckBox='true' :nodeClicked='nodeChecked' :keyPress='nodeChecked'></ejs-treeview>
                </div>
                </CCardBody>
              </CCollapse>
              </CCard>
              <CCard class="mb-0">
              <CCollapse :show="accordion === 3">
                <CCardBody>
                <div>
                  <ejs-treeview id='treeview' :fields="fields" :showCheckBox='true' :nodeClicked='nodeChecked' :keyPress='nodeChecked'></ejs-treeview>
                </div>
                </CCardBody>
              </CCollapse>
            </CCard>
          </div>
        </CCardBody>
      </div>
    </CCardBody>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
// import { VueGoodTable } from 'vue-good-table';
// import { AgGridVue } from 'ag-grid-vue';
// import 'ag-grid-enterprise';
import Vue from 'vue';
import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations";
Vue.use(TreeViewPlugin);
// import Listbox from 'primevue/listbox';
// import PrimeVue from 'primevue/config';
// import Vue from 'vue'
// Vue.use(PrimeVue)
export default {
//   components: {
//   VueGoodTable,
//   // AgGridVue,
//   // Listbox
// },
  // name: 'ButtonGroups',
  data(){
    var dataSource =  [
        { id: 1, name: 'Taxi Booking', hasChild: true, expanded: true },
        { id: 2, pid: 1, name: 'Trip Booking', isChecked: true },
        { id: 3, pid: 1, name: 'Trip Tracking' },
        { id: 4, pid: 1, name: 'Current Status' },
        { id: 6, pid: 1, name: 'Follow Up', isChecked: true },
        { id: 7, name: 'Users', hasChild: true, expanded: true },
        { id: 8, pid: 7, name: 'Admins' },
        { id: 9, pid: 7, name: 'Customers' },
        { id: 10, name: 'Reports', hasChild: true, expanded: true },
        { id: 11, pid: 10, name: 'Trips Reports' },
        { id: 12, pid: 10, name: 'Booking Reports' },
        { id: 13, pid: 10, name: 'Cancelled Trips' },
        { id: 14, pid: 10, name: 'Finincial Reports' },
        { id: 15, pid: 10, name: 'Top Coustomers' },
        { id: 16, name: 'Attendance / Break', hasChild: false },
        { id: 17, name: 'Settings', hasChild: false },
        { id: 18, name: 'Roles', hasChild: false },
        { id: 19, name: 'Dashboard', hasChild: false , isChecked: true},
        // { id: 21, name: 'India', hasChild: true },
        // { id: 22, pid: 21, name: 'Assam' },
        // { id: 23, pid: 21, name: 'Bihar' },
        // { id: 24, pid: 21, name: 'Tamil Nadu' },
        // { id: 25, pid: 21, name: 'Punjab' }
    ];
    return {
        fields: { dataSource: dataSource, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
    //     columnDefs: [
    //     { field: 'country', rowGroup: true, hide: true },
    //     { field: 'sport', rowGroup: true, hide: true },
    //     { field: 'gold', aggFunc: 'sum' },
    //     { field: 'silver', aggFunc: 'sum' },
    //     { field: 'bronze', aggFunc: 'sum' },
    //     {
    //       field: 'age',
    //       minWidth: 120,
    //       checkboxSelection: checkboxSelection,
    //       aggFunc: 'sum',
    //     },
    //     { field: 'year', maxWidth: 120 },
    //     { field: 'date', minWidth: 150 },
    //   ],
    //   gridApi: null,
    //   columnApi: null,
    //   defaultColDef: {
    //     flex: 1,
    //     minWidth: 100,
    //   },
    //   autoGroupColumnDef: null,
    //   rowSelection: null,
    //   rowData: null,
    //    columnse: [
    //     {
    //       field: 'name',
    //     },
    //     {
    //       field: 'age',
    //       type: 'number',
    //     },
    //     {
    //       field: 'score',
    //       type: 'percentage',
    //     },
    //   ],
    //   rowse: [
    //     { id: 0, name: 'Senior Devs', score: 0.15296, children: [
    //       { id: 1, name: 'John',  age: 20, score: 0.03845 },
    //       { id: 2, name: 'Jane',  age: 24, score: 0.02948 },
    //       { id: 3, name: 'Susan', age: 16, score: 0.08503 }
    //     ]},
    //     { id: 4, name: 'Junior Devs', score: 0.12069, children: [
    //       { id: 5, name: 'Chris', age: 55, score: 0.02946 },
    //       { id: 6, name: 'Dan',   age: 40, score: 0.09123 }
    //     ]}
    //   ],
    //   active:false,
    //   visibleA: false,
    //   visibleB: false,
      collapse: false,
      accordion: 0,
    //   text: `
    //     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
    //     richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
    //     brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
    //     tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
    //     assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
    //     wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
    //     vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
    //     synth nesciunt you probably haven't heard of them accusamus labore VHS.
    //   ` ,
    //   selectedCity: null,
		// cities: [
		// 	{name: 'New York', code: 'NY'},
		// 	{name: 'Rome', code: 'RM'},
		// 	{name: 'London', code: 'LDN'},
		// 	{name: 'Istanbul', code: 'IST'},
		// 	{name: 'Paris', code: 'PRS'}
		// ]
    }
  },
  // mounted() {
  //   this.autoGroupColumnDef = {
  //     headerName: 'Athlete',
  //     field: 'athlete',
  //     minWidth: 250,
  //     cellRenderer: 'agGroupCellRenderer',
  //     cellRendererParams: { checkbox: checkbox },
  //   };
  //   this.rowSelection = 'multiple';
  // },
  methods:{
          nodeChecked: function(args) {
           var treeObj = document.getElementById('treeview').ej2_instances[0];
           var checkedNode = [args.node];
            if (args.event.target.classList.contains('e-fullrow') || args.event.key == "Enter") {
                var getNodeDetails = treeObj.getNode(args.node);
                if (getNodeDetails.isChecked == 'true') {
                    treeObj.uncheckAll(checkedNode);
                } else {
                    treeObj.checkAll(checkedNode);
                }
            }
        },
    // activity(){
    //   console.log("active")
    //   this.active=true;
    // },
    // onGridReady(params) {
    //   this.gridApi = params.api;
    //   this.gridColumnApi = params.columnApi;

    //   const updateData = (data) => {
    //     this.rowData = data;
    //   };

    //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //     .then((resp) => resp.json())
    //     .then((data) => updateData(data));
    // },
  },

}
</script>
<style scoped>
  @import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
  @import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
  
  .control_wrapper {
        display: block;
        max-width: 350px;
        max-height: 350px;
        margin: auto;
        overflow: auto;
        border: 1px solid #dddddd;
        border-radius: 3px;
    }
  .ap {
      width: 15rem;
      border-radius: 0.25rem;
      background-color:white;

  }
  .ac {
      color: floralwhite;
      background-color: steelblue;
      font-size: initial;
      font-weight: 600;
  }
  .ww{
    color : white;
    font-size: initial;
    font-weight: 600;
  }
  .diva{
      display: flow-root;
  }
  .ad{
      background-color: #303c50;
  }
  .divl{
      margin-top: -17rem;
      margin-left: 17rem;
  }
 .e-checkbox-wrapper {
  margin-top: 18px;
}

.e-checkbox-wrapper.e-primary:hover .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #e03872;
}

.e-checkbox-wrapper.e-success .e-frame.e-check,
.e-checkbox-wrapper.e-success .e-checkbox:focus + .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #689f38;
}

.e-checkbox-wrapper.e-success:hover .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #449d44;
}

.e-checkbox-wrapper.e-info .e-frame.e-check,
.e-checkbox-wrapper.e-info .e-checkbox:focus + .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #2196f3;
}

.e-checkbox-wrapper.e-info:hover .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #0b7dda;
}

.e-checkbox-wrapper.e-warning .e-frame.e-check,
.e-checkbox-wrapper.e-warning .e-checkbox:focus + .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #ef6c00;
}

.e-checkbox-wrapper.e-warning:hover .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #cc5c00;
}

.e-checkbox-wrapper.e-danger .e-frame.e-check,
.e-checkbox-wrapper.e-danger .e-checkbox:focus + .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #d84315;
}

.e-checkbox-wrapper.e-danger:hover .e-frame.e-check { /* csslint allow: adjoining-classes */
  background-color: #ba3912;
}
.e-checkbox-wrapper .e-frame.e-check, .e-css.e-checkbox-wrapper .e-frame.e-check {
    background-color: #e3e016;
    border-color: transparent;
    color: #fff;
}
.card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    height: max-content;
    padding: 1.25rem;
    width: auto;
}
</style>
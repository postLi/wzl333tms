import VTable from "./v-table/index";
import VPagination from "./v-pagination/index";
import VCheckbox from './v-checkbox/index'
import VCheckboxGroup from './v-checkbox-group/index'
import VSelect from './v-select/index'
import VDropdown from './v-dropdown/index'
import './themes-base/index.css'


const install = function(Vue, opts = {}) {

    Vue.component(VTable.name, VTable);
    Vue.component(VPagination.name, VPagination);
    Vue.component(VCheckbox.name, VCheckbox);
    Vue.component(VCheckboxGroup.name, VCheckboxGroup);
    Vue.component(VSelect.name, VSelect);
    Vue.component(VDropdown.name, VDropdown);

}



const vTable = {
    install
}
export default vTable;

export {
    VPagination,
    VTable,
    VCheckbox,
    VCheckboxGroup,
    VSelect,
    VDropdown
}

// module.exports = {
//     VPagination,
//     VTable,
//     VCheckbox,
//     VCheckboxGroup,
//     VSelect,
//     VDropdown
// };

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    // install(window.Vue);
    window.Vue.use(vTable)
}
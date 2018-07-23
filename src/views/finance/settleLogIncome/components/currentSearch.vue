<template>
  <el-form ref="searchForm" inline label-position="right" :model="searchForm" label-width="60px" class="tableHeadItemForm">
    <el-form-item>
      <el-select v-model="senderSearch" placeholder="发货方或发货人" :size="btnsize" clearable
      @focus="clearSender">
        <el-option label="发货方" value="unit"></el-option>
        <el-option label="发货人" value="customer"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="senderSearch==='customer'">
      <querySelect 
      v-model="searchForm.shipSenderName" 
      search="customerName" type="sender" 
      label="customerName" 
      :remote="true" 
      valuekey="customerName" 
      clearable placeholder="发货人搜索" 
      :size="btnsize" 
      @change="changeSender"></querySelect>
    </el-form-item>
    <el-form-item v-if="senderSearch==='unit'">
      <querySelect 
      v-model="searchForm.senderCustomerUnit" 
      search="customerUnit" 
      type="sender" 
      label="customerUnit" 
      valuekey="customerUnit" 
      :remote="true" 
      clearable 
      placeholder="发货方搜索" 
      :size="btnsize"
      @change="changeSender"></querySelect>
    </el-form-item>
    <el-form-item label="运单号">
      <querySelect 
      v-model="searchForm.shipSn" 
      search="shipSn" 
      type="order" 
      valuekey="shipSn" 
      :size="btnsize" 
      clearable></querySelect>
    </el-form-item>
    <el-form-item>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import querySelect from '@/components/querySelect/index'
export default {
  components: {
    querySelect
  },
  data() {
    return {
      senderSearch: '',
      searchForm: {},
      btnsize: 'mini'
    }
  },
  props: {
    info: {
      type: Array,
      default: []
    }
  },
  methods: {
    search() {
      let data = Object.assign(this.searchForm)
      let count = 0

      let leftTable = this.info
      let arr = []
      let curObj = new Object()
      for(let item in data) {
        if (data[item] !== '') {
        	count ++ // 判断是否有搜索项 有-count>0 否-count<1
        	this.$set(curObj, item, data[item])
        	arr.push(curObj)
        }
      }
      // let i =0
      // leftTable.forEach(e => {
      // 	for(let item in curObj) {
      // 		let index = e[item].indexOf(curObj[item])
      // 		console.log('index', index, i++)
      // 		if (index !== -1) {
      // 			console.log(e.shipSn)
      // 		}
      // 	}
      // })
      
      if (count > 0) {
      	return leftTable.filter(order => {
      		return Object.keys(data).reduce((flag, item) => {
      		 	console.log(flag, item)
      		 	if (!flag) {
      		 	  return false
      		 	}else {
      		 		// return data[item].trim()?String(order[item].indexOf())
      		 	}
      		 })
      		// return Object.keys(item).some((e) => {
      		// 	return String(item[e]).toLowerCase().indexOf(data) > -1
      		// })
      	})
      }
      console.log('searchLeftTasble', leftTable)
      // this.$emit('search', leftTable)
    },
    createFillter (queryString) {
      return (data) => {
      }
    },
    changeSender (obj) {
    },
    clearSender (event) {
      this.searchForm.senderCustomerUnit = ''
      this.searchForm.shipSenderName = ''
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemForm {
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  .el-input {
    width: 120px;
    .el-input__inner {
      padding: 0 10px;
    }
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
}

</style>

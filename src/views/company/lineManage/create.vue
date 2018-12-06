<template>
  <div class="create-range page-main identification">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
        <div class="prompt">
            <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
        </div>
        <div class="searchInformation information">
            <h2>基本信息</h2>
            <el-form-item label="出发网点：" prop="fromOrgid" label-width="100px">
                <select-tree :disabled="unable" v-model="ruleForm.fromOrgid" :orgid="otherinfo.companyId" />
            </el-form-item>
            <el-form-item label="出发城市：" label-width="100px" prop="startLocation">
                <el-input :value="ruleForm.startLocation" v-if="unable" disabled></el-input>

                <vregion :ui="true" @values="regionChangeStart" :ifAera = 'true' class="form-control" @testCity="ifProvice('startLocation')" v-else>
                    <el-input v-model="ruleForm.startLocation" placeholder="请选择出发城市" ></el-input>
                </vregion>
            </el-form-item>
            <el-form-item label="联系人：" prop="rangeFromContacts" label-width="100px">
                <el-input :maxlength="10" v-model="ruleForm.rangeFromContacts" :disabled="unable"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="rangeFromMobile" label-width="100px">
                <div><input class="nativeinput nativeinput-border" :value="ruleForm.rangeFromMobile" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'rangeFromMobile')}" :maxlength="11" auto-complete="off"  clearable
                        v-number-only :disabled="unable" type="text"></div>
            </el-form-item><br>
            <el-form-item label="到达网点：" prop="toOrgid" label-width="100px">
                <select-tree :disabled="unable" v-model="ruleForm.toOrgid" :orgid="otherinfo.companyId" />
            </el-form-item>
            <el-form-item label="到达城市：" label-width="100px" prop="endLocation">
                <el-input v-model="ruleForm.endLocation" v-if="unable" disabled></el-input>

                <vregion :ui="true" @values="regionChangeEnd" :ifAera = 'true' class="form-control"  @testCity="ifProvice('endLocation')" v-else>
                    <el-input v-model="ruleForm.endLocation"  placeholder="请选择到达城市"></el-input>
                </vregion>
            </el-form-item>
            <el-form-item label="联系人：" prop="rangeToContacts" label-width="100px">
                <el-input :maxlength="10" v-model="ruleForm.rangeToContacts" :disabled="unable"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="rangeToMobile" label-width="100px">
              <div><input class="nativeinput nativeinput-border" :value="ruleForm.rangeToMobile" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'rangeToMobile')}" :maxlength="11" auto-complete="off"  clearable
                        v-number-only :disabled="unable" type="text"></div>
                 
            </el-form-item>
        </div>
        <div class="information priceTime">
            <h2>价格时效</h2>
            <el-form-item label="运输时效：" prop="transportAging">
                <span v-if="ruleForm.transportAgingType === 2">
                  <input class="nativeinput nativeinput-border" :value="ruleForm.transportAging1" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'transportAging1')}" :maxlength="2" auto-complete="off"  clearable
                        v-number-only :disabled="unable" @keyup.native='handlerChoose' type="text">-<input class="nativeinput nativeinput-border" :value="ruleForm.transportAging2" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'transportAging2')}" :maxlength="2" auto-complete="off"  clearable
                        v-number-only :disabled="unable" @keyup.native='handlerChoose' type="text">
                </span>
                <span v-else>
                  <input class="nativeinput nativeinput-border" :value="ruleForm.transportAging" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'transportAging')}" :maxlength="2" auto-complete="off"  clearable
                        v-number-only :disabled="unable" @keyup.native='handlerChoose' type="text">
                </span>
                
                <el-radio-group v-model="ruleForm.transportAgingType" :disabled="unable">
                    <el-radio :label="0">天</el-radio>
                    <el-radio :label="1">小时</el-radio>
                    <el-radio :label="2">多天</el-radio>
                </el-radio-group>
                <span class="supplement">(多天填写如：2-5，其它只能填写阿拉伯数字)</span>
            </el-form-item>


            <el-form-item label="重货价格：" prop="weigthPriceForms">
                <p>(阶梯价格最大值不填，代表无穷大，例如：500-，代表500公斤以上)</p>
                <div class="goodsPriceChoose">
                    <p>
                        <span>运量</span>
                        <span>原报价 <strong>(必填)</strong></span>
                    </p>
                    <ul v-for="(form,keys) in weigthPriceForms" :key="keys">
                        <li>
                            <el-input v-model.number="form.startVolume" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <input class="nativeinput nativeinput-border" :value="form.endVolume" @change="(e)=>{setInputVal(e.target.value,form, 'endVolume'),ifWrong(weigthPriceForms,keys)}" :maxlength="7" placeholder="不包含" auto-complete="off"  clearable
                            v-number-only :disabled="unable" type="text">
                            公斤
                        </li>
                        <li>
                            <input class="nativeinput nativeinput-border" :value="form.primeryPrice" @change="(e)=>{setInputVal(e.target.value,form, 'primeryPrice'),ifWrong(weigthPriceForms,keys)}" :maxlength="7" auto-complete="off"  clearable
                            v-number-only:point :disabled="unable" type="text">
                            元/公斤
                        </li>
 
                        <li class="buttons" v-if="!unable">
                            <span  @click="addItem('weight',keys,form)" class="addItem" v-if="keys == weigthPriceForms.length-1 && keys != 4">
                            </span>
                            <span  @click="reduceItem(keys,'weight')" class="reduceItem" v-if="keys == weigthPriceForms.length-1 && weigthPriceForms.length !=1 " >
                            </span>
                        </li>
                    </ul>
                </div>
            </el-form-item>

            <el-form-item label="轻货价格：" prop="ligthPriceForms">
                <p>(阶梯价格最大值不填，代表无穷大，例如：10-，代表10立方以上)</p>
                <div class="goodsPriceChoose">
                    <p>
                        <span>运量</span>
                        <span>原报价 <strong>(必填)</strong></span>
                    </p>
                    <ul v-for="(form,keys) in ligthPriceForms" :key="keys">
                        <li>
                            <el-input v-model.number="form.startVolume" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                            <span>----</span>
                            <input class="nativeinput nativeinput-border" :value="form.endVolume" @change="(e)=>{setInputVal(e.target.value,form, 'endVolume'),ifWrong(ligthPriceForms,keys)}" :maxlength="7" placeholder="不包含" auto-complete="off"  clearable
                            v-number-only :disabled="unable" type="text">
                            立方
                        </li>
                        <li>
                            <input class="nativeinput nativeinput-border" :value="form.primeryPrice" @change="(e)=>{setInputVal(e.target.value,form, 'primeryPrice'),ifWrong(ligthPriceForms,keys)}" :maxlength="7" auto-complete="off"  clearable
                        v-number-only:point :disabled="unable" type="text">
                            元/立方
                        </li>
                        <li class="buttons" v-if="!unable">
                            <span  @click="addItem('light',keys,form)" class="addItem" v-if="keys == ligthPriceForms.length-1 && keys != 4">
                            </span>
                            <span  @click="reduceItem(keys,'light')" class="reduceItem" v-if="keys == ligthPriceForms.length-1 && ligthPriceForms.length !=1">
                            </span>
                        </li>
                    </ul>
                </div>
            </el-form-item>

            <el-form-item label="最低一票价格：" prop="lowerPrice">
                <div><input class="nativeinput nativeinput-border" :value="ruleForm.lowerPrice" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'lowerPrice')}" :maxlength="6" auto-complete="off"  clearable
                        v-number-only:point1 placeholder="报价" :disabled="unable" type="text"> 元</div>
            </el-form-item>
            <el-form-item label="价格预警设置：" >
                <ul>
                  <li>在参考价上下幅度 <div class="el-input-group"><input class="nativeinput nativeinput-border" :disabled="unable" placeholder=""  :value="ruleForm.priceNormal" @blur="checkPrice" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'priceNormal')}" :maxlength="7" v-numberOnly auto-complete="off"  clearable
                            type="text" />
                  <div class="el-input-group__append">%</div>
               </div> 元 为正常</li>
               <li>在参考价上下幅度 <div class="el-input-group"><input class="nativeinput nativeinput-border" :disabled="unable" placeholder=""  :value="ruleForm.priceAbnormal" @blur="checkPrice" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'priceAbnormal')}" :maxlength="7" v-numberOnly auto-complete="off"  clearable
                            type="text" />
                  <div class="el-input-group__append">%</div>
               </div> 元 为异常</li>
               <li>在参考价上下幅度 <div class="el-input-group"><input class="nativeinput nativeinput-border" placeholder=""  :value="ruleForm.priceBigabnormal" @blur="checkPrice" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'priceBigabnormal')}" :maxlength="7" v-numberOnly auto-complete="off"  clearable disabled
                            type="text" />
                  <div class="el-input-group__append">%</div>
               </div> 元以上 严重异常</li>
                </ul>
            </el-form-item> 

            <el-form-item label="线路说明：" class="textarea" prop="transportRemark" >
                <el-input type="textarea" 
                    :disabled="unable"
                    v-model="ruleForm.transportRemark" 
                    :autosize="{ minRows: 3, maxRows: 10}"
                    :maxlength="500" 
                    placeholder="请填写备注30-500个字。提供原创说明有助于提升线路效果。">
                </el-input>
                <span>{{ruleForm.transportRemark.length}} / 500</span>
                <p class="supplement">请对您的线路进行补充说明，尽量使用市场上或物流行业内的常用词。</p>
            </el-form-item>

        </div>
        <el-form-item class="fromfooter" v-show="ifShowRangeType != 2">
            <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" v-if="ifShowRangeType == '1'">修改</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" v-else>立即发布</el-button>
        </el-form-item>
    </el-form>
    <!-- <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" /> -->

  </div>
</template>
<script>
import { newTransportRangeList, TransportRangeInfo, changeTransportRange } from '@/api/company/line'

import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage2'
// import tmsmap from '@/components/map/index'
import vregion from '@/components/vregion/Region.vue'
import { objectMerge2 } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
export default {
  name: 'lineManageDetail',
  components: {
    upload,
        // tmsmap,
    vregion,
    SelectTree
  },
  data() {
    var checkrangeFromMobile = (rule, value, callback) => {
            // console.log(value)
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!REGEX.MOBILE.test(value)) {
          callback(new Error('请输入正确的手机号码格式'))
        }
        callback()
      }
    }
    var checkrangeToMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!REGEX.MOBILE.test(value)) {
          callback(new Error('请输入正确的手机号码格式'))
        }
        callback()
      }
    }

    var checkWeigthPriceForms = (rule, value, callback) => {
      if (this.weigthPriceForms[0].endVolume === '') {
        callback(new Error('请补充重货价格区间'))
      } else {
        this.weigthPriceForms.forEach(el => {
          if (el.primeryPrice === '') {
            callback(new Error('请补充重货价格区间'))
          } else {
            callback()
          }
        })
      }
    }

    var checkLightPriceForms = (rule, value, callback) => {
      this.ligthPriceForms.forEach(el => {
        if (el.endVolume === '') {
          callback(new Error('请补充轻货运量'))
        } else if (el.primeryPrice === '') {
          console.log('123')
          callback(new Error('请补充轻货价格区间'))
        } else {
          callback()
        }
      })
    }
    return {
      unable: false,
      ifShowRangeType: '0',
      ruleForm: {
        startLocation: '',
        endLocation: '',
        transportAging1: '',
        transportAging2: '',

        'fromOrgid': '',
        'lowerPrice': '', // 最低一票价
        'priceAbnormal': 30,
        'priceBigabnormal': 30,
        'priceNormal': 10,
        'rangeFromArea': '',
        'rangeFromCity': '',
        'rangeFromContacts': '',
        'rangeFromMobile': '',
        'rangeFromProvince': '',
        'rangeToArea': '',
        'rangeToCity': '',
        'rangeToContacts': '',
        'rangeToMobile': '',
        'rangeToProvince': '',
        'toOrgid': '',
        'transportAging': '', // 0-1 3-1
        'transportAgingType': 0, // 0 天 1 小时 2 多天
        'transportRemark': ''
      },
      ligthPriceForms: [
        {
          startVolume: '0',
          endVolume: '',
          primeryPrice: '', // 标准价
          type: '0'
        }
      ],
      weigthPriceForms: [
        {
          startVolume: '0',
          endVolume: '',
          primeryPrice: '', // 标准价
          type: '1'
        }
      ],
      rules: {
        fromOrgid: [
                    { required: true, message: '请选择出发网点', trigger: 'blur' }
        ],
        toOrgid: [
                    { required: true, message: '请选择到达网点', trigger: 'blur' }
        ],
        startLocation: [
                    { required: true, message: '请输入出发城市', trigger: 'change' }
        ],
        endLocation: [
                    { required: true, message: '请输入到达城市', trigger: 'change' }
        ],
        rangeFromContacts: [
                    { message: '请输入出发城市联系人信息', trigger: 'blur' }
        ],
        rangeToContacts: [
                    { message: '请输入到达城市联系人信息', trigger: 'blur' }
        ],
        rangeFromMobile: [
                    { required: true, validator: checkrangeFromMobile, trigger: 'change' }
        ],
        rangeToMobile: [
                    { required: true, validator: checkrangeToMobile, trigger: 'change' }
        ],
        rangeType: [
                    { required: true, message: '请选择专线类型', trigger: 'change' }
        ],
        transportRemark: [
                    { min: 30, max: 500, message: '专线说明请在30-500字', trigger: 'blur' }
        ],
        weigthPriceForms: [
                    { required: true, validator: checkWeigthPriceForms, trigger: 'blur' }
        ],
        ligthPriceForms: [
                    { required: true, validator: checkLightPriceForms, trigger: 'blur' }
        ],
        primeryPrice: [
                    { required: true, message: '请填写价格', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route(to, from) {
      const reg = /\/company\/lineManage\/(detail|create|modify)/
        // a b 相同组件 c其它组件
        // a <-> b 跳出时需要调用缓存数据；回来时重载缓存数据
        // a -> c/b 跳出时需要调用缓存数据
        // b -> c 保留数据
        // ab(x) -> 清除缓存数据
      // 从当前页面到其它页面
      console.log('to path:', to.path, from.path)
      if (reg.test(to.path) === false && reg.test(from.path)) {
        // 如果是跳出去其它页面，缓存当前页面数据
        // 如果是详情页跳出去，要不要缓存下数据呢？y
        // 如果是修改页面，是缓存当前正在操作的吧？y
        this.saveData(from.fullPath)
      }
      // 俩个相同组件之间跳转
      if (reg.test(to.path) && reg.test(from.path)) {
        this.saveData(from.fullPath)
        this.getParams()
      }
    },
    'ruleForm.priceAbnormal'() {
      this.ruleForm.priceBigabnormal = this.ruleForm.priceAbnormal
    }
  },
  activated() {
    // 判断是修改/查看/新建
    // 在router对象里判断是否有缓存
    this.getParams()
  },
  mounted() {

  },
  methods: {
    setInputVal(val, item, name) {
    //   this.$set(this.form.tmsOrderCargoList, name, val)
      this.$set(item, name, isNaN(parseFloat(val, 10)) ? '' : parseFloat(val, 10))
    },
    checkPrice() {
      let a = this.ruleForm.priceNormal
      let b = this.ruleForm.priceAbnormal
      a = Number(a) || ''
      b = Number(b) || ''
      if (b) {
        if (!a || a >= b) {
          this.ruleForm.priceNormal = ''
          this.ruleForm.priceAbnormal = ''
          this.$message.info('必须先填写正常幅度，且小于异常幅度')
        }
      }
    },
    ifWrong(item, idx) {
      const flag = item[idx].endVolume <= item[idx].startVolume
      if (item[idx].endVolume === '' && idx >= 1 && idx === (item.length - 1)) {
        // 不处理最后一栏终止运量
        return false
      }
      if (flag) {
        this.$message({
          type: 'info',
          message: '终止运量应不小于起始运量'
        })
        item[idx].endVolume = ''
        return
      } else if (item.length > (idx + 1)) {
        item[idx + 1].startVolume = item[idx].endVolume
        if (item[idx + 1].endVolume) {
          if (item[idx + 1].endVolume < item[idx + 1].startVolume) {
            this.$message({
              type: 'info',
              message: '终止运量应不小于起始运量'
            })
            return item.splice(idx + 1)
          }
        }
      }
    },
    isSpecialCity(name) {
      return /(北京|天津|上海|重庆|香港|澳门)/.test(name)
    },
    regionChangeStart(d) {
      this.ruleForm.startLocation = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      this.ruleForm.rangeFromProvince = d.province ? d.province.name : ''
      this.ruleForm.rangeFromCity = this.isSpecialCity(this.ruleForm.rangeFromProvince) ? d.province.name : d.city ? d.city.name : ''
      this.ruleForm.rangeFromArea = d.area ? d.area.name : ''
    },
    regionChangeEnd(d) {
      this.ruleForm.endLocation = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      if (this.ruleForm.endLocation == this.ruleForm.startLocation) {
        this.$message({
          type: 'info',
          message: '出发城市不可与到达城市重复！'
        })
        this.ruleForm.endLocation = ''
        return
      }
      this.ruleForm.rangeToProvince = d.province ? d.province.name : ''
      this.ruleForm.rangeToCity = this.isSpecialCity(this.ruleForm.rangeToProvince) ? d.province.name : d.city ? d.city.name : ''
      this.ruleForm.rangeToArea = d.area ? d.area.name : ''
    },
    ifProvice(type) {
      console.log('ifProvice', type)
      this.$message({
        type: 'info',
        message: '至少选择到市级范围'
      })
      if (type === 'startLocation') {
        this.ruleForm.startLocation = ''
        return
      } else {
        this.ruleForm.endLocation = ''
        return
      }
    },
    getValue(obj) {
      return obj ? obj.value : ''
    },
    saveData(thepath) {
      const path = encodeURIComponent(thepath)
      const data = {
        unable: this.unable,
        ifShowRangeType: this.ifShowRangeType,
        ruleForm: this.ruleForm,
        ligthPriceForms: this.ligthPriceForms,
        weigthPriceForms: this.weigthPriceForms
      }
      sessionStorage.setItem(path, JSON.stringify(data))
    },
    reinputData(data) {
      const orgData = this.$options.data()
      this.unable = data.unable
      this.ifShowRangeType = data.ifShowRangeType
      this.ruleForm = data.ruleForm || data.ruleForm
      this.ligthPriceForms = data.ligthPriceForms || orgData.ligthPriceForms
      this.weigthPriceForms = data.weigthPriceForms || orgData.weigthPriceForms
    },
    getParams() {
      // 判断有没有缓存的数据，有则填上去
      const path = encodeURIComponent(this.$route.fullPath)
      let data = sessionStorage.getItem(path)
      if (data) {
        data = JSON.parse(data)
        if (data.ruleForm) {
          this.reinputData(data)
          return false
        }
      }

      if (this.$route.query.id) {
        this.ifShowRangeType = this.$route.path.indexOf('modify') !== -1 ? '1' : '2'// 1是修改，2是详情

        TransportRangeInfo(this.$route.query.id).then(res => {
          const data = res.data
          if (data) {
            for (const j in data) {
              data[j] = data[j] === null ? '' : data[j]
            }
          // 格式化数据
            for (const i in this.ruleForm) {
              this.ruleForm[i] = res.data[i]
            }
            this.ruleForm.id = res.data.id
          // 出发城市
            this.ruleForm.startLocation = data.rangeFromProvince + (this.isSpecialCity(data.rangeFromProvince) ? '' : data.rangeFromCity) + data.rangeFromArea
            this.ruleForm.endLocation = data.rangeToProvince + (this.isSpecialCity(data.rangeToProvince) ? '' : data.rangeToCity) + data.rangeToArea
            // 价格时效
            if (data.transportAgingType === '2') {
              this.ruleForm.transportAgingType = 2
              this.ruleForm.transportAging1 = data.transportAging.split('-')[0] || ''
              this.ruleForm.transportAging2 = data.transportAging.split('-')[1] || ''
            }
            // 重货、轻货

            if (data.heavePrice.length) {
              this.weigthPriceForms = []
              data.heavePrice.forEach(el => {
                this.weigthPriceForms.push({
                  startVolume: el.startVolume,
                  endVolume: el.endVolume,
                  primeryPrice: el.primeryPrice, // 标准价
                  type: '1'
                })
              })
            }

            if (data.lightPrice.length) {
              this.ligthPriceForms = []
              data.lightPrice.forEach(el => {
                this.ligthPriceForms.push({
                  startVolume: el.startVolume,
                  endVolume: el.endVolume,
                  primeryPrice: el.primeryPrice, // 标准价
                  type: '0'
                })
              })
            }
          } else {
            this.$message.info('获取失败。')
          }
        }).catch(err => {
          this._handlerCatchMsg(err, '获取失败，原因：')
        })
        if (this.ifShowRangeType === '2') {
          this.unable = true
        } else {
          this.unable = false
        }
      } else {
        const adata = this.$options.data()
        this.reinputData(adata)
      }
    },
        // 判断和限制
    handlerChoose() {
      const type = this.ruleForm.transportAgingUnit
      let transportAging = this.ruleForm.transportAging
      if (type !== '多天') {
        transportAging = transportAging.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
        transportAging = transportAging.replace(/^\./g, '') // 验证第一个字符是数字
        transportAging = transportAging.replace(/\.{2,}/g, '.') // 只保留第一个, 清除多余的
        transportAging = transportAging.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3') // 只能输入一位小数
        this.ruleForm.transportAging = transportAging
      } else {
        transportAging = transportAging.replace(/[^0-9\-]+/g, '')
        this.ruleForm.transportAging = transportAging
      }
    },
        // 添加子节点新增
    addItem(type, idx, item) {
            // console.log(type)
      switch (type) {
        case 'weight':
                // console.log(item.primeryPrice)
          if (item.endVolume === '' || item.endVolume === 0) {
            return this.$message({
              type: 'info',
              message: '请补充重货运量'
            })
          } else if (item.primeryPrice === '') {
            return this.$message({
              type: 'info',
              message: '请补充重货原报价'
            })
          } else {
            this.weigthPriceForms.push({
              startVolume: this.weigthPriceForms[idx].endVolume,
              endVolume: '',
              primeryPrice: '', // 标准价
              type: '1'
            })
          }
          break
        case 'light':
          if (item.endVolume === '' || item.endVolume === 0) {
            return this.$message({
              type: 'info',
              message: '请补充轻货运量'
            })
          } else if (item.primeryPrice === '') {
            return this.$message({
              type: 'info',
              message: '请补充轻货原报价'
            })
          } else {
            this.ligthPriceForms.push({
              startVolume: this.ligthPriceForms[idx].endVolume,
              endVolume: '',
              primeryPrice: '', // 标准价
              type: '0'
            })
          }
          break
      }
    },
        // 删除子节点新增
    reduceItem(idx, type) {
      console.log(idx, type)
      switch (type) {
        case 'weight':
          this.weigthPriceForms.splice(idx, 1)
          break
        case 'light':
          this.ligthPriceForms.splice(idx, 1)
          break
      }
    },
        // 提交按钮
    submitForm(formName) {
      console.log(this.ruleForm)
      let ifNull = true
      let messageInfo

      this.ligthPriceForms.forEach(item => {
        if (item.primeryPrice === '') {
          messageInfo = '请补充轻货原报价'
          ifNull = false
        }
      })
      this.weigthPriceForms.forEach(item => {
        if (item.primeryPrice === '') {
          messageInfo = '请补充重货原报价'
          ifNull = false
        }
      })
      if (this.ruleForm.fromOrgid !== '' && this.ruleForm.fromOrgid === this.ruleForm.toOrgid) {
        messageInfo = '出发网点跟到达网点不能一样'
        ifNull = false
      }
      // 检查是否选了时效类别但没填数据时提示
      if (this.ruleForm.transportAgingType === 2) {
        const sa = Number(this.ruleForm.transportAging1) || 0
        const sb = Number(this.ruleForm.transportAging2) || 0
        if (((sa + sb) && !(sa * sb)) || (sa > sb)) {
          messageInfo = '请填写正确的时效值'
          ifNull = false
        }
      }

      if (ifNull) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let commitFunction
            const obj = {
              tmsSystemTransportRangeDto: {},
              tmsSystemTransportRangePriceDtoList: []
            }
            const data = objectMerge2({}, this.ruleForm)

            // 针对数据进行格式化处理
            // 处理运输时效
            if (data.transportAgingType === 2) {
              data.transportAging = data.transportAging1 + '-' + data.transportAging2
            }
            // 处理重货/轻货
            this.ligthPriceForms.forEach(item => {
              obj.tmsSystemTransportRangePriceDtoList.push(item)
            })

            this.weigthPriceForms.forEach(item => {
              obj.tmsSystemTransportRangePriceDtoList.push(item)
            })

            // 删去没用的数据
            delete data.startLocation
            delete data.endLocation
            delete data.transportAging1
            delete data.transportAging2

            obj.tmsSystemTransportRangeDto = data

            if (this.ifShowRangeType === '1') {
              // commitFunction = newTransportRangeList(obj)
              commitFunction = changeTransportRange(obj)
            } else {
              commitFunction = newTransportRangeList(obj)
            }
            commitFunction.then(res => {
              console.log('res', res)
              if (res.status === 200) {
                this.$alert('操作成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    if (this.ifShowRangeType === '1') {
                      this.eventBus.$emit('replaceCurrentView', '/company/lineManage')
                    } else {
                      this.eventBus.$emit('replaceCurrentView', '/company/lineManage')
                    }
                  }
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '操作失败，原因：' + (res.errorInfo ? res.errorInfo : res.text)
                })
              }
            }).catch(err => {
              this.$message({
                type: 'info',
                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
              })
            })
          } else {
            this.$message({
              type: 'info',
              message: '请填写完整信息'
            })
            return false
          }
        })
      } else {
        this.$message({
          type: 'info',
          message: messageInfo
        })
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.transportAgingType = 0
      this.ruleForm.priceAbnormal = 30
      this.ruleForm.priceBigabnormal = 30
      this.ruleForm.priceNormal = 10
      this.ligthPriceForms = [
        {
          startVolume: '0',
          endVolume: '',
          primeryPrice: '', // 标准价
          type: '0'
        }
      ]
      this.weigthPriceForms = [
        {
          startVolume: '0',
          endVolume: '',
          primeryPrice: '', // 标准价
          type: '1'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.identification{
    background: #fff;
    width: 100%;
    height: 100%;
    .prompt{
        margin: 10px;
        padding: 12px 27px 19px;
        background-color: #FFEBD7;
        margin-bottom: 13px;
        & p:nth-child(1){
            margin-bottom: 5px;
        }
        p{
            line-height: 17px;
            font-size: 14px;
            color: #333333;
            .tishi{
                line-height: 20px;
                font-size: 14px;
                font-weight: bold;
                position: relative;
                &>i{
                    position: absolute;
                    top: 2px;
                    left: -17px;
                    color: #ff300d;
                }
            }
            .star{
                color: #ff300d;
                font-weight: bold;
                padding: 0 2px;
            }
            .site{
                color: #0e91e9;
                font-weight: bold;
            }
        }
    }
    .el-form{
        width: 100%;
        height: 100%;
        position: relative;
        .btnChoose{
            float: right;
            .el-form-item__content{
                margin-left: 0 !important;
                width: 155px !important;
                .el-button{
                    padding: 6px 20px;
                }
            }
        }
        .searchInformation{
            .el-form-item{
                display: inline-block;
                margin-bottom: 0px;
            }
        }
        .created{
            margin-bottom: 20px;
        }
       
        h2{
            line-height: 24px;
            font-size: 20px;
            font-weight: normal;
            color: #333333;
        }
        .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner  {
            text-indent: 10px;
            background-color: #fff;
            border-color: #e4e7ed;
            color: #333;
            cursor: not-allowed;
            word-break:break-all;
        }
        .information{
            background: #fff;
            padding: 10px;
            margin:0 10px 10px 10px;
            border: 1px solid #ccc;
            .tableStyle{
                height: 100%;
            }
            &>h2{
                margin-bottom: 10px;
                padding: 5px 0;
                border-bottom: 1px solid #e4e7ed;
            }
            &>.el-form-item{
                .el-form-item__label{
                    line-height: 28px;
                    font-size: 14px;
                    letter-spacing: 0px;
                    color: #333;
                }
                .el-form-item__content{
                    line-height: 28px;
                    // width: 250px;
                    .el-input{
                        position: relative;
                        .el-input__inner{
                            height: 28px;
                            line-height: 28px;
                            overflow:hidden;/*超出长度的文字隐藏*/
                            text-overflow:ellipsis;/*文字隐藏以后添加省略号*/
                            white-space:nowrap;/*强制不换行*/
                        }
                        .el-input-group__append{
                            position: absolute;
                            top: 7px;
                            right: -10px;
                            background: #fff;
                            color: #0e91e9;
                            line-height:14px;
                            font-size: 12px;
                            border: 0 none ;
                            padding: 0;
                        }
                    }
                    .el-select{
                        width: 100%;
                    }
                    .el-date-editor{
                        width: 100%;
                        .el-input__inner{
                            padding-left:35px; 
                        }
                        .el-input__icon{
                            line-height: 30px;
                        }
                    }
                    &>.licensePicture{
                        height: 133px;
                        margin-top: 18px;
                        display: inline-block;
                    }
                    .preview{
                        padding: 7px 96px;
                        width: 100%;
                    }
                    .showPicture{
                        width: 100%;
                        height: 133px;
                        display: inline-block;
                        margin-top: 18px;
                    }
                   
                }
            }
            .moreWidth{
                .el-form-item__content{
                    width: 75%;
                }
            }
            .textarea{
                position: relative;
                .el-form-item__content{
                    width: 570px;
                    p,span{
                        color: #999999;
                        font-size: 12px;
                    }
                    span,.countNum{
                        position: absolute;
                        right: 20%;
                        bottom: -5px;
                    }
                    .countNum{
                        width: 20px;
                    }
                }
            }

            .minHeight{
                margin-bottom:0;
                .el-form-item__content{
                    min-height: 209px;
                }
            }
        }
        
        .informationTable{
            height:72%
        }
        .contactInformation,.picInformation{
            .el-form-item{
                display: inline-block;
                vertical-align: top;
            }
        }

        .picInformation{
            .el-form-item{
                .el-form-item__content{
                    min-height:209px; 
                }
                p{
                    span{
                        color: #ff300d;
                    }
                }
            }
        }


        .fromfooter{
            padding: 60px 150px;
            .el-button{
                span{
                    font-size: 16px;
                    line-height: 22px;
                }
            }
        }

        .info_tab_footer{
            padding-left: 20px;
            background: #eee;
            height: 40px;
            line-height: 40px;
            box-shadow: 0 -2px 2px rgba(0,0,0,.1);
            position: relative;
            z-index: 10;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }

        .show_pager{
            float: right;
            line-height: 40px;
            height: 40px;
            overflow: hidden;
        }
    }

    

}

.page-main{
        height: 100%;
        .el-input-group{
          width: 150px;
        }
        .el-textarea{
          width: 80%;
        }
        .el-form{
            >.searchInformation{
                .el-form-item{
                    margin-bottom: 20px;
                    .el-form-item__content{
                        .v-region{
                            .caller-container{
                                width: 100%;
                            }
                            .v-dropdown-container{
                                top: 35px !important;
                                left: 0px !important;
                            }
                        }
                    }
                }
                
            }
            .priceTime{
                border: none;
                .el-input{
                    width: 250px;
                }
                .el-form-item{
                    .el-form-item__content{
                        position: relative;
                        .supplement{
                            font-size: 12px;
                            color: #ccc;
                        }
                    }
                }

                .el-form-item:nth-child(2){
                    .el-form-item__content{
                        .el-input,.nativeinput{
                            width:130px;
                        }
                    }
                }
                .el-form-item:nth-child(3),.el-form-item:nth-child(4){
                    .el-form-item__content{
                        width: 1165px;
                        .el-input{
                            width: 50px;
                        }
                        p{
                            font-size: 12px;
                            color:red;
                        }
                        .goodsPriceChoose{  
                            border: 1px solid #ccc;
                            .nativeinput{
                                width: 80px;
                            }
                            p{
                                padding: 6px 50px;                     
                                background: #33A2F7;
                                font-size: 14px;
                                line-height: 17px;
                                color: #fff;
                                span{
                                    strong{
                                        color: red;
                                        font-size: 12px;
                                    }
                                }
                                span:first-child{
                                    margin:0 168px;
                                }
                                span:nth-child(2){
                                    margin:0 140px;
                                }
                                 span:nth-child(3){
                                    margin:0 122px;
                                }
                            }
                            ul{
                                padding: 8px 110px 8px 50px;
                                // display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                                // display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                                // display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                                // display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                                // display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
                                // justify-content:space-around;
                                font-size: 12px;
                                position: relative;
                                overflow: hidden;
                                li{
                                    .el-input{
                                        width: 80px;
                                    }
                                    float: left;
                                }
                                li:first-child{
                                    margin-left: 9%;
                                }
                                li:nth-child(2){
                                    margin-left: 20%;
                                }
                                li:nth-child(3){
                                    margin-left: 21%; 
                                }
                                .buttons{
                                    position: absolute;
                                    right: 0;
                                    top: 0;
                                }
                                .addItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../assets/icom/23zengjia.png') no-repeat center;
                                    position: absolute;
                                    top:10px;
                                    right: 80px;
                                    &:hover{
                                        background:url('../../../assets/icom/24zengjia-b.png') no-repeat center;
                                    }
                                }
                                .reduceItem{
                                    display:inline-block;
                                    height: 26px;
                                    width:26px;
                                    line-height: 26px;
                                    cursor: pointer;
                                    background:url('../../../assets/icom/21shanchu.png') no-repeat center;
                                    position: absolute;
                                    top:10px;
                                    right:40px;
                                    &:hover{
                                        background:url('../../../assets/icom/22shanchu-b.png') no-repeat center;
                                    }
                                }
                            }
                        }
                    }
                }
                .el-form-item:nth-child(5),{
                    .el-form-item__content{
                        .el-input,.nativeinput{
                            width: 100px;
                        }
                    }
                }
                .departureTime{
                    .el-form-item__content{
                        width: 250px;
                    }
                }

                .imgBox{
                    display: inline-block;
                    width: 25%;
                    height: 200px;
                    margin-right: 10px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>

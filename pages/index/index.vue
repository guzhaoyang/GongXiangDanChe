<template>
    <view class="">
        <div class="header">
            <view class="content">
                你要去哪里：
                 <view class="text-area">
                    <text @click="toMap()" class="title">{{title}}</text>
			     </view>
            </view>
            
             <input @input="changeCity" v-model="city" type="text" height="50" />
            <ul v-show="isShowSearch">
                <li @click="getCityHandle(item.address)" v-for="item in suggestionData" :key="item.id">{{item.address}}</li>
            </ul>
			
			<div>
				<button @click="DanChe()">单车出行</button>
			</div>
        </div>
        
    </view>
 
</template>
 
<script>
    import {
        Debounce
    } from '../../utils/debounce.js'
 
    export default {
        data() {
            return {
                title: '出发',
                key: '2J4BZ-3CFEV-OYSPG-UDFGU-ONNNS-63FOT',
                city: '河南省鹤壁市浚县',
                locationConfig: null,
                noClick: true,
                suggestionData: null,
                isShowSearch:false
            }
        },
        onLoad() {},
        methods: {
			DanChe(){
				uni.navigateTo({
				    url: `/pages/danche/index`
				})
			},
            toMap() {
                this.getPosition((location) => {
                    uni.navigateTo({
                        url: `/pages/map/index?lat=${ location.lat}&lng=${ location.lng}&city=${this.city}`
                    })
                })
            },
            getPosition(callback) {
                uni.request({
                    url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${this.city}&key=${this.key}`,
                    success: ({
                        data
                    }) => {
                        callback(data.result.location)
                    },
                })
            },
            getCityHandle(val) {
                this.city = val
                this.isShowSearch = false
            },
            changeCity: Debounce(function(e) {
                this.isShowSearch = true
                console.log(432);
                this.city = e.target.value
                uni.request({
                    url: `https://apis.map.qq.com/ws/place/v1/suggestion?key=${this.key}&keyword=${this.city}`,
                    success: ({
                        data
                    }) => {
                        console.log(423, data.data);
                        this.suggestionData = data.data
                    },
                })
 
            }, 1000)
        }
    }
</script>
 
<style>
    ul {
        height: auto;
            width: 90%;
        overflow: scroll;
    }
 
    ul li {
        margin: 2px;
        width: 100%;
        height: auto;
        border-radius: 10upx;
        background-color: #ccc;
        padding: 10upx;
        box-sizing: border-box;
    }
 
    .content {
        display: flex;
        margin-bottom: 20upx;
    }
 
    .logo {
        height: 200rpx;
        width: 200rpx;
        margin-top: 200rpx;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50rpx;
    }
 
    .text-area {
        display: flex;
        justify-content: center;
        border: 1px solid #ccc;
        width: 30%;
            border-radius: 10upx;
    }
 
    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }
 
    .header {
        width: 100%;
        height: 30upx;
        padding: 30upx;
 
    }
 
    .header input {
            width: 90%;
        border: 1px solid #ccc;
        border-radius: 10upx;
    }
</style>
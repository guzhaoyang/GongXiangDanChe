<template>
    <view class="">
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map style="width: 100%; height: 75vh;" 
                 id="mapDom"
                 show-location 
                 :latitude="latitude" 
                 :longitude="longitude" 
                 :markers="covers"
                 @updated="lodingMap"
                 >
                </map>
                <div @click="backPositionHandle" class="positionIcon"></div>
            </view>
        </view>
        <view class="footer">
            <h3>你的目的地</h3>
            <view class="descriptive">{{city}}</view>
            <button class="position" @click="getHereHandle">到这里</button>
        </view>
    </view>
 
</template>
 
<script>
    export default {
        data() {
            return {
                latitude: 0,
                longitude: 0,
                covers: [{
                    id: 1,
                    width: 50,
                    height: 50,
                    latitude: 0,
                    longitude: 0,
                   
                }, ],
                city:'',
                flag:false
            }
        },
        onReady() {
            this.mapDom = uni.createMapContext('mapDom')
            console.log(423,this.mapDom);
        },
        onLoad(option) {
            this.covers[0].latitude = Number(option.lat)
            this.covers[0].longitude = Number(option.lng)
            this.city = option.city
			console.log('onLoad')
            //  uni.getLocation 不触发直接将基础库调整为 2.17.0
            uni.getLocation({
                type: 'gcj02',
                success: (res) => {
					//debugger
					console.log('getLocation11')
                    console.log('当前位置的经度：' + res.longitude);
                    console.log('当前位置的纬度：' + res.latitude);
                    this.latitude = Number(res.latitude)
                    this.longitude = Number(res.longitude)
                    // 获取位置成功之后进行缩放，直观的看到坐标
                    // includePoints 缩放视野展示所有经纬度
                    this.mapDom.includePoints({
                        padding:[140,50,140,50],
                        points:[
                            //第一个是我的位置
                            {
                                latitude:this.latitude,
                                longitude:this.longitude
                            },
                            // 第二个是店铺的位置
                            {
                                latitude:this.covers[0].latitude,
                                longitude:this.covers[0].longitude
                            }
                        ]
                    })
                }
            });
        },
        methods:{
            // 地图初始化完成后触发
            lodingMap() {
                console.log(423);
				console.log('gzy');
                this.flag = true
            },
            getHereHandle() {
                if(!this.flag) return
                // let plugin = requirePlugin('routePlan');
                // let key = '2J4BZ-3CFEV-OYSPG-UDFGU-ONNNS-63FOT';  //使用在腾讯位置服务申请的key
                // let referer = 'navigateMap';   //调用插件的app的名称
                // let endPoint = JSON.stringify({  //终点
                //   'name': '北京西站',
                //   'latitude': 39.894806,
                //   'longitude': 116.321592
                // });
                // wx.navigateTo({
                //   url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
                // });
                uni.openLocation({
                      latitude:this.covers[0].latitude,    //维度
                      longitude: this.covers[0].longitude, //经度
                      name: this.city,    //目的地定位名称
                      scale: 15,    //缩放比例
                      // address: "河南省鹤壁市浚县"    //导航详细地址
                    })
        
            },
            backPositionHandle() {
                if(!this.flag) return
                this.mapDom.moveToLocation();
            }
        }
    }
</script>
 
<style>
    .page-section-gap {
        position: relative;
    }
    .footer{
        width: 100%;
        height: 25vh;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20upx  40upx 0 40upx;
        display: flex;
        flex-direction: column;
        border-radius: 22upx;
    }
    .position{
        height: 90upx;
        line-height:90upx;
        background-color: #3d89f0;
        color: #fff;
        width: 100%;
    }
    .descriptive{
        font-size: 30upx;
        margin: 30upx 0 30upx 0;
    }
    .positionIcon {
        width: 40upx;
        height: 40upx;
        border-radius: 50%;
        position: absolute;
        bottom: 40upx;
        right: 40upx;
        background-image: url('https://tse2-mm.cn.bing.net/th/id/OIP-C.fCPxTGJccQvVdqrNFqrMRwHaHa?pid=ImgDet&rs=1');
        background-size: 100% 100%;
    }
</style>
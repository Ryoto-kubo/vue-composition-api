<template>
  <div>
    <!-- <loading 
      :active.sync="isLoading" 
      :can-cancel="true" 
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      color="#ffffff"
      background-color="#000000"
      :opacity="opacity"
    /> -->
    <div class="main_container">
      <div class="main_block">
        <!-- mapタブ -->
        <div v-if="isActive === 'map'">
          <div class="main_block_header">
            <div class="main_block_header_label">
              <p>10:00-11:04<molecules-duration-time
                :duration-time="durationTime"/></p>
              <p>次は<span class="-bold">太郎君</span>です(約15分)</p>
            </div>
            <div class="main_block_header_icon">
              <font-awesome-icon
              icon="home"
              color="#fff"
              size="3x"
              />
            </div>
          </div>
        </div>
        <!-- mapタブ -->

        <!-- listタブ -->
        <div v-if="isActive === 'list'">
          <div class="main_block_header">
            <div class="main_block_header_label">
              <p>10:00-11:04<molecules-duration-time
                :duration-time="durationTime"/></p>
              <p>次は<span class="-bold">太郎君</span>です(約15分)</p>
            </div>
            <div class="main_block_header_icon">
              <font-awesome-icon
              icon="home"
              color="#fff"
              size="3x"
              />
            </div>
          </div>
        </div>
        <!-- listタブ -->

        <!-- carタブ -->
        <div v-if="isActive === 'car'">
          <molecules-car
            @getUserData="getUserData"
          />
        </div>
        <!-- carタブ -->
      </div>

      <div class="main_list">
        <input type="radio" id="tab_map" name="list_tab" value="map" v-model="isActive">
        <label class="main_list_item" for="tab_map">
          <font-awesome-icon
            icon="map-marker-alt"
          />
          <span>Map</span>
        </label>
        <input type="radio" id="tab_list" name="list_tab" value="list" v-model="isActive">
        <label class="main_list_item" for="tab_list">
          <font-awesome-icon
            icon="list"
          />
          <span>List</span>
        </label>
        <input type="radio" id="tab_car" name="list_tab" value="car" v-model="isActive">
        <label class="main_list_item" for="tab_car">
          <font-awesome-icon
            icon="car-side"
          />
          <span>Car</span>
        </label>
      </div>

      <div class="main_block">

        <!-- mapタブ -->
        <div v-if="isActive === 'map'">
          <molecules-map
          :start-location="startLocation"
          :zoom="zoom"
          :map-style="mapStyle"
          />
        </div>
        <!-- mapタブ -->

        <!-- listタブ -->
        <div v-if="isActive === 'list'">
          <molecules-time
          :now-time="nowTime"
          :arrival-time="arrivalTime"
          :way-points-result-array="wayPointsResultArray"
        />
        </div>
        <!-- listタブ -->

        <!-- carタブ -->
        <div v-if="isActive === 'car'">
          <molecules-map
          :start-location="startLocation"
          :zoom="zoom"
          :map-style="mapStyle"
          />
        </div>
        <!-- carタブ -->
      <button @click="getCurrentLocation">移動する</button>
      </div>
      <div>
        <molecules-info 
          :distance="distance"
          :duration-time="durationTime"
        />
      </div>
    </div>
  </div>
</template>
    
<script>
import MoleculesInfo from '@/components/plugins/molecules/MoleculesInfo'
import MoleculesTime from '@/components/plugins/molecules/MoleculesTime'
import MoleculesMap from '@/components/plugins/molecules/MoleculesMap'
// import Loading from '../../../node_modules/vue-loading-overlay'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    MoleculesInfo,
    MoleculesTime,
    MoleculesMap,
    // Loading,
  },
  data() {
    return {
      // isLoading: false,
      fullPage: false,
      opacity: 0.7,
      distance: null,
      durationTime: null,
      arrivalTime: null,
      nowTime: null,
      wayPointsOptimizedArray: [],
      isActive: 'car',
    }
  },
  props: {
    startLocation: Object,
    zoom: Number,
    mapStyle: Object
  },
  computed: {
    ...mapGetters([
      'getCurrentLocation',
      'getEndLocation',
      'getWayPoints',
      'getDirectionsData',
      'getIsMove',
      'getLegs',
      'getLocation'
    ]),
  },
  methods: {
    ...mapActions([
      'setWayPoints',
      'setCurrentLocation',
      'setDirectionsData',
      'setIsMove',
      'setLegs',
      'setLocation'
    ]),
    getCurrent(){
      console.log('押したよ！');
      navigator.geolocation.watchPosition(
        pos => {
          var lat = pos.coords.latitude
          var lng = pos.coords.longitude
          this.setCurrentLocation({lat: lat, lng: lng})
          this.setIsMove(true)
          this.directions()
        },
        err => {
          alert('errorだよ')
          console.log(err);
        },
      )
    },
    getUserData(car) {
      if (navigator.geolocation) {
        const API_URL = process.env.VUE_APP_API_URL
        this.$axios.get(API_URL)
        .then(response => {
          // this.isLoading = true
          // 経路表示
          this.calculateAndDisplayRoute(car.carType, car.color, response.data)
        })
        .catch(error => {
          alert('しばらく時間を置いてやり直して下さい。')
          console.log(error)
        })
      } else {
        alert("本ブラウザではGeolocationが使えません");
      }
    },
    calculateAndDisplayRoute(carName, strokeColor, userData) { 
      var map       = new this.$google.maps.Map(document.getElementById("map"))      
      var wayPoints = this.createWayPoints(carName, strokeColor, userData)      
      this.setDirectionsData({carName: carName, strokeColor: strokeColor})        
      this.setWayPoints(wayPoints.userInfo)      
      this.setLocation(wayPoints.userInfo[carName])
      
      // マーカーの追加
      var marker = new this.$google.maps.Marker({
        position: this.startLocation, // マーカーを立てる位置を指定
        map: map, // マーカーを立てる地図を指定
      })
      // 吹き出しの表示
      var infoWindow = new this.$google.maps.InfoWindow({ // 吹き出しの追加
        content: '<div class="sample">到着地点</div>' // 吹き出しに表示する内容
      })
      infoWindow.open(map, marker)
      this.directions()
    },
    directions() {
      var legs
      var $this              = this
      var nowTime            = new Date() // 現在の時間
      var arrivalTime        = new Date() // 到着時間
      var directionsService  = new this.$google.maps.DirectionsService
      var directionsRenderer = new this.$google.maps.DirectionsRenderer      
      var map                = new this.$google.maps.Map(document.getElementById("map"))      
      this.nowTime           = nowTime.toTimeString().substr(0, 5)

      // directions
      directionsService.route({
        origin: $this.getCurrentLocation, // 出発地
        destination: {lat: 35.6016919, lng: 139.7348444}, // 到着地 東京品川病院
        waypoints: [
          {"location": "35.6016919, 139.7348444", "stopover": false},
          {"location": "35.6068354, 139.7383847", "stopover": false},
          {"location": "35.6261646, 139.7357103", "stopover": false},
          {"location": "35.645919, 139.747637", "stopover": false},
        ], // 経由地
        waypoints: $this.getLocation, // 経由地
        destination: $this.getEndLocation, // 到着地
        travelMode: 'DRIVING', // 車モード
        drivingOptions: {
          departureTime:  new Date('2020/03/10 09:00:00'),
          trafficModel: $this.$google.maps.TrafficModel.BEST_GUESS
        },
        avoidHighways: true, // 高速は利用しない
        // optimizeWaypoints: true, // 最短距離にする
      }, 
      (response, status) => {
        if (status !== 'OK') {
          window.alert('Directions request failed due to ' + status)
          return
        }
        legs = response.routes[0].legs
        console.log(response);
        
        // optimizeWaypointsで最適化をしたindex順を取得
        var wayPointOrderNumberArray = response.routes[0].waypoint_order
        // 到着時間を抽出する
        var arrivalTimeObject = $this.extractionArrivalTime(legs, wayPointOrderNumberArray, nowTime)

        $this.wayPointsOptimizedArray = arrivalTimeObject.wayPointsOptimizedArray
        // 総合距離をkmに、総合時間を○○:○○へ変える        
        $this.distance     = Math.round(arrivalTimeObject.dis / 1000)
        $this.durationTime = Math.round((arrivalTimeObject.sec / 3600) * 10) / 10
        $this.durationTime = parseFloat($this.durationTime)
        $this.durationTime = $this.toMinute($this.durationTime)
        // 到着時間の計算
        arrivalTime.setMinutes(arrivalTime.getMinutes() + arrivalTimeObject.sec / 60)
        $this.arrivalTime = arrivalTime.toTimeString().substr(0, 5)
        new $this.$google.maps.Marker({ // マーカーの追加
          position: {lat: 35.6016919, lng: 139.7348444}, // マーカーを立てる位置を指定
          map: map // マーカーを立てる地図を指定
        });
        new $this.$google.maps.Marker({ // マーカーの追加
          position: {lat: 35.6068354, lng: 139.7383847}, // マーカーを立てる位置を指定
          map: map // マーカーを立てる地図を指定
        });
        new $this.$google.maps.Marker({ // マーカーの追加
          position: {lat: 35.6261646, lng: 139.7357103}, // マーカーを立てる位置を指定
          map: map // マーカーを立てる地図を指定
        });
        new $this.$google.maps.Marker({ // マーカーの追加
          position: {lat: 35.645919, lng: 139.747637}, // マーカーを立てる位置を指定
          map: map // マーカーを立てる地図を指定
        });
        // レンダリング
        // directionsRenderer.setMap(map)
        // directionsRenderer.setDirections(response)
        // if(!isMove){
        //   // 500ms待ってピンを動かす
        //   // setTimeout(() => $this.movePoint(map, response.routes[0].overview_path, strokeColor), 500)
        //   return 
        // }
      })
    },
    createWayPoints(carName, strokeColor, userData){
      // 経由地の追加
      var wayPoints                        = {}
      wayPoints.userInfo                   = []
      wayPoints.userInfo['data']           = []
      wayPoints.userInfo[carName]          = []
      wayPoints.userInfo[carName]['color'] = strokeColor
      userData.forEach(function(value) {
        var lat = value.lat
        var lng = value.lng
        var car = value.car
        var userName = value.name        
        if (car === carName) {
          wayPoints.userInfo[carName].push({location: lat + "," + lng})
          wayPoints.userInfo['data'].push({name: userName, location: lat + "," + lng})
        }
      })
      return wayPoints
    },
    movePoint(map, pathCoords, strokeColor) {
      var i, route, marker
      marker = new this.$google.maps.Marker({map: map})
      route = new this.$google.maps.Polyline({
        path: [],
        geodesic : false,
        strokeColor: strokeColor,
        strokeWeight: 6,
        editable: false,
        map: map
      })
      for (i = 0; i < pathCoords.length; i++) {             
        setTimeout(function(coords) {
          route.getPath().push(coords)
          marker.setPosition(coords)
          map.panTo(coords)
        }, 30 * i, pathCoords[i])
      }
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    toMinute(hourTime) {
      var stringTime, minute, hour
      if (hourTime > 1) {
        stringTime = String(hourTime)
        // 時間を切り取り
        hour = stringTime.slice(0, 1)
        // 分を切り取り
        minute = stringTime.substr(2)
        minute = Number(minute) * 6
        return hour + '時間' + minute + '分'
      } else {
        minute = hourTime * 60
        return minute + '分'
      }
    },
    extractionArrivalTime(legs, wayPointOrderNumberArray, nowTime) {      
      var sec                         = 0
      var dis                         = 0
      var extractionArrivalTimeObject = {}
      var wayPointsOptimizedArray     = []
      var wayPointsOptimezedLocation  = [] 
      var testArray                   = []
      var wayPoints                   = this.getWayPoints // スプレッドシートからfetchしたデータ
      var isMove                      = this.getIsMove
      wayPointOrderNumberArray.forEach((val) => {
        testArray.push(wayPoints.data[val])
      })      
      if (!isMove) {        
        legs.forEach(function(val, index) {
          nowTime.setMinutes(nowTime.getMinutes() + val.duration.value / 60)
          if (testArray[index] !== undefined){
            testArray[index]["progressTime"] = nowTime.toTimeString().substr(0, 5)
            wayPointsOptimezedLocation.push({location: testArray[index].location})
            wayPointsOptimizedArray.push(testArray[index])
          }
          legs[index]['test'] = testArray[index]
          sec += val.duration.value
          dis += val.distance.value
        })      
      } else {
        alert(legs[0].distance.value)
        if (legs[0].distance.value < 200) {
          alert('目的地周辺です');
          legs.shift();
          testArray.shift();
        }
        legs.forEach(function(val, index) {
          
          nowTime.setMinutes(nowTime.getMinutes() + val.duration.value / 60)          
          if (testArray[index] !== undefined){
            testArray[index]["progressTime"] = nowTime.toTimeString().substr(0, 5)
            wayPointsOptimezedLocation.push({location: testArray[index].location})
            wayPointsOptimizedArray.push(testArray[index])
          }
          sec += val.duration.value
          dis += val.distance.value
        })        
      }

      extractionArrivalTimeObject.wayPointsOptimizedArray = wayPointsOptimizedArray
      extractionArrivalTimeObject.sec = sec
      extractionArrivalTimeObject.dis = dis
      // vuexに保存
      // 目的地周辺になったら0から消すデータ
      this.setLocation(wayPointsOptimezedLocation)
      this.setLegs(legs)
      return extractionArrivalTimeObject
    },
  }
}
</script>

<style lang="scss" scoped>
.main{
  &_container{
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  // display: flex;
  // justify-content: space-around;
  }
  &_block {
    max-width: 768px;
    width: 100%;
    margin: 20px auto;
    &_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      p {
        display: block;
        margin: 0;
        padding: 5px 0;
        &:nth-of-type(1){
          border-bottom: 1px solid #000;
          display: initial;
        }
      }
      .-bold {
        font-size: 34px;
        font-weight: bold;
      }
      &_label {
        text-align: left;
      }
      &_icon {
        border-radius: 50%;
        background-color: rgba(217, 83, 79, .5);
        width: 82px;
        height: 82px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  &_list {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    input[type="radio"]{
      display: none;
      opacity: 0;
      visibility: hidden;
    }
    input[type="radio"]:checked + .main_list_item{
      background-color: #0F8FBA;
      color: #fff;
    }
    &_item {
      border-radius: 17px;
      width: calc((100% - 30px) /3);
      height: 35px;
      border: 1px solid #0F8FBA;
      color: #0F8FBA;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .8s;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background-color: #0F8FBA;
        color: #fff;
      }
      font-awesome-icon {
        color: #0F8FBA;
        &:hover {
          color: #fff;
        }
      }
      span {
        margin-left: 10px;
      }
    }
  }
}

</style>
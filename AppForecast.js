import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month;
    return time;
  }

class Forecast extends Component {
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', }}>
        <Text style={css.cityFound}>
          {this.props.name}
        </Text>
        <Text style={css.cityTemp}>
          {(this.props.temp)}°C
        </Text>
        <Text style={css.cityDetails}>
         {this.props.description}
        </Text>
        
        <View style={{ flexDirection: 'row', paddingTop: 20}}>
          <View style={css.dailyTemp}>
            <Text style={css.cityDetails}>
             {timeConverter(this.props.dt1)}
            </Text>
            <Text style={css.cityDetails}>
             {(this.props.day1min)}°C
            </Text>
            <Text style={css.cityDetails}>
             {(this.props.day1max)}°C
            </Text>
          </View>

          <View style={css.dailyTemp}>
            <Text style={css.cityDetails}>
             {timeConverter(this.props.dt2)} 
            </Text>
            <Text style={css.cityDetails}>
             {(this.props.day2min)}°C
            </Text>
            <Text style={css.cityDetails}>
             {(this.props.day2max)}°C
            </Text>
          </View>

          <View style={css.dailyTempLast}>
            <Text style={css.cityDetails}>
             {timeConverter(this.props.dt3)} 
            </Text>
            <Text style={css.cityDetails}>
             {(this.props.day3min)}°C
            </Text>
            <Text style={css.cityDetails}>
             {(this.props.day3max)}°C
            </Text>
          </View>
        </View>


      </View>
    );
  }
}

var css = StyleSheet.create({
  cityFound: {
    fontSize: 24,
    margin: 10,
    color: '#FFFFFF'
  },
  cityTemp: {
    fontSize: 40,
    margin: 10,
    color: '#FFFFFF'
  },
  cityDetails: {
    fontSize: 22,
    margin: 10,
    color: '#FFFFFF'
  },
  dailyTemp: {
    width: 100, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRightColor: '#FFFFFF',
    borderRightWidth: 0.8
  },
  dailyTempLast: {
    width: 100, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});

export default Forecast;
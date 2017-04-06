import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

import Forecast from './AppForecast';

class AppWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityname: '',
      forecast: null,
      daily: null
    };
  }

  _handleTextChange(event) {
    
    var cityname = event.nativeEvent.text;
    this.setState({cityname: cityname});
    
    //api busca pelo nome da cidade, apenas cidades brasileiras, dados em portugues e sistema metrico

    var request1 = 'http://api.openweathermap.org/data/2.5/weather?q='+ cityname + 
    ',BR&lang=pt&units=metric&APPID=900437027f4070b330e380e7d52e9263';

    var request2 = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+ cityname + 
    ',BR&lang=pt&units=metric&cnt=7&APPID=900437027f4070b330e380e7d52e9263';
    
    fetch(request1).then((response) => response.json()).then((responseJSON) => {
        this.setState({
          forecast: {
            name: responseJSON.name,
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp,
            pressure: responseJSON.main.pressure,
            humidity: responseJSON.main.humidity,
          }
        });
      }).then(()=>{
        fetch(request2).then((response) => response.json()).then((responseJSON) => {
         this.setState({
          daily: {
            day1min: responseJSON.list[1].temp.min,
            day1max: responseJSON.list[1].temp.max,
            dt1: responseJSON.list[1].dt,
            day2min: responseJSON.list[2].temp.min,
            day2max: responseJSON.list[2].temp.max,
            dt2: responseJSON.list[2].dt,
            day3min: responseJSON.list[3].temp.min,
            day3max: responseJSON.list[3].temp.max,
            dt3: responseJSON.list[3].dt,
           }
          });
        })
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    var content = null;
    if (this.state.forecast !== null && this.state.daily !== null) 
    {
      content = <Forecast 
        name={this.state.forecast.name}
        main={this.state.forecast.main}
        description={this.state.forecast.description}
        temp={this.state.forecast.temp}
        pressure={this.state.forecast.pressure}
        humidity={this.state.forecast.humidity}
        dt1={this.state.daily.dt1}
        day1min={this.state.daily.day1min}
        day1max={this.state.daily.day1max}
        dt2={this.state.daily.dt2}
        day2min={this.state.daily.day2min}
        day2max={this.state.daily.day2max}
        dt3={this.state.daily.dt3}
        day3min={this.state.daily.day3min}
        day3max={this.state.daily.day3max}/>;
    }

    return (
      <View style={css.container}>
        <Image source={require('./sky.png')} resizeMode='cover'>
          <View style={css.main}>
           <View>
             <Text  style={css.question}>Como está o tempo em</Text>
             <View style={{borderBottomColor: '#FFF', borderBottomWidth: 1, marginBottom: 40,}}>
             	<TextInput style={css.city} onSubmitEditing={(event) => this._handleTextChange(event)}/>
           	 </View>
           </View>
           {content}
         </View>
        </Image>
      </View>
    );
  }
}

var css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
  },
  main: {
    paddingTop: 50,
    flexDirection: 'column',
    alignItems: 'center'
  },
  question: {
    fontSize: 28,
    color: '#FFFFFF',
    paddingTop: 50,
  },
  city: {
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 40,
  }
});

export default AppWeather;
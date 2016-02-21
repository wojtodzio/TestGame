'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

var IdleTimerManager = require('NativeModules').IdleTimerManager;

var AnimatedButton = React.createClass({
  componentWillMount() {
    LayoutAnimation.spring();
  },

  getInitialState() {
    return { x: 200 }
  },

  _onPress() {
    LayoutAnimation.spring();
    var newState = this.state.x + 15;
    this.setState({x: newState})
  },

  _onLongPress() {
    LayoutAnimation.spring();
    var newState = this.state.x - 15;
    if(newState > this.getInitialState().x)
      this.setState({x: newState})
  },

  render: function() {
    return (
      <View style={styles.animatedButton}>
        <View style={[styles.box, {width: this.state.x, height: this.state.x}]}>
          {this.props.children}
        </View>
        <TouchableOpacity
        onPress={this._onPress}
        onLongPress={this._onLongPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});

class TestGame extends Component {
  componentWillMount() {
    IdleTimerManager.setIdleTimerDisabled(true);
  }

  componentWillUnmount() {
    IdleTimerManager.setIdleTimerDisabled(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedButton label="Press me!">
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
            {'\n'}
          </Text>
        </AnimatedButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  animatedButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'black',
    margin: 5,
    padding: 15,
  },
  button: {
    margin: 5,
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('TestGame', () => TestGame);

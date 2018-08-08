import React, {Component} from 'react';
import {BackHandler, View, WebView} from 'react-native';
import LoadingView from '@/components/Loading';
import {defaultPage} from "@/components/defaultPage";
import emitter from '@/utils/emmit';

export default class BaseWebview extends Component {

  constructor() {
    super();
    this.onError = this.onError.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.state = {
      showLoading: false,
      isError: false,
      canGoBack: false,
      isShow:true,
    };
    emitter.on('udpate111', () => {
      this.setState({
        isShow: false
      }, () => {
        setTimeout(() => {
          this.setState({ isShow: true })
        }, 0)
      })
    })
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',this.fnBsnValidateBack )
  }
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',this.fnBsnValidateBack)
  }
  onLoadStart() {
    this.setState({showLoading: true});
  }

  onLoadEnd() {
    this.setState({showLoading: false});
  }

  onError() {
    this.setState({isError: true});
  }

  onNavigationStateChange = (navState)=>{
    this.setState({
      canGoBack: navState.canGoBack
    })
  };

  fnBsnValidateBack = () => {
    const {canGoBack}=this.state;
    if(canGoBack){
      this.webView.goBack()
    }else{
      return false
    }
    return true
  };

  render() {
    const {showLoading, isError,isShow} = this.state;
    return (
      <View style={{flex: 1}}>
        {
          isError ? defaultPage({status: 1, fnArg: () => this.setState({isError: false})}) :(isShow?( <WebView
            {...this.props}
            ref={ref => this.webView = ref}
            onNavigationStateChange={this.onNavigationStateChange}
            onError={this.onError}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
          />):defaultPage({status: 3}))

        }
        <LoadingView style={{position: 'absolute', width: '100%', height: '100%'}} sType={'plain'} visible={showLoading} textContent={'Loading...'} textStyle={{color: '#FFF'}}/>
      </View>
    );
  }
};



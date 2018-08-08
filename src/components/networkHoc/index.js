import React, {Component, createRef} from 'react';
import {View} from 'react-native';
import {get} from 'lodash';
import { deviceH } from "@/utils";
import {NetWorkError, LoadingView, defaultPage, NavHoc} from '@/components';

export const NetworkState = {
  loading: 'loading', //正在加载
  error: 'error',     //加载出错
  succeed: 'succeed', //加载成功
  empty: 'empty' // 加载成功但数据为空
};

@NavHoc()
export const NetWorkHoc = (params) => WrappedComponent => {
  return class extends Component {

    static setNav() {
      return WrappedComponent.setNav && WrappedComponent.setNav()
    }

    constructor() {
      super();
      this.loadingRef = createRef();
      this.state = {
        bRefresh: false
      }
    }

    renderErrorView() {
      const CustomEmptyView = WrappedComponent.fnRenderCustomEmptyView && WrappedComponent.fnRenderCustomEmptyView();
      const network = get(this.props[params], 'network');
      const data = get(this.props[params], 'data');
      if (network === NetworkState.error) {
        return <NetWorkError onPress={() => {
          this.loadingRef.current.fnReload();
        }}/>;
      } else if (get(data, 'length') === 0) {
        return defaultPage({
          status: 3, fnOnRefresh: async () => {
            this.setState({bRefresh: true});
            await this.loadingRef.current.fnReload();
            this.setState({bRefresh: false});
          },
          bRefresh: this.state.bRefresh
        });
      }
      return null;
    }

    render() {
      return (
        <View style={{flex: 1}}>
          {<WrappedComponent ref={this.loadingRef} {...this.props}/>}
          <View style={{position: 'absolute', height: this.renderErrorView() ? deviceH - 64 : 0}}>
            {
              this.renderErrorView()
            }
          </View>
        </View>
      );
    }
  };
};


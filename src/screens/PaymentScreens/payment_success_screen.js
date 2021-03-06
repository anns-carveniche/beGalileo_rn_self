import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList, VirtualizedList, ColorPropType } from "react-native";
import { connect } from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import { normalize, Card } from "react-native-elements";
import { COLOR, CommonStyles } from '../../config/styles';
import { IC_RESCHEDULE_DEMO, PAYMENT_SUCCESS, IC_TRACK_BOX } from '../../assets/images';
import { showMessage, hideMessage } from "react-native-flash-message";
import { removeFromCart } from "../../actions/dashboard";
import CustomGradientButton from '../../components/CustomGradientButton';
import Modal from 'react-native-modal';
import {NavigationActions,StackActions} from 'react-navigation'; 


class PaymentSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  goToHome = () => {

    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Constants.MainScreen })],
    });
  
    this.props.navigation.dispatch(navigateAction);
   // this.props.navigation.replace(Constants.MainScreen);
  }

  renderSubscriptionDetails = () => {
    return this.props.update_payment_response.subscription_details.map((item) => {
      return <View style={{ marginTop: normalize(20), borderRadius: normalize(24), borderWidth: normalize(1), borderColor: COLOR.BORDER_COLOR_GREY }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: normalize(9) }}>
          <View style={{ flex: 1, flexDirection: 'row', marginStart: normalize(2) }}>
            <Image style={{ alignSelf: 'center', height: normalize(25), width: normalize(25) }} source={{ uri: item.photo }} />
            <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(6), alignSelf: 'center' }]}>{item.student_name}</Text>
          </View>
          <View style={{ flex: 1, alignSelf: 'center', marginStart: normalize(20), marginEnd: normalize(2) }}>
            <Text style={[CommonStyles.text_12_Regular, { alignSelf: 'center' }]}>{item.live_classes} Live Classes</Text>
          </View>
        </View>

        <View style={{ flex: 1, height: normalize(1), backgroundColor: COLOR.BORDER_COLOR_GREY, marginTop: normalize(12) }} />


        <View style={{ marginStart: normalize(16), marginBottom: normalize(20) }}>
          <Text style={[CommonStyles.text_18_semi_bold, { marginTop: normalize(12) }]}>{item.duration} Months</Text>
          {
            item.mathbox_required &&
            <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(4) }]}>With {item.boxes} Math boxes for {item.duration} months</Text>
          }

          {/* <Text style={[CommonStyles.text_9_bold, { marginTop: normalize(8), marginBottom: normalize(20) }]}>First box delivery by May 12</Text> */}
        </View>


      </View>
    })
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,

          backgroundColor: COLOR.WHITE
        }}>
        <View style={{ margin: normalize(20) }}>

          <View>
            <Image style={{ resizeMode: 'contain', height: normalize(80), width: normalize(80), marginTop: normalize(20), marginBottom: normalize(20), height: normalize(40), alignSelf: 'center' }} source={PAYMENT_SUCCESS} />
            <Text style={[CommonStyles.text_18_semi_bold, { color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>Payment sucess!</Text>

            <Text style={[CommonStyles.text_14_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(30), marginEnd: normalize(30), textAlign: "center", marginTop: normalize(8) }]}>Let your kid take command by Switching to kids account</Text>

            <TouchableOpacity style={{ marginTop: normalize(32) }}>
              <CustomGradientButton
                myRef={(input) => { this.btn_pay_now = input; }}
                style={styles.btn_proceed_payment}
                children={"Start Experiencing Online Learning"}
                onPress={this.goToHome}
                textStyling={[CommonStyles.text_12__semi_bold, { color: COLOR.WHITE }]}

              />
            </TouchableOpacity>


            {/* <View style={{ marginTop: normalize(20), flexDirection: 'row', alignSelf: 'center' }}>
              <Image style={{ resizeMode: 'contain', height: normalize(14), width: normalize(14), alignSelf: 'center' }} source={IC_RESCHEDULE_DEMO} />
              <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(9) }]}>Back to Home</Text>
            </View> */}

            <View style={{ marginTop: normalize(40) }}>
              <Text style={[CommonStyles.text_14_bold, {}]}>Subscriptions you brought</Text>
              {
                this.props.update_payment_response && this.props.update_payment_response.subscription_details &&
                this.renderSubscriptionDetails()
              }



              {/* <View style={{ flexDirection : 'row',marginTop : normalize(16),justifyContent : 'space-around' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ alignSelf: 'center', height: normalize(14), width: normalize(14) }} source={IC_TRACK_BOX} />
                  <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(6), alignSelf: 'center',color : COLOR.TEXT_COLOR_GREEN }]}>Track Mathbox</Text>
                </View>

                <Text style={[CommonStyles.text_12_Regular]}>Order ID - ODI123456564233</Text>
              </View> */}




            </View>

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btn_proceed_payment: {
    alignItems: 'center',
    paddingTop: normalize(15),
    paddingStart: normalize(20),
    paddingEnd: normalize(20),
    paddingBottom: normalize(15)
  }
})


const mapStateToProps = (state) => {

  return {
    loading: state.dashboard.loading,

    update_payment_status: state.dashboard.update_payment_status,
    update_payment_response: state.dashboard.update_payment_response


  }

}

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccessScreen);



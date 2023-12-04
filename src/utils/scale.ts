import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('screen');

function scale(size: number): number {
  return RFValue(size, height);
}

export {scale, wp, hp};

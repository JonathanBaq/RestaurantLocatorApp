import { Rating } from 'react-native-ratings';

export default CustomRating = ({ item }) => {
  return (
    <Rating
      type='custom'
      ratingColor={'#ff724c'}
      readonly={true}
      imageSize={20}
      startingValue={item.rating}
    />
  )
}
import React from 'react';
import { Image } from 'react-native';

const defaultImages = [
    require("../../assets/images/default-picture.png"),
    require("../../assets/images/doctor-2.jpg"),
    require("../../assets/images/doctor3.jpg"),
    require("../../assets/images/doctor4.jpg"),
];

interface IProps {
    userImage: string,
    pickedImage: string,
    style: Object
}

const ImageProfile: React.FC<IProps> = ({ userImage, pickedImage, style }) => {
    const getRandomImage = () => {
        return defaultImages[Math.floor(Math.random() * defaultImages.length)];
    };

    const imageSource = userImage
        ? { uri: userImage }
        : pickedImage
            ? { uri: pickedImage }
            : getRandomImage();
            
    return (
        <Image style={style} source={imageSource} />
    );
}

export default ImageProfile;
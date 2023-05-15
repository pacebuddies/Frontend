import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState, CSSProperties, useEffect } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'

import pacebuddiesApi from '../../instances/axiosConfigured';
import { IPhoto } from "../../internalTypes/interfaces";

interface SliderProps {
  photos: IPhoto[];
}



const Slider = ({ photos }: SliderProps) => {

  return (
    <div className="flex flex-row justify-center items-center">
      {photos.map((photo, index) => (
        <div key={index} className="flex flex-row justify-center items-center">
          <Image src={photo.urls["2048"]} width={200} height={200} alt={"123"}/>
        </div>
      ))}
    </div>
  );
};

export default Slider;

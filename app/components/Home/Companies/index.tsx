'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

interface CompaniesType {
  imgSrc: string;
  name: string;
}

const Companies = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }

  const Companiesdata: CompaniesType[] = [
    {
      imgSrc: '/images/team/bear.png',
      name: '김성민',
    },
    {
      imgSrc: '/images/team/cat.png',
      name: '김민',
    },
    {
      imgSrc: '/images/team/fox.png',
      name: '변만수',
    },
    {
      imgSrc: '/images/team/dog.png',
      name: '박중은',
    },
    {
      imgSrc: '/images/team/rabbit.png',
      name: '이지영',
    }
  ]


  return (
    <section>
      <div className='container mx-auto max-w-7xl px-4'>
        <h2 className='text-lg mb-10 text-black/40 text-center'>
          Dedicated by the Makers of Apple Mango
        </h2>
        <div>
          <Slider {...settings}>
            {Companiesdata.map((item, i) => (
              <div key={i} className='!flex flex-row items-center justify-center gap-4'>
                <Image
                  src={item.imgSrc}
                  alt={item.imgSrc}
                  width={100}
                  height={50}
                  draggable={false}
                  className="pointer-events-none select-none"
                />
                <p>{item.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Companies

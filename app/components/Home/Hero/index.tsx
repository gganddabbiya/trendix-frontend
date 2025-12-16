'use client'

import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Signin from '../../Auth/SignIn'

const Banner = () => {
  const { isLoggedIn } = useAuth();
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const signInRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSignInOpen])

  return (
    <section id='Home' className='bg-cover bg-center bg-no-repeat pt-28 pb-20'>
      <div className='relative px-6 lg:px-8'>
        <div className='container'>
          <div className='flex flex-col gap-4 text-center'>
            <h1 className='leading-tight font-bold tracking-tight max-w-4xl mx-auto'>
              크리에이터를 위한<br className='hidden sm:block' /> 데이터 기반 트렌드 분석
            </h1>
            <p className='text-lg leading-8 text-gray-600 max-w-2xl mx-auto'>
              Trendix에서 최신 트렌드를 파악하고 채널을 성장시키세요.<br className='hidden sm:block' />
              데이터가 알려주는 확실한 성공 전략을 만나실 수 있습니다.
            </p>
            <div className='backdrop-blur-md bg-white/30 border border-white/30 rounded-lg shadow-lg p-6 w-fit mx-auto mt-4'>
              <div className='flex items-center justify-center gap-8'>
                <div className='hidden sm:block -space-x-2 overflow-hidden'>
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt='img1'
                    width={48}
                    height={48}
                  />

                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt='img2'
                    width={48}
                    height={48}
                  />
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
                    alt='img3'
                    width={48}
                    height={48}
                  />
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt='img4'
                    width={48}
                    height={48}
                  />
                  <Image
                    className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                    src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt='img5'
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <div className='flex justify-center sm:justify-start items-center'>
                    <h3 className='text-2xl font-semibold mr-2'>4.8</h3>
                    <Image
                      src={'/images/banner/Stars.svg'}
                      alt='stars-icon'
                      width={100}
                      height={100}
                      className='w-auto h-6'
                    />
                  </div>
                  <div>
                    <h3 className='text-sm text-gray-700'>수많은 크리에이터들의 선택</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mx-auto max-w-4xl mt-12 p-6 lg:max-w-4xl lg:px-8 rounded-lg boxshadow'>
            <div className='flex justify-center'>

              {!isLoggedIn && (
                <div className='col-span-3 sm:col-span-2 mt-2'>
                  <button className='bg-primary w-full hover:bg-transparent hover:text-primary duration-300 border border-primary text-white font-bold py-4 px-3 rounded-sm hover:cursor-pointer'
                    onClick={() => setIsSignInOpen(true)}
                  >
                    무료로 시작하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSignInOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
          <div
            ref={signInRef}
            className='relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-8 pb-8 text-center bg-dark_grey/90 backdrop-blur-md bg-white'>
            <button
              onClick={() => setIsSignInOpen(false)}
              className='absolute top-0 right-0 mr-8 mt-8 dark:invert'
              aria-label='Close Sign In Modal'>
              <Icon
                icon='material-symbols:close-rounded'
                width={24}
                height={24}
                className='text-black hover:text-primary inline-block hover:cursor-pointer'
              />
            </button>
            <Signin />
          </div>
        </div>
      )}
    </section>
  )
}

export default Banner
